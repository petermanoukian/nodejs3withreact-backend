export async function up(knex) {
    await knex.schema.createTable("users", (table) => {
        table.increments("id").primary();
        table.string("fullname", 255).notNullable();
        table.string("username", 255).notNullable().unique().index();
        table.string("email", 255).notNullable().unique().index();
        table.string("password", 255).notNullable(); // hashed password
        table.string("remember_token", 100).nullable(); // optional, for "remember me"
        table.timestamps(true, true); // created_at, updated_at
    });
}
export async function down(knex) {
    await knex.schema.dropTableIfExists("users");
}
//# sourceMappingURL=20260404_create_users.js.map