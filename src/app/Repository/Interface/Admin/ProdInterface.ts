// src/app/Repository/Interface/Admin/ProdInterface.ts
import { Prod } from "@Model/Admin/Prod.model";


export interface ProdWithDetails extends Prod {
  catName?: string;
  subcatName?: string;
}


export interface ProdInterface {
  /**
   * Return many rows
   * Rules: 1,3,5,7,8,9
   */
  returnMany(
    filters?: Record<string, any>,              // 1) additional filters
    orderByField?: string,                      // 3) order by field
    orderByDirection?: "asc" | "desc",          // 3) order direction
    relatedTables?: string[],                   // 4) related tables option
    fields?: string[]                           // 5) all fields or certain
  ): Promise<Prod[]>;




  returnManyPaginated(
    filters?: Record<string, any>,
    orderByField?: string,
    orderByDirection?: "asc" | "desc",
    relatedTables?: string[],
    fields?: string[],
    page?: number,
    pageSize?: number
  ): Promise<{ data: Prod[]; total: number }>;

  /**
   * Return one row
   * Rules: 1,2,3
   */
  returnOne(
    filters?: Record<string, any>,              // 3) additional filters
    relatedTables?: string[],                   // 2) related tables
    fields?: string[]                           // 1) all fields or certain
  ): Promise<Prod | null>;

  /**
   * Return one by ID
   * Rules: 2 params
   */
  returnOneById(
    id: number,
    relatedTables?: string[],
    fields?: string[]
  ): Promise<Prod | null>;

  /**
   * Search many
   * Rules: 1–5 + 6,7,8
   */
  returnSearchMany(
    filters?: Record<string, any>,
    orderByField?: string,
    orderByDirection?: "asc" | "desc",
    relatedTables?: string[],
    fields?: string[],
    searchFields?: string[],                    // 6) search fields
    searchOperator?: "AND" | "OR",              // 7) AND/OR
    searchMode?: "like" | "exact"               // 8) like or exact
  ): Promise<Prod[]>;

  returnSearchPaginated(
    filters?: Record<string, any>,
    orderByField?: string,
    orderByDirection?: "asc" | "desc",
    relatedTables?: string[],
    fields?: string[],
    searchFields?: string[],
    searchOperator?: "AND" | "OR",
    searchMode?: "like" | "exact",
    page?: number,
    pageSize?: number
  ): Promise<{ data: Prod[]; total: number }>;


   returnSearchPaginatedWithDetails(
    filters?: Record<string, any>,
    orderByField?: string,
    orderByDirection?: "asc" | "desc",
    searchFields?: string[],
    searchOperator?: "AND" | "OR",
    searchMode?: "like" | "exact",
    page?: number,
    pageSize?: number,
     search?: string 
  ): Promise<{ data: ProdWithDetails[]; total: number }>;

  returnSearchOne(
    filters?: Record<string, any>,
    relatedTables?: string[],
    fields?: string[],
    searchFields?: string[],
    searchOperator?: "AND" | "OR",
    searchMode?: "like" | "exact"
  ): Promise<Prod | null>;

  /**
   * Store new Prod
   */
  store(data: Partial<Prod>): Promise<Prod>;

  /**
   * Update existing Prod
   */
  update(id: number, data: Partial<Prod>): Promise<Prod>;

  /**
   * Delete one Prod
   * Rules: array of related tables to delete
   */
  delete(id: number, relatedTables?: string[]): Promise<void>;

  /**
   * Delete many Prods
   */
  deleteMany(ids: number[], relatedTables?: string[]): Promise<void>;
}
