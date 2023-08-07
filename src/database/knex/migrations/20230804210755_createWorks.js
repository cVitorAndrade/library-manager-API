exports.up = knex => knex.schema.createTable("works", (table) => {
    table.increments("id");
    table.text("title");
    table.text("publisher");
    table.text("image");

    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
})

exports.down = knex => knex.schema.dropTable("works");
