// src/database/migrations/20260412081707_create_prod.ts
import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("prod", (table) => {
    table.increments("id").primary(); // auto-increment PK

    table
      .integer("catid")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("cat")
      .onDelete("CASCADE"); // link to parent cat

    table
      .integer("subcatid")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("subcat")
      .onDelete("CASCADE"); // link to parent subcat

    table.string("name", 255).notNullable().index(); // required, indexed
    table.string("img", 255).nullable();   // optional large image
    table.string("img2", 255).nullable();  // optional thumbnail
    table.string("filer", 255).nullable(); // optional file

    table.text("des").nullable();          // short description (text)
    table.specificType("dess", "longtext").nullable(); // long description (wysiwyg)

    table.timestamps(true, true); // created_at, updated_at

    // ✅ Uniqueness constraint: catid + subcatid + name
    table.unique(["catid", "subcatid", "name"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("prod");
}
