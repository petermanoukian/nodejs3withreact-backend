/**
 * Run a Knex query and cast the result to the expected type array.
 */
export async function runQuery(query) {
    const results = await query;
    return results;
}
/**
 * Run a Knex query that returns a single row.
 */
export async function runQueryOne(query) {
    const result = await query.first();
    return (result ?? null);
}
/**
 * Run a Knex query with pagination and return data + total count.
 */
export async function runQueryPaginated(query, page, pageSize, orderByField, orderByDirection) {
    // total count
    const totalRow = await query.clone().count("id as count").first();
    const total = Number(totalRow?.count ?? 0);
    // paginated data
    const data = await query
        .orderBy(orderByField, orderByDirection)
        .offset((page - 1) * pageSize)
        .limit(pageSize);
    return { data: data, total };
}
/**
 * Run a Knex query with pagination using a custom count field (for joins).
 */
export async function runQueryPaginatedWithAlias(query, page, pageSize, orderByField, orderByDirection, countField) {
    const totalRow = await query
        .clone()
        .clearSelect() // 👈 remove prod.*, catName, subcatName
        .count(`${countField} as count`)
        .first();
    const total = Number(totalRow?.count ?? 0);
    const data = await query
        .orderBy(orderByField, orderByDirection)
        .offset((page - 1) * pageSize)
        .limit(pageSize);
    return { data: data, total };
}
/**
 * Run a Knex insert/update with returning and cast to typed row array.
 */
/**
 * Run a Knex insert/update with returning and cast to typed row array.
 * Guarantees at least one row or throws.
 */
export async function runQueryReturning(query) {
    const results = await query.returning("*");
    const rows = results;
    if (!rows[0]) {
        throw new Error("No rows returned from insert/update");
    }
    return rows[0];
}
/**
 * Run a Knex delete query and normalize to void.
 */
export async function runQueryDelete(query) {
    await query.delete();
}
//# sourceMappingURL=queryHelper.js.map