import { runQuery, runQueryOne, runQueryPaginated, runQueryReturning, runQueryDelete } from "@Repository/Helpers/queryHelper";
export class CatQuery {
    db;
    constructor(db) {
        this.db = db;
    }
    async returnMany(filters = {}, orderByField = "id", orderByDirection = "desc", relatedTables = [], fields = ["*"]) {
        let query = this.db("cat").select(fields);
        Object.entries(filters).forEach(([key, value]) => {
            query = query.where(key, value); // ✅ reassign
        });
        query = query.orderBy(orderByField, orderByDirection); // ✅ reassign
        return runQuery(query);
    }
    async returnManyPaginated(filters = {}, orderByField = "id", orderByDirection = "desc", relatedTables = [], fields = ["*"], page = 1, pageSize = 10) {
        let query = this.db("cat").select(fields);
        Object.entries(filters).forEach(([key, value]) => query.where(key, value));
        // ✅ use helper
        return runQueryPaginated(query, page, pageSize, orderByField, orderByDirection);
    }
    // add this method inside the CatQuery class
    async returnManyPaginatedWithCounts(filters = {}, orderByField = "id", orderByDirection = "desc", page = 1, pageSize = 10) {
        // get paginated cats first
        const result = await runQueryPaginated(this.db("cat").select("*"), page, pageSize, orderByField, orderByDirection);
        if (result.data.length === 0) {
            return { data: [], total: 0 };
        }
        const catIds = result.data.map((c) => c.id);
        // count subcats per cat
        const subcatCounts = await this.db("subcat")
            .whereIn("catid", catIds)
            .groupBy("catid")
            .select("catid")
            .count("id as count");
        // count prods per cat
        const prodCounts = await this.db("prod")
            .whereIn("catid", catIds)
            .groupBy("catid")
            .select("catid")
            .count("id as count");
        const subcatMap = Object.fromEntries(subcatCounts.map((r) => [r.catid, Number(r.count)]));
        const prodMap = Object.fromEntries(prodCounts.map((r) => [r.catid, Number(r.count)]));
        const data = result.data.map((cat) => ({
            ...cat,
            subcatCount: subcatMap[cat.id] ?? 0,
            prodCount: prodMap[cat.id] ?? 0,
        }));
        return { data, total: result.total };
    }
    async returnSearchManyWithCounts(filters = {}, orderByField = "id", orderByDirection = "desc", searchFields = [], searchOperator = "AND", searchMode = "like") {
        let baseQuery = this.db("cat");
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
        const cats = await baseQuery.select("*").orderBy(orderByField, orderByDirection);
        if (cats.length === 0)
            return [];
        const catIds = cats.map(c => c.id);
        const subcatCounts = await this.db("subcat")
            .whereIn("catid", catIds)
            .groupBy("catid")
            .select("catid")
            .count("id as count");
        const prodCounts = await this.db("prod")
            .whereIn("catid", catIds)
            .groupBy("catid")
            .select("catid")
            .count("id as count");
        const subcatMap = Object.fromEntries(subcatCounts.map((r) => [r.catid, Number(r.count)]));
        const prodMap = Object.fromEntries(prodCounts.map((r) => [r.catid, Number(r.count)]));
        return cats.map(cat => ({
            ...cat,
            subcatCount: subcatMap[cat.id] ?? 0,
            prodCount: prodMap[cat.id] ?? 0,
        }));
    }
    async returnSearchPaginatedWithCounts(filters = {}, orderByField = "id", orderByDirection = "desc", searchFields = [], searchOperator = "AND", searchMode = "like", page = 1, pageSize = 10) {
        let baseQuery = this.db("cat");
        // Normal filters (skip search fields)
        Object.entries(filters).forEach(([key, value]) => {
            if (searchFields.includes(key))
                return;
            if (value === undefined || value === null || value === "")
                return;
            baseQuery.where(key, value);
        });
        // Search filters
        if (searchFields.length > 0) {
            baseQuery.where((builder) => {
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
        // Count query
        const totalRow = await baseQuery
            .clone()
            .count("id as total")
            .first();
        const total = totalRow ? Number(totalRow.total) : 0;
        // Data query
        const dataRows = await baseQuery
            .clone()
            .select("*")
            .orderBy(orderByField, orderByDirection)
            .limit(pageSize)
            .offset((page - 1) * pageSize);
        if (dataRows.length === 0) {
            return { data: [], total };
        }
        const catIds = dataRows.map((c) => c.id);
        const subcatCounts = await this.db("subcat")
            .whereIn("catid", catIds)
            .groupBy("catid")
            .select("catid")
            .count("id as count");
        const prodCounts = await this.db("prod")
            .whereIn("catid", catIds)
            .groupBy("catid")
            .select("catid")
            .count("id as count");
        const subcatMap = Object.fromEntries(subcatCounts.map((r) => [r.catid, Number(r.count)]));
        const prodMap = Object.fromEntries(prodCounts.map((r) => [r.catid, Number(r.count)]));
        const data = dataRows.map((cat) => ({
            ...cat,
            subcatCount: subcatMap[cat.id] ?? 0,
            prodCount: prodMap[cat.id] ?? 0,
        }));
        return { data, total };
    }
    async returnOne(filters = {}, relatedTables = [], fields = ["*"]) {
        let query = this.db("cat").select(fields);
        Object.entries(filters).forEach(([key, value]) => query.where(key, value));
        // ✅ use helper
        return runQueryOne(query);
    }
    async returnOneById(id, relatedTables = [], fields = ["*"]) {
        const query = this.db("cat")
            .select(fields)
            .where("id", id);
        // ✅ use helper
        return runQueryOne(query);
    }
    async returnSearchMany(filters = {}, orderByField = "id", orderByDirection = "desc", relatedTables = [], fields = ["*"], searchFields = [], searchOperator = "AND", searchMode = "like") {
        let query = this.db("cat").select(fields);
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
        // ✅ use helper
        return runQuery(query);
    }
    async returnSearchPaginated(filters = {}, orderByField = "id", orderByDirection = "desc", relatedTables = [], fields = ["*"], searchFields = [], searchOperator = "AND", searchMode = "like", page = 1, pageSize = 10) {
        const baseQuery = this.db("cat").select(fields);
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
        // ✅ use helper
        return runQueryPaginated(baseQuery, page, pageSize, orderByField, orderByDirection);
    }
    async returnSearchOne(filters = {}, relatedTables = [], fields = ["*"], searchFields = [], searchOperator = "AND", searchMode = "like") {
        const query = this.db("cat").select(fields);
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
        // ✅ use helper
        return runQueryOne(query);
    }
    async store(data) {
        // ✅ helper now returns a single Cat, not an array
        return await runQueryReturning(this.db("cat").insert(data));
    }
    /*
    async update(id: number, data: Partial<Cat>) {
    return this.db("cats")
        .where({ id })
        .update(data)
        .returning("*")   // 👈 ensures you get the updated row back
        .then(rows => rows[0]);
    }

    */
    async update(id, data) {
        await this.db("cat")
            .where("id", id)
            .update(data);
        const updated = await this.db("cat")
            .where("id", id)
            .first();
        if (!updated) {
            throw new Error("Cat not found after update");
        }
        return updated;
    }
    async delete(id, relatedTables = []) {
        const subcats = await this.db("subcat")
            .where("catid", id)
            .select("id");
        const subcatIds = subcats.map((s) => s.id);
        if (subcatIds.length > 0) {
            await runQueryDelete(this.db("prod").whereIn("subcatid", subcatIds));
        }
        await runQueryDelete(this.db("prod").where("catid", id));
        await runQueryDelete(this.db("subcat").where("catid", id));
        await runQueryDelete(this.db("cat").where("id", id));
    }
    async deleteMany(ids) {
        // get subcatids before deleting
        const subcats = await this.db("subcat")
            .whereIn("catid", ids)
            .select("id");
        const subcatIds = subcats.map((s) => s.id);
        // delete prods by catid
        if (ids.length > 0) {
            await runQueryDelete(this.db("prod").whereIn("catid", ids));
        }
        // delete prods by subcatid (in case subcatid differs from catid)
        if (subcatIds.length > 0) {
            await runQueryDelete(this.db("prod").whereIn("subcatid", subcatIds));
        }
        // delete subcats
        if (ids.length > 0) {
            await runQueryDelete(this.db("subcat").whereIn("catid", ids));
        }
        // delete cats
        await runQueryDelete(this.db("cat").whereIn("id", ids));
    }
}
//# sourceMappingURL=CatQuery.js.map