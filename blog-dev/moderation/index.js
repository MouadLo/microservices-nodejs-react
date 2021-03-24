const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/events', async (req, res) => {
	const { type, data } = req.body;

	if (type === 'ProductCreated') {
		const status = data.name.includes('orange') ? 'rejected' : 'approved';

		await axios.post('http://localhost:4005/events', {
			type: 'ProductModerated',
			data: {
				id: data.id,
				supplierId: data.supplierId,
				status,
				name: data.name,
			},
		});
	}

	res.send({});
});

app.listen(4003, () => {
	console.log('Listening on 4003');
});
