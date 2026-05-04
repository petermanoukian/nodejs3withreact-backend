import { Knex } from "knex";
/**
 * Run a Knex query and cast the result to the expected type array.
 */
export declare function runQuery<T>(query: Knex.QueryBuilder<any, any>): Promise<T[]>;
/**
 * Run a Knex query that returns a single row.
 */
export declare function runQueryOne<T>(query: Knex.QueryBuilder<any, any>): Promise<T | null>;
/**
 * Run a Knex query with pagination and return data + total count.
 */
export declare function runQueryPaginated<T>(query: Knex.QueryBuilder<any, any>, page: number, pageSize: number, orderByField: string, orderByDirection: "asc" | "desc"): Promise<{
    data: T[];
    total: number;
}>;
/**
 * Run a Knex query with pagination using a custom count field (for joins).
 */
export declare function runQueryPaginatedWithAlias<T>(query: Knex.QueryBuilder<any, any>, page: number, pageSize: number, orderByField: string, orderByDirection: "asc" | "desc", countField: string): Promise<{
    data: T[];
    total: number;
}>;
/**
 * Run a Knex insert/update with returning and cast to typed row array.
 */
/**
 * Run a Knex insert/update with returning and cast to typed row array.
 * Guarantees at least one row or throws.
 */
export declare function runQueryReturning<T>(query: Knex.QueryBuilder<any, any>): Promise<T>;
/**
 * Run a Knex delete query and normalize to void.
 */
export declare function runQueryDelete(query: Knex.QueryBuilder<any, any>): Promise<void>;
//# sourceMappingURL=queryHelper.d.ts.map