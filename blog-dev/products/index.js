const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const productsBySuppliersId = {};

app.get('/suppliers/:id/products', (req, res) => {
	res.send(productsBySuppliersId[req.params.id] || []);
});

app.post('/suppliers/:id/products', async (req, res) => {
	const productId = randomBytes(4).toString('hex');
	const { name } = req.body;

	const products = productsBySuppliersId[req.params.id] || [];

	products.push({ id: productId, name, status: 'pending' });

	productsBySuppliersId[req.params.id] = products;

	await axios.post('http://localhost:4005/events', {
		type: 'ProductCreated',
		data: {
			id: productId,
			name,
			supplierId: req.params.id,
		},
	});
	res.status(201).send(products);
});

app.post('/events', async (req, res) => {
	console.log('Received Event', req.body.type);

	const { type, data } = req.body;
	if (type === 'ProductModerated') {
		const { supplierId, name, status, id } = data;
		const products = productsBySuppliersId[supplierId] || [];

		const product = products.find((product) => {
			return product.id === id;
		});
		product.status = status;

		await axios.post('http://localhost:4005/events', {
			type: 'ProductUpdated',
			data: {
				id,
				name,
				supplierId,
				status,
			},
		});
	}
	res.send({});
});

app.listen(4001, () => {
	console.log('Listening on port 4001');
});
