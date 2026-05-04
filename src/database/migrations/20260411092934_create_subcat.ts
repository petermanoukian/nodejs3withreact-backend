// src/database/migrations/20260411_create_subcat.ts
import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
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
    table.string("img", 255).nullable();   // optional large image
    table.string("img2", 255).nullable();  // optional thumbnail
    table.string("filer", 255).nullable(); // optional file

    table.text("des").nullable();          // short description (text)
    table.specificType("dess", "longtext").nullable(); // long description (wysiwyg)

    table.timestamps(true, true); // created_at, updated_at
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("subcat");
}

