const validator = require("validator");
const userModel = require("../users/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../secret/index");

async function checkPayload(req, res, next) {
  try {
    const { username, password, email } = req.body;
    let userNameCheck = username || username.length > 2;
    let passwordCheck = password || password.length > 5;
    let emailCheck = validator.isEmail(email);
    if (!userNameCheck) {
      res
        .status(400)
        .json({ message: "Username must be at least 3 characters." });
    } else if (!passwordCheck) {
      res
        .status(400)
        .json({ message: "Password must be at least 5 characters." });
    } else if (!emailCheck) {
      res.status(400).json({ message: "Email address is not valid." });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}
async function isUserExist(req, res, next) {
  try {
    const { usernameOrEmail } = req.body;
    let existingUser;
    if (validator.isEmail(usernameOrEmail)) {
      existingUser = await userModel.getBy({ email: usernameOrEmail });
    } else {
      existingUser = await userModel.getBy({ username: usernameOrEmail });
    }
    if (existingUser) {
      req.currentUser = existingUser;
      next();
    } else {
      res.status(401).json({ message: "Invalid user or password" });
    }
  } catch (error) {
    next(error);
  }
}

async function checkPassword(req, res, next) {
  const { password } = req.body;
  const dbPassword = req.currentUser.password;
  const isPasswordMatch = bcrypt.compareSync(password, dbPassword);
  try {
    if (!isPasswordMatch) {
      res.status(401).json({ message: "Invalid user or password" });
    } else {
      let payload = {
        username: req.currentUser.username,
        avatar_url: req.currentUser.avatar_url,
        user_id: req.currentUser.user_id,
      };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
      req.token = token;
      next();
    }
  } catch (error) {
    next(error);
  }
}

async function checkPayloadLogin(req, res, next) {
  try {
    const { usernameOrEmail, password } = req.body;
    if (!usernameOrEmail || usernameOrEmail.length < 0 || !password) {
      res.status(400).json({ message: "Username or email are required." });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

async function isUserAlreadyExist(req, res, next) {
  try {
    const { username, email } = req.body;
    const isExistingUser = await userModel.getByUsernameOrEmail(
      { username: username },
      { email: email }
    );
    if (isExistingUser) {
      if (isExistingUser.username === username) {
        return res
          .status(400)
          .json({ message: "This username is already in use." });
      } else if (isExistingUser.email === email) {
        return res
          .status(400)
          .json({ message: "This email address is already in use." });
      }
    } else {
      if (!req.body.avatar_url) {
        req.body.avatar_url =
          "https://i.pinimg.com/564x/b9/68/3d/b9683d3fe3f25bca278364f64f215c2a.jpg";
      }
      next();
    }
  } catch (error) {
    next(error);
  }
}
async function hashPassword(req, res, next) {
  try {
    const hashPassword = bcrypt.hashSync(req.body.password);
    req.body.password = hashPassword;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  hashPassword,
  isUserAlreadyExist,
  checkPayload,
  checkPayloadLogin,
  isUserExist,
  checkPassword,
};
