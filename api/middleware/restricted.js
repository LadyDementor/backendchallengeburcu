const tokenHelper = require("../../helper/token-helper");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      res.status(401).json({ message: "Token gereklidir" });
    } else {
      jwt.verify(token, tokenHelper.JWT_SECRET, async (err, decodedToken) => {
       if (err) {
          return res.status(401).json({ message: "Token geçersizdir" });
        } else {
          req.decodedToken = decodedToken; // Kullanıcı kimliğini burada alıyoruz
          next();
        }
      });
    }
  } catch (error) {
    next(error);
  }
};
