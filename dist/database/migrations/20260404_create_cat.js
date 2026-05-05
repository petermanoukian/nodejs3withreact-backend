export async function up(knex) {
    await knex.schema.createTable("cat", (table) => {
        table.increments("id").primary(); // auto-increment PK
        table.string("name", 255).notNullable().unique().index(); // required, unique, indexed
        table.string("img", 255).nullable(); // optional large image
        table.string("img2", 255).nullable(); // optional thumbnail
        table.string("filer", 255).nullable(); // optional file
        table.timestamps(true, true);
    });
}
export async function down(knex) {
    await knex.schema.dropTableIfExists("cat");
}
//# sourceMappingURL=20260404_create_cat.js.map