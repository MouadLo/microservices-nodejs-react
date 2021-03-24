import SupplierCreate from './components/SupplierCreate';
import SupplierList from './components/SupplierList';

function App() {
	return (
		<div className="container">
			<h1>Create Supplier</h1>
			<SupplierCreate />
			<hr />
			<h1>Suppliers</h1>
			<SupplierList />
		</div>
	);
}

export default App;
