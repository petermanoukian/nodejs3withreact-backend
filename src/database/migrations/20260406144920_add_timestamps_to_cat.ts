import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("cat", (table) => {
    table.timestamps(true, true); // adds created_at and updated_at
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("cat", (table) => {
    table.dropColumn("created_at");
    table.dropColumn("updated_at");
  });
}


