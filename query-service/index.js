const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvents = (type, data) => {
  if (type === "PostCreated") {
    //console.log(data);
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }
  if (type === "CommentCreated") {
    const { id, comment, postId, status } = data;
    posts[postId].comments.push({ id, comment, status });
  }
  if (type === "CommentUpdated") {
    const { id, comment, postId, status } = data;
    const post = posts[postId];
    const commentData = post.comments.find((comment) => comment.id === id);
    commentData.status = status;
    commentData.comment = comment;
  }
};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  //console.log(req.body);
  handleEvents(type, data);
  res.send({});
});

app.listen(4002, async () => {
  console.log("Listening on 4002");
  const res = await axios.get("http://localhost:4005/events");
  console.log(res);
for(let element of res.data) {
    console.log("Processing event  :" + element);
    handleEvents(element.type, element.data);
  };
});
