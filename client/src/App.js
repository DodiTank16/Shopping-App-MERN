import "./App.css";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import Login from "./Components/Login";
import Registration from "./Components/Registration.js";
import HomePage from "./Components/HomePage";
import ProductListing from "./Components/productListing";
import ProductDetails from "./Components/ProductDetails";
import AboutUs from "./Components/AboutUs";
import ContactUs from "./Components/ContactUs";
import Cart from "./Components/Cart";
function App() {
	return (
		<Router>
			<Routes>
				<Route path="/registration" element={<Registration />} />
				<Route path="/Login" element={<Login />} />
				<Route path="/" element={<HomePage />} />
				<Route path="/ProductListing" element={<ProductListing />} />
				<Route path="/ProductListing/:id" element={<ProductDetails />} />
				<Route path="/Cart" element={<Cart />} />
				<Route path="/AboutUs" element={<AboutUs />} />
				<Route path="/ContactUs" element={<ContactUs />} />
				<Route element={<Navigate to="/HomePage" />} />
				<Route path="*" element={<HomePage />} />
			</Routes>
		</Router>
	);
}

export default App;
