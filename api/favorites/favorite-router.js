const router = require("express").Router();

const favoriteModel = require("../favorites/favorite-model");
const restrict = require("../middleware/restricted");

// GET /favorites/:postId
router.get("/:posts_id", restrict, async (req, res, next) => {
  const posts_id = req.params.posts_id;
  try {
    const likes = await favoriteModel.getLikesByPostId(posts_id);
    if (likes) {
      res.json(likes);
    } else {
      res
        .status(404)
        .json({ message: "Beğenileri getirirken bir hata oluştu." });
    }
  } catch (error) {
    next(error);
  }
});

// GET /favorites/users/:user_id
router.get("/users/:user_id", restrict, async (req, res, next) => {
  try {
    const user_id = req.params.user_id;
    const likes = await favoriteModel.getLikesByUserId(user_id);
    if (likes) {
      res.json(likes);
    } else {
      res
        .status(404)
        .json({ message: "Beğenileri getirirken bir hata oluştu." });
    }
  } catch (error) {
    next(error);
  }
});

// DELETE /favorites/:postId
router.delete("/:posts_id", restrict, async (req, res) => {
  const posts_id = req.params.posts_id;
  try {
    const deletedLike = await favoriteModel.deleteLike(posts_id);
    if (deletedLike) {
      res.json({ message: "Beğeni silindi." });
    } else {
      res.status(404).json({ message: "Beğeni bulunamadı." });
    }
  } catch (error) {
    res.status(500).json({ message: "Beğeni silinirken bir hata oluştu." });
  }
});

// DELETE /favorites/:user_id
router.delete("/users/:user_id", restrict, async (req, res) => {
  const user_id = req.params.user_id;
  try {
    const deletedLike = await favoriteModel.deleteLikeByUserId(user_id);
    if (deletedLike) {
      res.json({ message: "Beğeni silindi." });
    } else {
      res.status(404).json({ message: "Beğeni bulunamadı." });
    }
  } catch (error) {
    res.status(500).json({ message: "Beğeni silinirken bir hata oluştu." });
  }
});

module.exports = router;
