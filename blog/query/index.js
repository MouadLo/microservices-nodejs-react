const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const posts = {};
// Quick Example
posts ===
	{
		j123j42: {
			id: 'j123j42',
			title: 'post title',
			comments: [{ id: 'klj3kl', content: 'comment!' }],
		},
		j123j4fg2: {
			id: 'j123j4fg2',
			title: 'post title',
			comments: [{ id: 'klj3kl', content: 'comment!' }],
		},
		j123jfdg42: {
			id: 'j123jfdg42',
			title: 'post title',
			comments: [{ id: 'klj3kl', content: 'comment!' }],
		},
	};

app.get('/posts', (req, res) => {
	res.send(posts);
});

app.post('/events', (req, res) => {
	const { type, data } = req.body;

	if (type === 'PostCreated') {
		const { id, title } = data;

		posts[id] = { id, title, comments: [] };
	}
	if (type === 'CommentCreated') {
		const { id, content, postId } = data;

		const post = posts[postId];

		post.comments.push({ id, content });
	}
	console.log(posts);
	res.send({});
});

app.listen(4002, () => {
	console.log('Listenning on 4002');
});
