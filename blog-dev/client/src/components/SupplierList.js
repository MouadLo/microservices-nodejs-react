import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InvoiceCreate from './ProductCreate';
import ProductList from './ProductList';

const SupplierList = () => {
	const [suppliers, setSuppliers] = useState({});

	const fetchSuppliers = async () => {
		const res = await axios.get('http://localhost:4002/suppliers');

		console.log(res.data);
		setSuppliers(res.data);
	};

	useEffect(() => {
		fetchSuppliers();
	}, []);

	const renderedSuppliers = Object.values(suppliers).map((supplier) => {
		return (
			<div
				className="card"
				style={{ width: '30%', marginBottom: '20px' }}
				key={supplier.id}
			>
				<div className="card-body">
					<h3>{supplier.name}</h3>
					<ProductList products={supplier.products} />
					<InvoiceCreate supplierId={supplier.id} />
				</div>
			</div>
		);
	});
	return (
		<div className="d-flex flex-row flex-wrap justify-content-between">
			{renderedSuppliers}
		</div>
	);
};

export default SupplierList;
