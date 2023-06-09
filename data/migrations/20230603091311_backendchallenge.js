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

      t.string("image_url");
      t.string("body");

      t.integer("user_id")
        .notNullable()
        .references("user_id") //ilişki kurulacak kolon adı
        .inTable("users") //ilişki kurulacak tablo adı.
        .onDelete("CASCADE")
        .onUpdate("CASCADE"); //RESTRICT yasaklar silinmesini
    })

    .createTable("roles", (table) => {
      table.increments("role_id");
      table.string("rolename").notNullable().defaultTo("user");
      table
        .integer("user_id")
        .notNullable()
        .references("user_id") //ilişki kurulacak kolon adı
        .inTable("users") //ilişki kurulacak tablo adı.
        .onDelete("CASCADE")
        .onUpdate("CASCADE"); //RESTRICT yasaklar silinmesini
    })
    .createTable("comments", (table) => {
      table.increments("comment_id");
      table.timestamp("create_at").defaultTo(knex.fn.now());
      table.string("body").notNullable();
      table.string("image_url");
      table
        .integer("posts_id")
        .notNullable()
        .references("posts_id")
        .inTable("posts")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

      table
        .integer("user_id")
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })

    .createTable("favorites", (t) => {
      t.increments("favorite_id");
      t.timestamp("favorite_at").defaultTo(knex.fn.now());
      t.integer("user_id")
        .notNullable()
        .references("user_id") //ilişki kurulacak kolon adı
        .inTable("users") //ilişki kurulacak tablo adı.
        .onDelete("CASCADE")
        .onUpdate("CASCADE"); //RESTRICT yasaklar silinmesini
      t.integer("posts_id")
        .notNullable()
        .references("posts_id")
        .inTable("posts")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("tokenBlackList", (t) => {
      t.increments(), t.string("token").notNullable();
      t.timestamp("createdate").defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("tokenBlackList")
    .dropTableIfExists("favorites")
    .dropTableIfExists("comments")
    .dropTableIfExists("roles")
    .dropTableIfExists("posts")
    .dropTableIfExists("users");
};
