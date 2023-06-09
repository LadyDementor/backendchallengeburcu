const db = require("../../data/dbConfig");

const getAllPost = () => {
  return db("posts");
};

const getPostById = async (posts_id) => {
  return db("posts").where("posts_id", posts_id).first();
};

const createPost = async (posts) => {
  const inserted = await db("posts").insert(posts);
  return getPostById(inserted[0]);
};

const updatePost = async (posts_id, postUpdated) => {
  const updated = await db("posts")
    .where("posts_id", posts_id)
    .update(postUpdated);
   
  return updated;
};

const deletePost = async (post_id) => {
  const deleted = await db("posts").where("posts_id", post_id).del();
  return deleted;
};

module.exports = {
  createPost,

  getAllPost,

  getPostById,

  updatePost,

  deletePost,
};
