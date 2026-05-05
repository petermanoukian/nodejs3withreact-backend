import { Knex } from "knex";
import { Prod } from "@Model/Admin/Prod.model";
import { ProdInterface, ProdWithDetails } from "@Repository/Interface/Admin/ProdInterface";
export declare class ProdQuery implements ProdInterface {
    private db;
    constructor(db: Knex);
    returnMany(filters?: Record<string, any>, orderByField?: string, orderByDirection?: "asc" | "desc", relatedTables?: string[], fields?: string[]): Promise<Prod[]>;
    returnManyPaginated(filters?: Record<string, any>, orderByField?: string, orderByDirection?: "asc" | "desc", relatedTables?: string[], fields?: string[], page?: number, pageSize?: number): Promise<{
        data: Prod[];
        total: number;
    }>;
    returnOne(filters?: Record<string, any>, relatedTables?: string[], fields?: string[]): Promise<Prod | null>;
    returnOneById(id: number, relatedTables?: string[], fields?: string[]): Promise<Prod | null>;
    returnSearchMany(filters?: Record<string, any>, orderByField?: string, orderByDirection?: "asc" | "desc", relatedTables?: string[], fields?: string[], searchFields?: string[], searchOperator?: "AND" | "OR", searchMode?: "like" | "exact"): Promise<Prod[]>;
    returnSearchPaginated(filters?: Record<string, any>, orderByField?: string, orderByDirection?: "asc" | "desc", relatedTables?: string[], fields?: string[], searchFields?: string[], searchOperator?: "AND" | "OR", searchMode?: "like" | "exact", page?: number, pageSize?: number): Promise<{
        data: Prod[];
        total: number;
    }>;
    returnSearchPaginatedWithDetails(filters?: Record<string, any>, orderByField?: string, orderByDirection?: "asc" | "desc", searchFields?: string[], searchOperator?: "AND" | "OR", searchMode?: "like" | "exact", page?: number, pageSize?: number, search?: string): Promise<{
        data: ProdWithDetails[];
        total: number;
    }>;
    returnSearchOne(filters?: Record<string, any>, relatedTables?: string[], fields?: string[], searchFields?: string[], searchOperator?: "AND" | "OR", searchMode?: "like" | "exact"): Promise<Prod | null>;
    store(data: Partial<Prod>): Promise<Prod>;
    update(id: number, data: Partial<Prod>): Promise<Prod>;
    delete(id: number, relatedTables?: string[]): Promise<void>;
    deleteMany(ids: number[], relatedTables?: string[]): Promise<void>;
}
//# sourceMappingURL=ProdQuery.d.ts.map