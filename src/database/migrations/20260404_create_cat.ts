import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("cat", (table) => {
    table.increments("id").primary(); // auto-increment PK
    table.string("name", 255).notNullable().unique().index(); // required, unique, indexed
    table.string("img", 255).nullable();   // optional large image
    table.string("img2", 255).nullable();  // optional thumbnail
    table.string("filer", 255).nullable(); // optional file
    table.timestamps(true, true); 
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("cat");
}
