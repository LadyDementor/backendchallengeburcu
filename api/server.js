const express = require("express");
const server = express();
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const userRouter = require("../api/users/user-router");
const postRouter = require("../api/posts/post-router");
const authRouter = require("../api/auth/auth-router");

server.use(helmet());
server.use(cors());
server.use(morgan("dev"));

server.use(express.json());

server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);
server.use("/api/auth", authRouter);

module.exports = server;
