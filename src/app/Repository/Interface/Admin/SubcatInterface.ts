// src/app/Repository/Interface/Admin/SubcatInterface.ts
import { Subcat } from "@Model/Admin/Subcat.model";

export interface SubcatWithCounts extends Subcat {
  prodCount: number;
  catName?: string;
}

export interface SubcatInterface {
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
  ): Promise<Subcat[]>;

  returnManyPaginated(
    filters?: Record<string, any>,
    orderByField?: string,
    orderByDirection?: "asc" | "desc",
    relatedTables?: string[],
    fields?: string[],
    page?: number,                              // 9) pagination
    pageSize?: number
  ): Promise<{ data: Subcat[]; total: number }>;

  /**
   * Return one row
   * Rules: 1,2,3
   */
  returnOne(
    filters?: Record<string, any>,              // 3) additional filters
    relatedTables?: string[],                   // 2) related tables
    fields?: string[]                           // 1) all fields or certain
  ): Promise<Subcat | null>;

  /**
   * Return one by ID
   * Rules: 2 params
   */
  returnOneById(
    id: number,
    relatedTables?: string[],
    fields?: string[]
  ): Promise<Subcat | null>;

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
  ): Promise<Subcat[]>;

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
  ): Promise<{ data: Subcat[]; total: number }>;


  returnSearchPaginatedWithCounts(
  filters?: Record<string, any>,
  orderByField?: string,
  orderByDirection?: "asc" | "desc",
  searchFields?: string[],
  searchOperator?: "AND" | "OR",
  searchMode?: "like" | "exact",
  page?: number,
  pageSize?: number
): Promise<{ data: SubcatWithCounts[]; total: number }>;

  returnSearchOne(
    filters?: Record<string, any>,
    relatedTables?: string[],
    fields?: string[],
    searchFields?: string[],
    searchOperator?: "AND" | "OR",
    searchMode?: "like" | "exact"
  ): Promise<Subcat | null>;

  /**
   * Store new Subcat
   */
  store(data: Partial<Subcat>): Promise<Subcat>;

  /**
   * Update existing Subcat
   */
  update(id: number, data: Partial<Subcat>): Promise<Subcat>;

  /**
   * Delete one Subcat
   * Rules: array of related tables to delete
   */
  delete(id: number, relatedTables?: string[]): Promise<void>;

  /**
   * Delete many Subcats
   */
  deleteMany(ids: number[], relatedTables?: string[]): Promise<void>;
}
