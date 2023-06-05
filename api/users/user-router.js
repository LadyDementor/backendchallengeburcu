const router = require("express").Router();
const userModel = require("./user-model");
const { JWT_SECRET } = require("../secret/index");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

router.get("/", async (req, res, next) => {
  try {
    const users = await userModel.getAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
});


module.exports = router;
