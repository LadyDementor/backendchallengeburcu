const router = require("express").Router();
const commentModel = require("../comments/comment-model");
const restrict = require("../middleware/restricted");
const commentMiddleware = require("./comment-model");

router.get("/", async (req, res, next) => {
  try {
    const comments = await commentModel.getAllComments();
    if (!comments) {
      res.status(404).json({ message: "Yorumları getirirken bir hata oluştu" });
    } else {
      res.json(comments);
      next();
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const comment_id = req.params.id;
    const comment = await commentModel.getCommentById(comment_id);
    if (comment) {
      res.json(comment);
      next();
    } else {
      res.status(404).json({ message: "Yorum bulunamadı." });
    }
  } catch (error) {
    next(error);
  }
});

//postıd'ye göre yorumları getir
router.get("/posts/:post_id", async (req, res, next) => {
  try {
    const post_id = req.params.post_id;
    const comments = await commentModel.getCommentsByPostId(post_id);
    if (!comments) {
      res.status(404).json({ message: "Yorumları getirirken hata oluştu." });
    } else {
      res.json(comments);
      next();
    }
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  restrict,

  async (req, res, next) => {
    try {
      const { body, posts_id } = req.body;
      const comment = {
        body,
        user_id: req.decodedToken.user_id,
        posts_id,
      };
      const newCommentId = await commentModel.createComment(comment);
      if (newCommentId) {
        res.json({ comment_id: newCommentId });
        next();
      } else {
        res
          .status(404)
          .json({ message: "Yorum oluşturulurken bir hata oluştu." });
      }
    } catch (error) {
      next(error);
    }
  }
);

router.put("/:id", restrict, async (req, res, next) => {
  try {
    const comment_id = req.params.id;
    const { body } = req.body;
    const comment = {
      body,
      user_id: req.decodedToken.user_id,
    };
    const updatedComment = await commentModel.updateComment(
      comment_id,
      comment
    );
    if (updatedComment) {
      res.json({ message: "Yorum başarıyla güncellendi." });
      next();
    } else {
      res
        .status(404)
        .json({ message: "Yorum güncellenirken bir hata oluştu." });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const comment_id = req.params.id;
    const deletedComment = await commentModel.deleteComment(comment_id);
    if (deletedComment) {
      res.status(201).json({ message: "Yorum başarıyla silindi." });
      next();
    } else {
      res.status(404).json({ message: "Yorum silinirken bir hata oluştu." });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
