exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").truncate();
  await knex("posts").truncate();
  await knex("roles").truncate();
  await knex("favorites").truncate();
  await knex("comments").truncate();

  await knex("users").insert([
    {
      username: "burcu",
      password: "1234",
      email: "burcu6@wit.com.tr",
      avatar_url: "b9683d3fe3f25bca278364f64f215c2a.pnj",
    },
    {
      username: "burcu2",
      password: "12345",
      email: "burcu2@wit.com.tr",
      avatar_url: "b9683d3fe3f25bca278364f64f215c2a.pnj",
    },
    {
      username: "burcu3",
      password: "123456",
      email: "burcu3@wit.com.tr",
      avatar_url: "b9683d3fe3f25bca278364f64f215c2a.pnj",
    },
    {
      username: "ahmet",
      password: "1234567",
      email: "ahmet@wit.com.tr",
      avatar_url: "https://example.com/image1",
    },
  ]);
  await knex("posts").insert([
    {
      user_id: 1,
      body: "bugün hava çok güzel",
      image_url: null,
    },
    {
      user_id: 2,
      body: "bugün hava çok kötü",
      image_url: null,
    },
    {
      user_id: 1,
      body: "This is post 1",
      image_url: "https://example.com/image1",
    },
    {
      user_id: 2,
      body: "This is post 2",
      image_url: "https://example.com/image2",
    },
  ]);

  await knex("roles").insert([
    { rolename: "admin", user_id: 1 },
    { rolename: "user", user_id: 2 },
    { rolename: "admin", user_id: 3 },
  ]);

  await knex("comments").insert([
    {
      body: "This is a comment",
      image_url: "https://example.com/comment1",
      posts_id: 1,
      user_id: 2,
      comment_id: 1,
    },
    {
      body: "Seems like there is missing information.",
      user_id: 1,
      posts_id: 1,
      comment_id: 2,
    },
    {
      body: "Well written and easy to understand.",
      user_id: 3,
      posts_id: 1,
      comment_id: 3,
    },
    {
      body: "I would love to see more examples.",
      user_id: 3,
      posts_id: 2,
      comment_id: 4,
    },
    {
      body: "Great job, keep up the good work!",
      user_id: 3,
      posts_id: 3,
      comment_id: 5,
    },
  ]);

  await knex("favorites").insert([
    { user_id: 1, posts_id: 2 },

    { user_id: 2, posts_id: 1 },
    { user_id: 2, posts_id: 1 },
    { user_id: 3, posts_id: 3 },
    { user_id: 3, posts_id: 1 },
  ]);
};
