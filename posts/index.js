const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const axios = require("axios");

app.use(bodyParser.json());
app.use(cors());

const posts = {};
app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts/create", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  const data = {
    id,
    title,
  };
  posts[id] = data;

  await axios.post("http://event-bus-clusterip-srv:4005/events", {
    type: "PostCreated",
    data: data,
  });
  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Event Recieved", req.body.type);
  res.send({});
});

app.listen(4000, () => {
  console.log("listening on port 4000");
});
