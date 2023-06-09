const db = require("../../data/dbConfig");

function getLikesByPostId(posts_id) {
  return db("favorites").where("posts_id", posts_id);
}

function getLikesByUserId(user_id) {
  return db("favorites").where("user_id", user_id);
}

function deleteLike(posts_id) {
  return db("favorites").where("posts_id", posts_id).del();
}

function deleteLikeByUserId(user_id) {
  return db("favorites").where("user_id", user_id).del();
}

module.exports = {
  deleteLike,
  getLikesByPostId,
  getLikesByUserId,
  deleteLikeByUserId,
};
