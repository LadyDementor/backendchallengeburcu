const db = require("../../data/dbConfig");

const getAllComments = async () => {
  const comments = await db("comments").select("*");
  return comments;
};

//idye göre bir yorumu veritabanından alır
const getCommentById = async (comment_id) => {
  const comment = await db("comments").where("comment_id", comment_id).first();
  return comment;
};

//post ıdye göre yorumları veritabanından alır
const getCommentsByPostId = async (posts_id) => {
  const comments = await db("comments").where("posts_id", posts_id);
  return comments;
};

const createComment = async (comment) => {
  const [createdCommentId] = await db("comments").insert(comment);
  return createdCommentId;
};

const updateComment = async (comment_id, updatedComment) => {
  const updated = await db("comments")
    .where("comment_id", comment_id)
    .update(updatedComment);
  return updated;
};

const deleteComment = async (comment_id) => {
  const deleted = await db("comments")
    .where("comment_id", comment_id)
    .del()
    .first();
  return deleted;
};

module.exports = {
  getAllComments,

  getCommentById,

  getCommentsByPostId,

  createComment,

  updateComment,

  deleteComment,
};
