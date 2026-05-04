import { Knex } from "knex";

/**
 * Run a Knex query and cast the result to the expected type array.
 */
export async function runQuery<T>(
query: Knex.QueryBuilder<any, any>
): Promise<T[]> 
{
    const results = await query;
    return results as unknown as T[];
}

/**
 * Run a Knex query that returns a single row.
 */
export async function runQueryOne<T>(
query: Knex.QueryBuilder<any, any>
): Promise<T | null> 
{
    const result = await query.first();
    return (result ?? null) as unknown as T | null;
}

/**
 * Run a Knex query with pagination and return data + total count.
 */
export async function runQueryPaginated<T>(
query: Knex.QueryBuilder<any, any>,
page: number,
pageSize: number,
orderByField: string,
orderByDirection: "asc" | "desc"
): Promise<{ data: T[]; total: number }> {
// total count
    const totalRow = await query.clone().count<{ count: number }>("id as count").first();
    const total = Number(totalRow?.count ?? 0);

    // paginated data
    const data = await query
        .orderBy(orderByField, orderByDirection)
        .offset((page - 1) * pageSize)
        .limit(pageSize);

    return { data: data as unknown as T[], total };
}


/**
 * Run a Knex query with pagination using a custom count field (for joins).
 */

export async function runQueryPaginatedWithAlias<T>(
  query: Knex.QueryBuilder<any, any>,
  page: number,
  pageSize: number,
  orderByField: string,
  orderByDirection: "asc" | "desc",
  countField: string
): Promise<{ data: T[]; total: number }> {
  const totalRow = await query
    .clone()
    .clearSelect() // 👈 remove prod.*, catName, subcatName
    .count<{ count: number }>(`${countField} as count`)
    .first();
  const total = Number(totalRow?.count ?? 0);

  const data = await query
    .orderBy(orderByField, orderByDirection)
    .offset((page - 1) * pageSize)
    .limit(pageSize);

  return { data: data as unknown as T[], total };
}

/**
 * Run a Knex insert/update with returning and cast to typed row array.
 */
/**
 * Run a Knex insert/update with returning and cast to typed row array.
 * Guarantees at least one row or throws.
 */
export async function runQueryReturning<T>(
    query: Knex.QueryBuilder<any, any>
    ): Promise<T> {
    const results = await query.returning("*");
    const rows = results as unknown as T[];
    if (!rows[0]) {
        throw new Error("No rows returned from insert/update");
    }
    return rows[0];
}

/**
 * Run a Knex delete query and normalize to void.
 */
export async function runQueryDelete(
  query: Knex.QueryBuilder<any, any>
): Promise<void> {
  await query.delete();
}





