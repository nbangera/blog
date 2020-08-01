const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const commentsByPostsId = {};

app.get('posts/:id/comments', (req, res) => {
    res.send(commentsByPostsId[req.params.id]);
});

app.post('posts/:id/comments', (req, res) => {
    debugger;
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    const comments = commentsByPostsId[req.params.id] || [];
    comments.push({ id: commentId, comment });
    commentsByPostsId[req.params.id] = comments;
    res.status(201).send(comments);

});

app.listen(4001, () => {
    console.log('listening on port 4001')
})