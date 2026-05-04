// src/app/Repository/Queries/Admin/SubcatQuery.ts
import { Knex } from "knex";
import { Subcat } from "@Model/Admin/Subcat.model";
import { SubcatInterface } from "@Repository/Interface/Admin/SubcatInterface";
import { runQuery, runQueryOne, runQueryPaginated, runQueryReturning, runQueryDelete } from "@Repository/Helpers/queryHelper";
import type { SubcatWithCounts } from "@Repository/Interface/Admin/SubcatInterface";
import { Prod } from "@Model/Admin/Prod.model";

export class SubcatQuery implements SubcatInterface {
    private db: Knex;

    constructor(db: Knex) {
        this.db = db;
    }

    async returnMany(
        filters: Record<string, any> = {},
        orderByField: string = "id",
        orderByDirection: "asc" | "desc" = "desc",
        relatedTables: string[] = [],
        fields: string[] = ["*"]
    ): Promise<Subcat[]> {
        let query = this.db<Subcat>("subcat").select(fields);

        Object.entries(filters).forEach(([key, value]) => {
            query.where(key, value);
        });

        query.orderBy(orderByField, orderByDirection);

        return runQuery<Subcat>(query);
    }

    async returnManyPaginated(
        filters: Record<string, any> = {},
        orderByField: string = "id",
        orderByDirection: "asc" | "desc" = "desc",
        relatedTables: string[] = [],
        fields: string[] = ["*"],
        page: number = 1,
        pageSize: number = 10
    ): Promise<{ data: Subcat[]; total: number }> {
        let query = this.db<Subcat>("subcat").select(fields);
        Object.entries(filters).forEach(([key, value]) => query.where(key, value));

        return runQueryPaginated<Subcat>(query, page, pageSize, orderByField, orderByDirection);
    }

    async returnOne(
        filters: Record<string, any> = {},
        relatedTables: string[] = [],
        fields: string[] = ["*"]
    ): Promise<Subcat | null> {
        let query = this.db<Subcat>("subcat").select(fields);
        Object.entries(filters).forEach(([key, value]) => query.where(key, value));

        return runQueryOne<Subcat>(query);
    }

    async returnOneById(
        id: number,
        relatedTables: string[] = [],
        fields: string[] = ["*"]
    ): Promise<Subcat | null> {
        const query = this.db<Subcat>("subcat")
            .select(fields)
            .where("id", id);

        return runQueryOne<Subcat>(query);
    }

    async returnSearchMany(
        filters: Record<string, any> = {},
        orderByField: string = "id",
        orderByDirection: "asc" | "desc" = "desc",
        relatedTables: string[] = [],
        fields: string[] = ["*"],
        searchFields: string[] = [],
        searchOperator: "AND" | "OR" = "AND",
        searchMode: "like" | "exact" = "like"
    ): Promise<Subcat[]> {
        let query = this.db<Subcat>("subcat").select(fields);
        Object.entries(filters).forEach(([key, value]) => query.where(key, value));

        if (searchFields.length > 0) {
            query.where((builder) => {
                searchFields.forEach((field, idx) => {
                    const clause = searchMode === "like" ? `%${filters[field]}%` : filters[field];
                    if (searchOperator === "AND") {
                        builder.andWhere(field, searchMode === "like" ? "like" : "=", clause);
                    } else {
                        idx === 0
                            ? builder.where(field, searchMode === "like" ? "like" : "=", clause)
                            : builder.orWhere(field, searchMode === "like" ? "like" : "=", clause);
                    }
                });
            });
        }

        query.orderBy(orderByField, orderByDirection);

        return runQuery<Subcat>(query);
    }

    async returnSearchPaginated(
        filters: Record<string, any> = {},
        orderByField: string = "id",
        orderByDirection: "asc" | "desc" = "desc",
        relatedTables: string[] = [],
        fields: string[] = ["*"],
        searchFields: string[] = [],
        searchOperator: "AND" | "OR" = "AND",
        searchMode: "like" | "exact" = "like",
        page: number = 1,
        pageSize: number = 10
    ): Promise<{ data: Subcat[]; total: number }> {
        const baseQuery = this.db<Subcat>("subcat").select(fields);
        Object.entries(filters).forEach(([key, value]) => baseQuery.where(key, value));

        if (searchFields.length > 0) {
            baseQuery.where((builder) => {
                searchFields.forEach((field, idx) => {
                    const clause = searchMode === "like" ? `%${filters[field]}%` : filters[field];
                    if (searchOperator === "AND") {
                        builder.andWhere(field, searchMode === "like" ? "like" : "=", clause);
                    } else {
                        idx === 0
                            ? builder.where(field, searchMode === "like" ? "like" : "=", clause)
                            : builder.orWhere(field, searchMode === "like" ? "like" : "=", clause);
                    }
                });
            });
        }

        return runQueryPaginated<Subcat>(baseQuery, page, pageSize, orderByField, orderByDirection);
    }

    async returnSearchPaginatedWithCounts(
        filters: Record<string, any> = {},
        orderByField: string = "id",
        orderByDirection: "asc" | "desc" = "desc",
        searchFields: string[] = [],
        searchOperator: "AND" | "OR" = "AND",
        searchMode: "like" | "exact" = "like",
        page: number = 1,
        pageSize: number = 10
        ): Promise<{ data: SubcatWithCounts[]; total: number }> 
        {
            
            console.log("FILTERS:", JSON.stringify(filters));
            console.log("SEARCH FIELDS:", JSON.stringify(searchFields));
            let baseQuery = this.db<Subcat>("subcat")
                .leftJoin("cat", "subcat.catid", "cat.id");

            // Normal filters: catid stays here, search fields are skipped
            Object.entries(filters).forEach(([key, value]) => {
                if (searchFields.includes(key)) return;
                    if (key.includes(".")) return;  // ✅ never pass dotted keys to plain where()

                if (value === undefined || value === null || value === "") return;

                if (key === "catid") {
                baseQuery =baseQuery.where("subcat.catid", Number(value));
                } else {
                baseQuery =baseQuery.where(key, value);
                }
            });

        // Search filters: subcat.name, cat.name, etc.
            if (searchFields.length > 0) 
            {
                baseQuery =baseQuery.where((builder) => {
                searchFields.forEach((field, idx) => {
                const value = filters[field];

                if (value === undefined || value === null || value === "") return;

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
            .countDistinct<{ total: number }>("subcat.id as total")
            .first();

            const total = totalRow ? Number(totalRow.total) : 0;

            const sortField =
                orderByField.includes(".") ? orderByField : `subcat.${orderByField}`;

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

            const prodMap = Object.fromEntries(
                prodCounts.map((r: any) => [r.subcatid, Number(r.count)])
            );

            const data: SubcatWithCounts[] = dataRows.map((subcat: any) => ({
                ...subcat,
                prodCount: prodMap[subcat.id] ?? 0,
            }));

            return { data, total };
    }

    async returnSearchOne(
        filters: Record<string, any> = {},
        relatedTables: string[] = [],
        fields: string[] = ["*"],
        searchFields: string[] = [],
        searchOperator: "AND" | "OR" = "AND",
        searchMode: "like" | "exact" = "like"
    ): Promise<Subcat | null> {
        const query = this.db<Subcat>("subcat").select(fields);
        Object.entries(filters).forEach(([key, value]) => query.where(key, value));

        if (searchFields.length > 0) {
            query.where((builder) => {
                searchFields.forEach((field, idx) => {
                    const clause = searchMode === "like" ? `%${filters[field]}%` : filters[field];
                    if (searchOperator === "AND") {
                        builder.andWhere(field, searchMode === "like" ? "like" : "=", clause);
                    } else {
                        idx === 0
                            ? builder.where(field, searchMode === "like" ? "like" : "=", clause)
                            : builder.orWhere(field, searchMode === "like" ? "like" : "=", clause);
                    }
                });
            });
        }

        query.orderBy("id", "desc");

        return runQueryOne<Subcat>(query);
    }

    async store(data: Partial<Subcat>): Promise<Subcat> {
        return await runQueryReturning<Subcat>(
            this.db<Subcat>("subcat").insert(data)
        );
    }

    async update(id: number, data: Partial<Subcat>): Promise<Subcat> {
        await this.db<Subcat>("subcat")
            .where("id", id)
            .update(data);

        const updated = await this.db<Subcat>("subcat")
            .where("id", id)
            .first();

        if (!updated) {
            throw new Error("Subcat not found after update");
        }

        return updated;
    }

    async delete(id: number, relatedTables: string[] = []): Promise<void> {
        await runQueryDelete(
            this.db<Prod>("prod").where("subcatid", id)
        );

        await runQueryDelete(
            this.db<Subcat>("subcat").where("id", id)
        );
    }

    async deleteMany(ids: number[], relatedTables: string[] = []): Promise<void> {
        await runQueryDelete(
            this.db<Prod>("prod").whereIn("subcatid", ids)
        );

        await runQueryDelete(
            this.db<Subcat>("subcat").whereIn("id", ids)
        );
    }
}
