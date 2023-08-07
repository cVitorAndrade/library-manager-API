exports.up = knex => knex.schema.createTable("authors", (table) => {
    table.increments("id");
    table.text("author");
    table.integer("work_id").references("id").inTable("works").onDelete("CASCADE");
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
})

exports.down = knex => knex.schema.dropTable("authors");
