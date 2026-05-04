"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdQuery = void 0;
const queryHelper_1 = require("../../Helpers/queryHelper");
class ProdQuery {
    db;
    constructor(db) {
        this.db = db;
    }
    async returnMany(filters = {}, orderByField = "id", orderByDirection = "desc", relatedTables = [], fields = ["*"]) {
        let query = this.db("prod").select(fields);
        Object.entries(filters).forEach(([key, value]) => {
            query.where(key, value);
        });
        query.orderBy(orderByField, orderByDirection);
        return (0, queryHelper_1.runQuery)(query);
    }
    async returnManyPaginated(filters = {}, orderByField = "id", orderByDirection = "desc", relatedTables = [], fields = ["*"], page = 1, pageSize = 10) {
        let query = this.db("prod").select(fields);
        Object.entries(filters).forEach(([key, value]) => query.where(key, value));
        return (0, queryHelper_1.runQueryPaginated)(query, page, pageSize, orderByField, orderByDirection);
    }
    async returnOne(filters = {}, relatedTables = [], fields = ["*"]) {
        let query = this.db("prod").select(fields);
        Object.entries(filters).forEach(([key, value]) => query.where(key, value));
        return (0, queryHelper_1.runQueryOne)(query);
    }
    async returnOneById(id, relatedTables = [], fields = ["*"]) {
        const query = this.db("prod")
            .select(fields)
            .where("id", id);
        return (0, queryHelper_1.runQueryOne)(query);
    }
    async returnSearchMany(filters = {}, orderByField = "id", orderByDirection = "desc", relatedTables = [], fields = ["*"], searchFields = [], searchOperator = "AND", searchMode = "like") {
        let query = this.db("prod").select(fields);
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
        return (0, queryHelper_1.runQuery)(query);
    }
    async returnSearchPaginated(filters = {}, orderByField = "id", orderByDirection = "desc", relatedTables = [], fields = ["*"], searchFields = [], searchOperator = "AND", searchMode = "like", page = 1, pageSize = 10) {
        const baseQuery = this.db("prod").select(fields);
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
        return (0, queryHelper_1.runQueryPaginated)(baseQuery, page, pageSize, orderByField, orderByDirection);
    }
    async returnSearchPaginatedWithDetails(filters = {}, orderByField = "id", orderByDirection = "desc", searchFields = [], searchOperator = "AND", searchMode = "like", page = 1, pageSize = 10, search = "" // ✅ added search term
    ) {
        const baseQuery = this.db("prod")
            .select("prod.*", "cat.name as catName", "subcat.name as subcatName")
            .leftJoin("cat", "prod.catid", "cat.id")
            .leftJoin("subcat", "prod.subcatid", "subcat.id");
        // apply filters (catid, subcatid etc)
        Object.entries(filters).forEach(([key, value]) => {
            baseQuery.where(`prod.${key}`, value);
        });
        const fieldMap = {
            "prod.name": "prod.name",
            "catName": "cat.name",
            "subcatName": "subcat.name",
        };
        if (searchFields.length > 0 && search) {
            baseQuery.where((builder) => {
                searchFields.forEach((field, idx) => {
                    const column = fieldMap[field] ?? field; // map alias to real column
                    const clause = searchMode === "like" ? `%${search}%` : search;
                    if (searchOperator === "AND") {
                        builder.andWhere(column, searchMode === "like" ? "like" : "=", clause);
                    }
                    else {
                        idx === 0
                            ? builder.where(column, searchMode === "like" ? "like" : "=", clause)
                            : builder.orWhere(column, searchMode === "like" ? "like" : "=", clause);
                    }
                });
            });
        }
        return (0, queryHelper_1.runQueryPaginatedWithAlias)(baseQuery, page, pageSize, `prod.${orderByField}`, orderByDirection, "prod.id");
    }
    async returnSearchOne(filters = {}, relatedTables = [], fields = ["*"], searchFields = [], searchOperator = "AND", searchMode = "like") {
        const query = this.db("prod").select(fields);
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
        return (0, queryHelper_1.runQueryOne)(query);
    }
    async store(data) {
        return await (0, queryHelper_1.runQueryReturning)(this.db("prod").insert(data));
    }
    async update(id, data) {
        await this.db("prod")
            .where("id", id)
            .update(data);
        const updated = await this.db("prod")
            .where("id", id)
            .first();
        if (!updated) {
            throw new Error("Prod not found after update");
        }
        return updated;
    }
    async delete(id, relatedTables = []) {
        await (0, queryHelper_1.runQueryDelete)(this.db("prod").where("id", id));
    }
    async deleteMany(ids, relatedTables = []) {
        await (0, queryHelper_1.runQueryDelete)(this.db("prod").whereIn("id", ids));
    }
}
exports.ProdQuery = ProdQuery;
//# sourceMappingURL=ProdQuery.js.map