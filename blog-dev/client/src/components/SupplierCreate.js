import React, { useState } from 'react';
import axios from 'axios';

const SupplierCreate = () => {
	const [name, setName] = useState('');
	const onSubmit = async (e) => {
		e.preventDefault();

		await axios.post('http://localhost:4000/suppliers', {
			name,
		});

		setName('');
	};
	return (
		<div>
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label>Name</label>
					<input
						value={name}
						className="form-control"
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<button className="btn btn-primary">Submit</button>
			</form>
		</div>
	);
};

export default SupplierCreate;
