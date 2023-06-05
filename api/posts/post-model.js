const db = require("../../data/dbConfig");

const getAll = () => {
  return db("posts")
   
};

const getById = async (id) => {
  return db("posts").where("id", post_id).first();
};

const create = async (posts) => {
  const inserted = await db("posts").insert(posts);
  return getById(inserted[0]);
};

module.exports = {
  create,

  getAll,

  getById,
};
