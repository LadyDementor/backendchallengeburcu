const commentModel = require("./comment-model");

const usersModel = require("../users/users-model");
const postsModel = require("../posts/posts-model");
const tokenHelper = require("../../helper/token-helper");

const checkPayload = async (req, res, next) => {
  try {

    const { body,posts_id } = req.body;
    if (!userId || !postId || !body || body.trim().length > 280) {
      res
        .status(400)
        .json({ message: `Can not create comment for post id: ${posts_id}.` });
    } else {
      const isUserExist = await usersModel.getById(userId);
      const isPostExist = await postsModel.getById(posts_id);
      if (!isUserExist) {
        res
          .status(400)
          .json({ message: `Can not found user with id: ${userId}.` });
      } else if (!isPostExist) {
        res
          .status(400)
          .json({ message: `Can not found post with id: ${postId}.` });
      } else {
        next();
      }
    }
  } catch (error) {
    next(error);
  }
};
module.exports = {
  
  checkPayload,

};
