const router = require("express").Router();
const postModel = require("../posts/post-model");
const restrict = require("../middleware/restricted");

router.get("/", async (req, res, next) => {
  try {
    const posts = await postModel.getAllPost();
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const post_id = req.params.id;

    const post = await postModel.getPostById(post_id);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: "Postu getirirken hata oluştu." });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", restrict, async (req, res, next) => {
  try {
    const { body } = req.body;
    const post = { body: body, user_id: req.decodedToken.user_id };

    const newPost = await postModel.createPost(post);
    res.status(201).json({ message: "post created successfull" });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", restrict, async (req, res, next) => {
  try {
    const post_id = req.params.id;
    const { body } = req.body;
    const { user_id } = req.decodedToken;
    const update = { body, user_id };

    const updatedPost = await postModel.updatePost(post_id, update);

    if (updatedPost) {
      res.status(200).json({ message: "Postun başarıyla güncellendi." });
    } else {
      res.status(500).json({ message: "Post güncellenirken bir hata oluştu." });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", restrict, async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletePost = await postModel.deletePost(id);
    if (deletePost) {
      res.status(200).json({ message: "post deleted" });
    } else {
      res.status(404).json({ message: "Post silinirken bir hata oluştu." });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
