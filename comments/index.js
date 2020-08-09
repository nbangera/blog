const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(bodyParser.json());
app.use(cors());
const commentsByPostsId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostsId[req.params.id]) || [];
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { comment } = req.body;
  const comments = commentsByPostsId[req.params.id] || [];
  const data = { id: commentId, comment,status:'pending' };
  comments.push(data);

  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: { ...data, postId: req.params.id },
  });

  commentsByPostsId[req.params.id] = comments;

  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  console.log("Event Recieved", req.body.type);
  const {type,data} = req.body; 
  const {id, comment, postId, status} = data;   

  if( type === 'CommentModerated'){
    
    const comments = commentsByPostsId[postId];
    const comment = comments.find(comment=>comment.id===id);
    comment.status = status;
    const updatedCommentEvent = {
      type:"CommentUpdated",data:{...comment,postId:postId}
    }
    console.log(updatedCommentEvent);
    await axios.post('http://localhost:4005/events',updatedCommentEvent);
  }  
  res.send({});
});

app.listen(4001, () => {
  console.log("listening on port 4001");
});
