const router = require("express").Router();
const userModel = require("./user-model");
const { JWT_SECRET } = require("../secret/index");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const restrict = require("../middleware/restricted");

router.get("/", async (req, res, next) => {
  try {
    const users = await userModel.getAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userModel.getById(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const count = await userModel.remove(id);
    if (count) {
      res.json({ message: `${id}'li kullanıcı silindi.` });
    } else {
      res.status(404).json({ message: `${id}'li kullanıcı bulunamadı.` });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", restrict, async (req, res, next) => {
  try {
    const user_id = req.params.id;
    const { username, password, email } = req.body;
    const user = { username, password, email };
    const updatedUser = await userModel.updateUser(user_id, user);
    if (updatedUser) {
      res.status(201).json({ message: "Kullanıcı başarıyla update edildi." });
    } else {
      res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
