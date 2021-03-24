const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const suppliers = {};

const handleEvent = (type, data) => {
	if (type === 'SupplierCreated') {
		const { id, name } = data;

		suppliers[id] = { id, name, products: [] };
	}

	if (type === 'ProductCreated') {
		const { id, name, supplierId, status } = data;
		const supplier = suppliers[supplierId];
		supplier.products.push({ id, name, status });
	}

	if (type === 'ProductUpdated') {
		const { id, name, supplierId, status } = data;
		const supplier = suppliers[supplierId];
		const product = supplier.products.find((product) => {
			return product.id === id;
		});
		product.status = status;
		product.name = name;
	}
};

app.get('/suppliers', (req, res) => {
	res.send(suppliers);
});

app.post('/events', (req, res) => {
	const { type, data } = req.body;

	handleEvent(type, data);

	res.send({});
});

app.listen(4002, async () => {
	console.log('Listening on 4002');

	const res = await axios.get('http://localhost:4005/events');

	for (let event of res.data) {
		console.log('Processing event', event.type);
		handleEvent(event.type, event.data);
	}
});
