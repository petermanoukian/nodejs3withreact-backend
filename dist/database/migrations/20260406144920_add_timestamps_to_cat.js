"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    await knex.schema.alterTable("cat", (table) => {
        table.timestamps(true, true); // adds created_at and updated_at
    });
}
async function down(knex) {
    await knex.schema.alterTable("cat", (table) => {
        table.dropColumn("created_at");
        table.dropColumn("updated_at");
    });
}
//# sourceMappingURL=20260406144920_add_timestamps_to_cat.js.map