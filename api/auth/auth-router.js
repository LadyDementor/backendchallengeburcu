const router = require("express").Router();
const mw = require("../auth/auth-middleware");
const userModel = require("../users/user-model");

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

module.exports = router;
