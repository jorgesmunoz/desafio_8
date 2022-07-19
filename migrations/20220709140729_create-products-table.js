/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("products", (table) => {
      table.increments("id");
      table.string("title", 30).notNullable();
      table.string("description", 30);
      table.float("price", 2).notNullable();
      table.timestamps("created_at");
      table.integer("code");
      table.string("picture").notNullable();
      table.integer("stock");
    })
    .createTable("messages", (table) => {
      table.increments("id");
      table.string("email").notNullable().index();
      table.string("message").notNullable();
      table.timestamps("created_at");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("messages").dropTableIfExists;
};
