const router = require("express").Router();
const mw = require("../auth/auth-middleware");
const userModel = require("../users/user-model");
const tokenHelper = require("../../helper/token-helper");
const restricted = require("../middleware/restricted");

router.post(
  "/register",
  mw.checkPayload,
  mw.isUserAlreadyExist,
  mw.hashPassword,
  async (req, res, next) => {
    try {
      let { username, password, email, avatar_url } = req.body;
      const newUser = {
        username: username,
        password: password,
        email: email,
        avatar_url: avatar_url,
      };
      const insertedUser = await userModel.create(newUser);
      res
        .status(201)
        .json({ message: "User successfully created.", insertedUser });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/login",
  mw.checkPayloadLogin,
  mw.isUserExist,
  mw.checkPassword,
  (req, res, next) => {
    try {
      res.status(201).json({
        message: "User successfully logged in.",
        token: req.token,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get("/logout", restricted, (req, res, next) => {
  try {
    tokenHelper.logout(req.headers.authorization);
    res.json({ message: "Çıkış işlemi başarılı" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
