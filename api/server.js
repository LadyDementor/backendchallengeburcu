const express = require("express");
const server = express();
const helmet=require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const userRouter = require("../api/users/user-router");
const postRouter = require("../api/posts/post-router");


server.use(helmet());
server.use(cors());
server.use(morgan("dev"));

server.use(express.json());


server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

module.exports = server;
