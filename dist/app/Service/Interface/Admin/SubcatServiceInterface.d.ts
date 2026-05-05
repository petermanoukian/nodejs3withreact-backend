import { Subcat } from "@Model/Admin/Subcat.model";
import { SubcatWithCounts } from "@Repository/Interface/Admin/SubcatInterface";
export interface SubcatServiceInterface {
    returnMany(filters?: Record<string, any>, orderByField?: string, orderByDirection?: "asc" | "desc", relatedTables?: string[], fields?: string[]): Promise<Subcat[]>;
    returnManyPaginated(filters?: Record<string, any>, orderByField?: string, orderByDirection?: "asc" | "desc", relatedTables?: string[], fields?: string[], page?: number, pageSize?: number): Promise<{
        data: Subcat[];
        total: number;
    }>;
    returnOne(filters?: Record<string, any>, relatedTables?: string[], fields?: string[]): Promise<Subcat | null>;
    returnOneById(id: number, relatedTables?: string[], fields?: string[]): Promise<Subcat | null>;
    returnSearchMany(filters?: Record<string, any>, orderByField?: string, orderByDirection?: "asc" | "desc", relatedTables?: string[], fields?: string[], searchFields?: string[], searchOperator?: "AND" | "OR", searchMode?: "like" | "exact"): Promise<Subcat[]>;
    returnSearchPaginated(filters?: Record<string, any>, orderByField?: string, orderByDirection?: "asc" | "desc", relatedTables?: string[], fields?: string[], searchFields?: string[], searchOperator?: "AND" | "OR", searchMode?: "like" | "exact", page?: number, pageSize?: number): Promise<{
        data: Subcat[];
        total: number;
    }>;
    returnSearchPaginatedWithCounts(filters?: Record<string, any>, orderByField?: string, orderByDirection?: "asc" | "desc", searchFields?: string[], searchOperator?: "AND" | "OR", searchMode?: "like" | "exact", page?: number, pageSize?: number): Promise<{
        data: SubcatWithCounts[];
        total: number;
    }>;
    returnSearchOne(filters?: Record<string, any>, relatedTables?: string[], fields?: string[], searchFields?: string[], searchOperator?: "AND" | "OR", searchMode?: "like" | "exact"): Promise<Subcat | null>;
    store(data: Partial<Subcat>): Promise<Subcat>;
    update(id: number, data: Partial<Subcat>): Promise<Subcat>;
    delete(id: number, relatedTables?: string[]): Promise<void>;
    deleteMany(ids: number[], relatedTables?: string[]): Promise<void>;
}
//# sourceMappingURL=SubcatServiceInterface.d.ts.map