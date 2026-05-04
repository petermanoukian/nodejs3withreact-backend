import { Knex } from "knex";
import { Cat, CatWithCounts } from "../../../Model/Admin/Cat.model";
import { CatInterface } from "../../Interface/Admin/CatInterface";
export declare class CatQuery implements CatInterface {
    private db;
    constructor(db: Knex);
    returnMany(filters?: Record<string, any>, orderByField?: string, orderByDirection?: "asc" | "desc", relatedTables?: string[], fields?: string[]): Promise<Cat[]>;
    returnManyPaginated(filters?: Record<string, any>, orderByField?: string, orderByDirection?: "asc" | "desc", relatedTables?: string[], fields?: string[], page?: number, pageSize?: number): Promise<{
        data: Cat[];
        total: number;
    }>;
    returnManyPaginatedWithCounts(filters?: Record<string, any>, orderByField?: string, orderByDirection?: "asc" | "desc", page?: number, pageSize?: number): Promise<{
        data: CatWithCounts[];
        total: number;
    }>;
    returnSearchManyWithCounts(filters?: Record<string, any>, orderByField?: string, orderByDirection?: "asc" | "desc", searchFields?: string[], searchOperator?: "AND" | "OR", searchMode?: "like" | "exact"): Promise<CatWithCounts[]>;
    returnSearchPaginatedWithCounts(filters?: Record<string, any>, orderByField?: string, orderByDirection?: "asc" | "desc", searchFields?: string[], searchOperator?: "AND" | "OR", searchMode?: "like" | "exact", page?: number, pageSize?: number): Promise<{
        data: CatWithCounts[];
        total: number;
    }>;
    returnOne(filters?: Record<string, any>, relatedTables?: string[], fields?: string[]): Promise<Cat | null>;
    returnOneById(id: number, relatedTables?: string[], fields?: string[]): Promise<Cat | null>;
    returnSearchMany(filters?: Record<string, any>, orderByField?: string, orderByDirection?: "asc" | "desc", relatedTables?: string[], fields?: string[], searchFields?: string[], searchOperator?: "AND" | "OR", searchMode?: "like" | "exact"): Promise<Cat[]>;
    returnSearchPaginated(filters?: Record<string, any>, orderByField?: string, orderByDirection?: "asc" | "desc", relatedTables?: string[], fields?: string[], searchFields?: string[], searchOperator?: "AND" | "OR", searchMode?: "like" | "exact", page?: number, pageSize?: number): Promise<{
        data: Cat[];
        total: number;
    }>;
    returnSearchOne(filters?: Record<string, any>, relatedTables?: string[], fields?: string[], searchFields?: string[], searchOperator?: "AND" | "OR", searchMode?: "like" | "exact"): Promise<Cat | null>;
    store(data: Partial<Cat>): Promise<Cat>;
    update(id: number, data: Partial<Cat>): Promise<Cat>;
    delete(id: number, relatedTables?: string[]): Promise<void>;
    deleteMany(ids: number[]): Promise<void>;
}
//# sourceMappingURL=CatQuery.d.ts.map