//src\app\Repository\Queries\Admin\CatQuery.ts
import { Knex } from "knex";
import { Cat, CatWithCounts } from "@Model/Admin/Cat.model";
import { CatInterface } from "@Repository/Interface/Admin/CatInterface";
import { runQuery,runQueryOne,runQueryPaginated,runQueryReturning,runQueryDelete} from "@Repository/Helpers/queryHelper";
import { Subcat } from "@Model/Admin/Subcat.model";
import { Prod } from "@Model/Admin/Prod.model";




export class CatQuery implements CatInterface {
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
    ): Promise<Cat[]> {
    let query = this.db<Cat>("cat").select(fields);

    Object.entries(filters).forEach(([key, value]) => {
        query = query.where(key, value); // ✅ reassign
    });

    query = query.orderBy(orderByField, orderByDirection); // ✅ reassign

    return runQuery<Cat>(query);
    }


    async returnManyPaginated(
    filters: Record<string, any> = {},
    orderByField: string = "id",
    orderByDirection: "asc" | "desc" = "desc",
    relatedTables: string[] = [],
    fields: string[] = ["*"],
    page: number = 1,
    pageSize: number = 10
    ): Promise<{ data: Cat[]; total: number }> {
        let query = this.db<Cat>("cat").select(fields);
        Object.entries(filters).forEach(([key, value]) => query.where(key, value));

        // ✅ use helper
        return runQueryPaginated<Cat>(query, page, pageSize, orderByField, orderByDirection);
    }



    // add this method inside the CatQuery class
    async returnManyPaginatedWithCounts(
        filters: Record<string, any> = {},
        orderByField: string = "id",
        orderByDirection: "asc" | "desc" = "desc",
        page: number = 1,
        pageSize: number = 10
    ): Promise<{ data: CatWithCounts[]; total: number }> {

        // get paginated cats first
        const result = await runQueryPaginated<Cat>(
            this.db<Cat>("cat").select("*"),
            page,
            pageSize,
            orderByField,
            orderByDirection
        );

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

        const subcatMap = Object.fromEntries(subcatCounts.map((r: any) => [r.catid, Number(r.count)]));
        const prodMap   = Object.fromEntries(prodCounts.map((r: any)   => [r.catid, Number(r.count)]));

        const data: CatWithCounts[] = result.data.map((cat) => ({
            ...cat,
            subcatCount: subcatMap[cat.id] ?? 0,
            prodCount:   prodMap[cat.id]   ?? 0,
        }));

        return { data, total: result.total };
    }



    async returnSearchManyWithCounts(
    filters: Record<string, any> = {},
    orderByField: string = "id",
    orderByDirection: "asc" | "desc" = "desc",
    searchFields: string[] = [],
    searchOperator: "AND" | "OR" = "AND",
    searchMode: "like" | "exact" = "like"
    ): Promise<CatWithCounts[]> {
    let baseQuery = this.db<Cat>("cat");
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

    const cats = await baseQuery.select("*").orderBy(orderByField, orderByDirection);

    if (cats.length === 0) return [];

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

    const subcatMap = Object.fromEntries(subcatCounts.map((r: any) => [r.catid, Number(r.count)]));
    const prodMap   = Object.fromEntries(prodCounts.map((r: any)   => [r.catid, Number(r.count)]));

    return cats.map(cat => ({
        ...cat,
        subcatCount: subcatMap[cat.id] ?? 0,
        prodCount:   prodMap[cat.id]   ?? 0,
    }));
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
        ): Promise<{ data: CatWithCounts[]; total: number }> {
        let baseQuery = this.db<Cat>("cat");

        // Normal filters (skip search fields)
        Object.entries(filters).forEach(([key, value]) => {
            if (searchFields.includes(key)) return;
            if (value === undefined || value === null || value === "") return;

            baseQuery.where(key, value);
        });

    // Search filters
        if (searchFields.length > 0) {
            baseQuery.where((builder) => {
            searchFields.forEach((field, idx) => {
                const value = filters[field];

                if (value === undefined || value === null || value === "") return;

                const operator = searchMode === "like" ? "like" : "=";
                const clause = searchMode === "like" ? `%${value}%` : value;

                if (searchOperator === "AND") {
                builder.andWhere(field, operator, clause);
                } else {
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
        .count<{ total: number }>("id as total")
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

        const subcatMap = Object.fromEntries(
            subcatCounts.map((r: any) => [r.catid, Number(r.count)])
        );

        const prodMap = Object.fromEntries(
            prodCounts.map((r: any) => [r.catid, Number(r.count)])
        );

        const data: CatWithCounts[] = dataRows.map((cat) => ({
            ...cat,
            subcatCount: subcatMap[cat.id] ?? 0,
            prodCount: prodMap[cat.id] ?? 0,
        }));

        return { data, total };
    }


    async returnOne(
    filters: Record<string, any> = {},
    relatedTables: string[] = [],
    fields: string[] = ["*"]
    ): Promise<Cat | null> {
        let query = this.db<Cat>("cat").select(fields);
        Object.entries(filters).forEach(([key, value]) => query.where(key, value));

        // ✅ use helper
        return runQueryOne<Cat>(query);
    }


    async returnOneById(
    id: number,
    relatedTables: string[] = [],
    fields: string[] = ["*"]
    ): Promise<Cat | null> {
        const query = this.db<Cat>("cat")
            .select(fields)
            .where("id", id);

        // ✅ use helper
        return runQueryOne<Cat>(query);
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
    ): Promise<Cat[]> {
        let query = this.db<Cat>("cat").select(fields);
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

        // ✅ use helper
        return runQuery<Cat>(query);
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
    ): Promise<{ data: Cat[]; total: number }> {
        const baseQuery = this.db<Cat>("cat").select(fields);
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

        // ✅ use helper
        return runQueryPaginated<Cat>(baseQuery, page, pageSize, orderByField, orderByDirection);
    }



    async returnSearchOne(
        filters: Record<string, any> = {},
        relatedTables: string[] = [],
        fields: string[] = ["*"],
        searchFields: string[] = [],
        searchOperator: "AND" | "OR" = "AND",
        searchMode: "like" | "exact" = "like"
        ): Promise<Cat | null> {
        const query = this.db<Cat>("cat").select(fields);
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

        // ✅ use helper
        return runQueryOne<Cat>(query);
    }


    async store(data: Partial<Cat>): Promise<Cat> {
        // ✅ helper now returns a single Cat, not an array
        return await runQueryReturning<Cat>(
            this.db<Cat>("cat").insert(data)
        );
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
    async update(id: number, data: Partial<Cat>): Promise<Cat> {
        await this.db<Cat>("cat")
            .where("id", id)
            .update(data);

        const updated = await this.db<Cat>("cat")
            .where("id", id)
            .first();

        if (!updated) {
            throw new Error("Cat not found after update");
        }

        return updated;
    }


    async delete(id: number, relatedTables: string[] = []): Promise<void> {
        const subcats = await this.db<Subcat>("subcat")
            .where("catid", id)
            .select("id");

        const subcatIds = subcats.map((s) => s.id);

        if (subcatIds.length > 0) {
            await runQueryDelete(
                this.db<Prod>("prod").whereIn("subcatid", subcatIds)
            );
        }

        await runQueryDelete(
            this.db<Prod>("prod").where("catid", id)
        );

        await runQueryDelete(
            this.db<Subcat>("subcat").where("catid", id)
        );

        await runQueryDelete(
            this.db<Cat>("cat").where("id", id)
        );
    }

    async deleteMany(ids: number[]): Promise<void> {
        // get subcatids before deleting
        const subcats = await this.db<Subcat>("subcat")
            .whereIn("catid", ids)
            .select("id");
        
        const subcatIds = subcats.map((s) => s.id);

        // delete prods by catid
        if (ids.length > 0) {
            await runQueryDelete(
                this.db<Prod>("prod").whereIn("catid", ids)
            );
        }

        // delete prods by subcatid (in case subcatid differs from catid)
        if (subcatIds.length > 0) {
            await runQueryDelete(
                this.db<Prod>("prod").whereIn("subcatid", subcatIds)
            );
        }

        // delete subcats
        if (ids.length > 0) {
            await runQueryDelete(
                this.db<Subcat>("subcat").whereIn("catid", ids)
            );
        }

        // delete cats
        await runQueryDelete(
            this.db<Cat>("cat").whereIn("id", ids)
        );
    }


}
