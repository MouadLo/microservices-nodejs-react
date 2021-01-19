const express = require('express');
const { randomBytes } = require('crypto');

const app = express();
app.use(express.json());

const commentsByPostd = {};

app.get('/posts/:id/comments', (req, res) => {
	res.send(commentsByPostd[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
	const commentId = randomBytes(4).toString('hex');

	const { content } = req.body;

	const comments = commentsByPostd[req.params.id] || [];
	comments.push({ id: commentId, content });

	commentsByPostd[req.params.id] = comments;
	res.status(201).json(commentsByPostd[req.params.id]);
});

app.listen(4001, () => {
	console.log('Listening on 4001');
});
