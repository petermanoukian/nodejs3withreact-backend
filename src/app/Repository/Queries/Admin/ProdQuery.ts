// src/app/Repository/Queries/Admin/ProdQuery.ts
import { Knex } from "knex";
import { Prod } from "@Model/Admin/Prod.model";
import { ProdInterface, ProdWithDetails } from "@Repository/Interface/Admin/ProdInterface";
import {
  runQuery,
  runQueryOne,
  runQueryPaginated,
  runQueryReturning,
  runQueryDelete,
  runQueryPaginatedWithAlias
} from "@Repository/Helpers/queryHelper";

export class ProdQuery implements ProdInterface {
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
  ): Promise<Prod[]> {
    let query = this.db<Prod>("prod").select(fields);

    Object.entries(filters).forEach(([key, value]) => {
      query.where(key, value);
    });

    query.orderBy(orderByField, orderByDirection);

    return runQuery<Prod>(query);
  }

  async returnManyPaginated(
    filters: Record<string, any> = {},
    orderByField: string = "id",
    orderByDirection: "asc" | "desc" = "desc",
    relatedTables: string[] = [],
    fields: string[] = ["*"],
    page: number = 1,
    pageSize: number = 10
  ): Promise<{ data: Prod[]; total: number }> {
    let query = this.db<Prod>("prod").select(fields);
    Object.entries(filters).forEach(([key, value]) => query.where(key, value));

    return runQueryPaginated<Prod>(query, page, pageSize, orderByField, orderByDirection);
  }

  async returnOne(
    filters: Record<string, any> = {},
    relatedTables: string[] = [],
    fields: string[] = ["*"]
  ): Promise<Prod | null> {
    let query = this.db<Prod>("prod").select(fields);
    Object.entries(filters).forEach(([key, value]) => query.where(key, value));

    return runQueryOne<Prod>(query);
  }

  async returnOneById(
    id: number,
    relatedTables: string[] = [],
    fields: string[] = ["*"]
  ): Promise<Prod | null> {
    const query = this.db<Prod>("prod")
      .select(fields)
      .where("id", id);

    return runQueryOne<Prod>(query);
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
  ): Promise<Prod[]> {
    let query = this.db<Prod>("prod").select(fields);
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

    return runQuery<Prod>(query);
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
  ): Promise<{ data: Prod[]; total: number }> {
    const baseQuery = this.db<Prod>("prod").select(fields);
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

    return runQueryPaginated<Prod>(baseQuery, page, pageSize, orderByField, orderByDirection);
  }




  async returnSearchPaginatedWithDetails(
    filters: Record<string, any> = {},
    orderByField: string = "id",
    orderByDirection: "asc" | "desc" = "desc",
    searchFields: string[] = [],
    searchOperator: "AND" | "OR" = "AND",
    searchMode: "like" | "exact" = "like",
    page: number = 1,
    pageSize: number = 10,
    search: string = ""   // ✅ added search term
  ): Promise<{ data: ProdWithDetails[]; total: number }> {
    const baseQuery = this.db("prod")
      .select(
        "prod.*",
        "cat.name as catName",
        "subcat.name as subcatName"
      )
      .leftJoin("cat", "prod.catid", "cat.id")
      .leftJoin("subcat", "prod.subcatid", "subcat.id");

    // apply filters (catid, subcatid etc)
    Object.entries(filters).forEach(([key, value]) => {
      baseQuery.where(`prod.${key}`, value);
    });


    const fieldMap: Record<string, string> = {
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
          } else {
            idx === 0
              ? builder.where(column, searchMode === "like" ? "like" : "=", clause)
              : builder.orWhere(column, searchMode === "like" ? "like" : "=", clause);
          }
        });
      });
    }



    

    return runQueryPaginatedWithAlias<ProdWithDetails>(
      baseQuery,
      page,
      pageSize,
      `prod.${orderByField}`,
      orderByDirection,
      "prod.id"
    );
  }


  async returnSearchOne(
    filters: Record<string, any> = {},
    relatedTables: string[] = [],
    fields: string[] = ["*"],
    searchFields: string[] = [],
    searchOperator: "AND" | "OR" = "AND",
    searchMode: "like" | "exact" = "like"
  ): Promise<Prod | null> {
    const query = this.db<Prod>("prod").select(fields);
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

    return runQueryOne<Prod>(query);
  }

  async store(data: Partial<Prod>): Promise<Prod> {
    return await runQueryReturning<Prod>(
      this.db<Prod>("prod").insert(data)
    );
  }

  async update(id: number, data: Partial<Prod>): Promise<Prod> {
      await this.db<Prod>("prod")
          .where("id", id)
          .update(data);

      const updated = await this.db<Prod>("prod")
          .where("id", id)
          .first();

      if (!updated) {
          throw new Error("Prod not found after update");
      }

      return updated;
  }

  async delete(id: number, relatedTables: string[] = []): Promise<void> {
    await runQueryDelete(
      this.db<Prod>("prod").where("id", id)
    );
  }

  async deleteMany(ids: number[], relatedTables: string[] = []): Promise<void> {
    await runQueryDelete(
      this.db<Prod>("prod").whereIn("id", ids)
    );
  }
}
