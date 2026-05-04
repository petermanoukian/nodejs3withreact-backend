"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    await knex.schema.createTable("subcat", (table) => {
        table.increments("id").primary(); // auto-increment PK
        table
            .integer("catid")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("cat")
            .onDelete("CASCADE"); // link to parent cat
        table.string("name", 255).notNullable().index(); // required, indexed
        table.string("img", 255).nullable(); // optional large image
        table.string("img2", 255).nullable(); // optional thumbnail
        table.string("filer", 255).nullable(); // optional file
        table.text("des").nullable(); // short description (text)
        table.specificType("dess", "longtext").nullable(); // long description (wysiwyg)
        table.timestamps(true, true); // created_at, updated_at
    });
}
async function down(knex) {
    await knex.schema.dropTableIfExists("subcat");
}
//# sourceMappingURL=20260411092934_create_subcat.js.map