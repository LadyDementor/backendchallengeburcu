/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("user_id");
      table.string("username").notNullable().unique();
      table.string("password").notNullable();
      table.string("avatar_url");
      table.string("email").notNullable().unique();
    })

    .createTable("posts", (t) => {
      t.increments("posts_id");
      t.timestamp("created_at").defaultTo(knex.fn.now());

      t.string("image_url").notNullable();
      t.string("body").notNullable();

      t.integer("user_id")
        .notNullable()
        .references("user_id") //ilişki kurulacak kolon adı
        .inTable("users") //ilişki kurulacak tablo adı.
        .onDelete("RESTRICT")
        .onUpdate("RESTRICT"); //RESTRICT yasaklar silinmesini
    })

    .createTable("roles", (table) => {
      table.increments("role_id");
      table.string("rolename").notNullable().defaultTo("user");
      table
        .integer("user_id")
        .notNullable()
        .references("user_id") //ilişki kurulacak kolon adı
        .inTable("users") //ilişki kurulacak tablo adı.
        .onDelete("RESTRICT")
        .onUpdate("RESTRICT"); //RESTRICT yasaklar silinmesini
    })
    .createTable("comments", (table) => {
      table.increments("comment_id");

      table.timestamp("create_at").defaultTo(knex.fn.now());
      table.string("body").notNullable();
      table.string("image_url");
      table
        .integer("post_id")
        .notNullable()
        .references("post_id")
        .inTable("posts")
        .onDelete("RESTRICT")
        .onUpdate("RESTRICT");
      table
        .integer("user_id")
        .notNullable()
        .references("user_id") //ilişki kurulacak kolon adı
        .inTable("users") //ilişki kurulacak tablo adı.
        .onDelete("RESTRICT")
        .onUpdate("RESTRICT"); //RESTRICT yasaklar silinmesini
    })

    .createTable("favorites", (t) => {
      t.increments("favorite_id");
      t.timestamp("favorite_at").defaultTo(knex.fn.now());
      t.integer("user_id")
        .notNullable()
        .references("user_id") //ilişki kurulacak kolon adı
        .inTable("users") //ilişki kurulacak tablo adı.
        .onDelete("RESTRICT")
        .onUpdate("RESTRICT"); //RESTRICT yasaklar silinmesini
      t.integer("post_id")
        .notNullable()
        .references("post_id")
        .inTable("posts")
        .onDelete("RESTRICT")
        .onUpdate("RESTRICT");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("favorites")
    .dropTableIfExists("comments")
    .dropTableIfExists("roles")
    .dropTableIfExists("posts")
    .dropTableIfExists("users");
};
