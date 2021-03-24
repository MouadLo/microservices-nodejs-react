import React from 'react';

const ProductList = ({ products }) => {
	const renderedProducts = products.map((product) => {
		let name;
		if (product.status === 'approved') {
			name = product.name;
		}
		if (product.status === 'pending') {
			name = 'This product is awaiting moderation';
		}
		if (product.status === 'rejected') {
			name = 'This product has been rejected';
		}
		return <li key={product.id}> {name}</li>;
	});
	return <ul>{renderedProducts}</ul>;
};

export default ProductList;
