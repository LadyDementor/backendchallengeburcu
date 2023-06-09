const express = require("express");
const server = express();
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const userRouter = require("../api/users/user-router");
const postRouter = require("../api/posts/post-router");
const authRouter = require("../api/auth/auth-router");
const restricted = require("./middleware/restricted");
const commentRouter = require("../api/comments/comment-router");
const favoriteRouter = require("../api/favorites/favorite-router");


server.use(helmet());
server.use(cors());
server.use(morgan("dev"));

server.use(express.json());

server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);
server.use("/api/auth", authRouter);
server.use("/api/comments", commentRouter);
server.use("/api/favorites", favoriteRouter);


module.exports = server;
