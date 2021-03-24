import React, { useState } from 'react';
import axios from 'axios';

const ProductCreate = ({ supplierId }) => {
	const [name, setName] = useState('');

	const onSubmit = async (e) => {
		e.preventDefault();

		await axios.post(`http://localhost:4001/suppliers/${supplierId}/products`, {
			name,
		});

		setName('');
	};
	return (
		<div>
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label>New Product</label>
					<input
						className="form-control"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<button className="btn btn-primary">Submit</button>
			</form>
		</div>
	);
};

export default ProductCreate;
