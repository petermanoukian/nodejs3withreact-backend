import { Cat, CatWithCounts } from "@Model/Admin/Cat.model";
export interface CatInterface {
    /**
     * Return many rows
     * Rules: 1,3,5,7,8,9
     */
    returnMany(filters?: Record<string, any>, // 1) additional filters
    orderByField?: string, // 3) order by field
    orderByDirection?: "asc" | "desc", // 3) order direction
    relatedTables?: string[], // 4) related tables option
    fields?: string[]): Promise<Cat[]>;
    returnManyPaginated(filters?: Record<string, any>, orderByField?: string, orderByDirection?: "asc" | "desc", relatedTables?: string[], fields?: string[], page?: number, // 9) pagination
    pageSize?: number): Promise<{
        data: Cat[];
        total: number;
    }>;
    returnManyPaginatedWithCounts(filters?: Record<string, any>, orderByField?: string, orderByDirection?: "asc" | "desc", page?: number, pageSize?: number): Promise<{
        data: CatWithCounts[];
        total: number;
    }>;
    /**
     * Return one row
     * Rules: 1,2,3
     */
    returnOne(filters?: Record<string, any>, // 3) additional filters
    relatedTables?: string[], // 2) related tables
    fields?: string[]): Promise<Cat | null>;
    /**
     * Return one by ID
     * Rules: 2 params
     */
    returnOneById(id: number, relatedTables?: string[], fields?: string[]): Promise<Cat | null>;
    /**
     * Search many
     * Rules: 1–5 + 6,7,8
     */
    returnSearchMany(filters?: Record<string, any>, orderByField?: string, orderByDirection?: "asc" | "desc", relatedTables?: string[], fields?: string[], searchFields?: string[], // 6) search fields
    searchOperator?: "AND" | "OR", // 7) AND/OR
    searchMode?: "like" | "exact"): Promise<Cat[]>;
    returnSearchPaginated(filters?: Record<string, any>, orderByField?: string, orderByDirection?: "asc" | "desc", relatedTables?: string[], fields?: string[], searchFields?: string[], searchOperator?: "AND" | "OR", searchMode?: "like" | "exact", page?: number, pageSize?: number): Promise<{
        data: Cat[];
        total: number;
    }>;
    returnSearchManyWithCounts(filters?: Record<string, any>, orderByField?: string, orderByDirection?: "asc" | "desc", searchFields?: string[], searchOperator?: "AND" | "OR", searchMode?: "like" | "exact"): Promise<CatWithCounts[]>;
    returnSearchPaginatedWithCounts(filters?: Record<string, any>, orderByField?: string, orderByDirection?: "asc" | "desc", searchFields?: string[], searchOperator?: "AND" | "OR", searchMode?: "like" | "exact", page?: number, pageSize?: number): Promise<{
        data: CatWithCounts[];
        total: number;
    }>;
    returnSearchOne(filters?: Record<string, any>, relatedTables?: string[], fields?: string[], searchFields?: string[], searchOperator?: "AND" | "OR", searchMode?: "like" | "exact"): Promise<Cat | null>;
    /**
     * Store new Cat
     */
    store(data: Partial<Cat>): Promise<Cat>;
    /**
     * Update existing Cat
     */
    update(id: number, data: Partial<Cat>): Promise<Cat>;
    /**
     * Delete one Cat
     * Rules: array of related tables to delete
     */
    delete(id: number, relatedTables?: string[]): Promise<void>;
    /**
     * Delete many Cats
     */
    deleteMany(ids: number[], relatedTables?: string[]): Promise<void>;
}
//# sourceMappingURL=CatInterface.d.ts.map