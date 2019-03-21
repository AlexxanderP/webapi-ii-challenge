const express = require("express");

const postRouter = require("./data/postsRouter");

const server = express();

server.use(express.json());

server.use("/api/posts", postRouter);

server.get("/", (req, res) => {
  res.send(`
        Server Active! Welcome :)
    `);
});

module.exports = server;
