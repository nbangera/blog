const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;  
  if (type === "CommentCreated") {
    const status = data.comment.includes("orange") ? "rejected" : "approved";
    const comment = { type: "CommentModerated",data :{...data, status: status}};
    console.log('comment moderated');
    console.log(comment);
    await axios.post("http://event-bus-clusterip-srv:4005/events", comment);
  }
  res.send({});
});

app.listen(4003, () => {
  console.log("Listening on port 4003");
});
