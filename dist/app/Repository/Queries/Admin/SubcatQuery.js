import { runQuery, runQueryOne, runQueryPaginated, runQueryReturning, runQueryDelete } from "@Repository/Helpers/queryHelper";
export class SubcatQuery {
    db;
    constructor(db) {
        this.db = db;
    }
    async returnMany(filters = {}, orderByField = "id", orderByDirection = "desc", relatedTables = [], fields = ["*"]) {
        let query = this.db("subcat").select(fields);
        Object.entries(filters).forEach(([key, value]) => {
            query.where(key, value);
        });
        query.orderBy(orderByField, orderByDirection);
        return runQuery(query);
    }
    async returnManyPaginated(filters = {}, orderByField = "id", orderByDirection = "desc", relatedTables = [], fields = ["*"], page = 1, pageSize = 10) {
        let query = this.db("subcat").select(fields);
        Object.entries(filters).forEach(([key, value]) => query.where(key, value));
        return runQueryPaginated(query, page, pageSize, orderByField, orderByDirection);
    }
    async returnOne(filters = {}, relatedTables = [], fields = ["*"]) {
        let query = this.db("subcat").select(fields);
        Object.entries(filters).forEach(([key, value]) => query.where(key, value));
        return runQueryOne(query);
    }
    async returnOneById(id, relatedTables = [], fields = ["*"]) {
        const query = this.db("subcat")
            .select(fields)
            .where("id", id);
        return runQueryOne(query);
    }
    async returnSearchMany(filters = {}, orderByField = "id", orderByDirection = "desc", relatedTables = [], fields = ["*"], searchFields = [], searchOperator = "AND", searchMode = "like") {
        let query = this.db("subcat").select(fields);
        Object.entries(filters).forEach(([key, value]) => query.where(key, value));
        if (searchFields.length > 0) {
            query.where((builder) => {
                searchFields.forEach((field, idx) => {
                    const clause = searchMode === "like" ? `%${filters[field]}%` : filters[field];
                    if (searchOperator === "AND") {
                        builder.andWhere(field, searchMode === "like" ? "like" : "=", clause);
                    }
                    else {
                        idx === 0
                            ? builder.where(field, searchMode === "like" ? "like" : "=", clause)
                            : builder.orWhere(field, searchMode === "like" ? "like" : "=", clause);
                    }
                });
            });
        }
        query.orderBy(orderByField, orderByDirection);
        return runQuery(query);
    }
    async returnSearchPaginated(filters = {}, orderByField = "id", orderByDirection = "desc", relatedTables = [], fields = ["*"], searchFields = [], searchOperator = "AND", searchMode = "like", page = 1, pageSize = 10) {
        const baseQuery = this.db("subcat").select(fields);
        Object.entries(filters).forEach(([key, value]) => baseQuery.where(key, value));
        if (searchFields.length > 0) {
            baseQuery.where((builder) => {
                searchFields.forEach((field, idx) => {
                    const clause = searchMode === "like" ? `%${filters[field]}%` : filters[field];
                    if (searchOperator === "AND") {
                        builder.andWhere(field, searchMode === "like" ? "like" : "=", clause);
                    }
                    else {
                        idx === 0
                            ? builder.where(field, searchMode === "like" ? "like" : "=", clause)
                            : builder.orWhere(field, searchMode === "like" ? "like" : "=", clause);
                    }
                });
            });
        }
        return runQueryPaginated(baseQuery, page, pageSize, orderByField, orderByDirection);
    }
    async returnSearchPaginatedWithCounts(filters = {}, orderByField = "id", orderByDirection = "desc", searchFields = [], searchOperator = "AND", searchMode = "like", page = 1, pageSize = 10) {
        console.log("FILTERS:", JSON.stringify(filters));
        console.log("SEARCH FIELDS:", JSON.stringify(searchFields));
        let baseQuery = this.db("subcat")
            .leftJoin("cat", "subcat.catid", "cat.id");
        // Normal filters: catid stays here, search fields are skipped
        Object.entries(filters).forEach(([key, value]) => {
            if (searchFields.includes(key))
                return;
            if (key.includes("."))
                return; // ✅ never pass dotted keys to plain where()
            if (value === undefined || value === null || value === "")
                return;
            if (key === "catid") {
                baseQuery = baseQuery.where("subcat.catid", Number(value));
            }
            else {
                baseQuery = baseQuery.where(key, value);
            }
        });
        // Search filters: subcat.name, cat.name, etc.
        if (searchFields.length > 0) {
            baseQuery = baseQuery.where((builder) => {
                searchFields.forEach((field, idx) => {
                    const value = filters[field];
                    if (value === undefined || value === null || value === "")
                        return;
                    const operator = searchMode === "like" ? "like" : "=";
                    const clause = searchMode === "like" ? `%${value}%` : value;
                    if (searchOperator === "AND") {
                        builder.andWhere(field, operator, clause);
                    }
                    else {
                        idx === 0
                            ? builder.where(field, operator, clause)
                            : builder.orWhere(field, operator, clause);
                    }
                });
            });
        }
        const totalRow = await baseQuery
            .clone()
            .countDistinct("subcat.id as total")
            .first();
        const total = totalRow ? Number(totalRow.total) : 0;
        const sortField = orderByField.includes(".") ? orderByField : `subcat.${orderByField}`;
        const dataRows = await baseQuery
            .clone()
            .select("subcat.*", "cat.name as catName")
            .orderBy(sortField, orderByDirection)
            .limit(pageSize)
            .offset((page - 1) * pageSize);
        if (dataRows.length === 0) {
            return { data: [], total };
        }
        const subcatIds = dataRows.map((s) => s.id);
        const prodCounts = await this.db("prod")
            .whereIn("subcatid", subcatIds)
            .groupBy("subcatid")
            .select("subcatid")
            .count("id as count");
        const prodMap = Object.fromEntries(prodCounts.map((r) => [r.subcatid, Number(r.count)]));
        const data = dataRows.map((subcat) => ({
            ...subcat,
            prodCount: prodMap[subcat.id] ?? 0,
        }));
        return { data, total };
    }
    async returnSearchOne(filters = {}, relatedTables = [], fields = ["*"], searchFields = [], searchOperator = "AND", searchMode = "like") {
        const query = this.db("subcat").select(fields);
        Object.entries(filters).forEach(([key, value]) => query.where(key, value));
        if (searchFields.length > 0) {
            query.where((builder) => {
                searchFields.forEach((field, idx) => {
                    const clause = searchMode === "like" ? `%${filters[field]}%` : filters[field];
                    if (searchOperator === "AND") {
                        builder.andWhere(field, searchMode === "like" ? "like" : "=", clause);
                    }
                    else {
                        idx === 0
                            ? builder.where(field, searchMode === "like" ? "like" : "=", clause)
                            : builder.orWhere(field, searchMode === "like" ? "like" : "=", clause);
                    }
                });
            });
        }
        query.orderBy("id", "desc");
        return runQueryOne(query);
    }
    async store(data) {
        return await runQueryReturning(this.db("subcat").insert(data));
    }
    async update(id, data) {
        await this.db("subcat")
            .where("id", id)
            .update(data);
        const updated = await this.db("subcat")
            .where("id", id)
            .first();
        if (!updated) {
            throw new Error("Subcat not found after update");
        }
        return updated;
    }
    async delete(id, relatedTables = []) {
        await runQueryDelete(this.db("prod").where("subcatid", id));
        await runQueryDelete(this.db("subcat").where("id", id));
    }
    async deleteMany(ids, relatedTables = []) {
        await runQueryDelete(this.db("prod").whereIn("subcatid", ids));
        await runQueryDelete(this.db("subcat").whereIn("id", ids));
    }
}
//# sourceMappingURL=SubcatQuery.js.map