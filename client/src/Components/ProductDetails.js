import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import { addCart, setProducts } from "../Redux/actions/productActions";
import Breadcrumb from "./Breadcrumb";

const ProductDetails = () => {
	const { id } = useParams();
	const products = useSelector((state) => state.allProducts.products);
	const [selectedItem, setSelectedItem] = useState([]);
	const { title, description, price, category, image } = selectedItem;
	const [productRate, setProductRate] = useState();
	const token = localStorage.getItem("LoginToken");
	const { state } = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	// console.log(selectedItem);

	useEffect(() => {
		if (!token) navigate("/Login");
		document.title = "Product Details";
	}, [navigate, token]);

	useEffect(() => {
		id && fetchProducts();
	}, [id]);

	const fetchProducts = async () => {
		const response = await axios
			.get(`http://localhost:5001/api/products/${id}`)
			.catch((error) => console.log("Error Occurred : ", error));

		// console.log(response);
		dispatch(setProducts(response.data));
		setSelectedItem(response.data);
		setProductRate(response.data.rating.rate);
	};

	const addToCart = (product) => {
		dispatch(addCart(product));
		navigate("/cart");
	};

	return (
		<>
			<Header />
			<Breadcrumb />
			{Object.keys(products).length === 0 ? (
				<>
					<section className="error-container">
						<span className="four">
							<span className="screen-reader-text">4</span>
						</span>
						<span className="zero">
							<span className="screen-reader-text">0</span>
						</span>
						<span className="four">
							<span className="screen-reader-text">4</span>
						</span>
					</section>

					<div className="flex h-auto">
						<div
							className="bg-darkPink hover:bg-pink text-white font-bold py-2 px-4 rounded w-56 text-center  "
							onClick={() => navigate("/ProductListing")}>
							Go to Products
						</div>
					</div>
				</>
			) : (
				<div className="p-10">
					<div className=" h-full w-full lg:max-w-full lg:flex bg-gray">
						<div
							className="h-100 lg:h-100 lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden border"
							title="Mountain">
							<img src={image} alt={title} style={{ height: "4in" }} />
						</div>
						<div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
							<div className="mb-8">
								<div className="text-gray-900 font-bold text-xl mb-2">
									{title}
								</div>
								<div className="text-gray-900 text-base mb-2">
									<b>Catagory: </b>
									{category}
								</div>
								<p className="text-gray-700 text-base">
									<b>Product Description:</b> {description}
								</p>
							</div>
							<div>
								<div className="text-sm flex items-center mb-3">
									<p
										className="text-gray-900 leading-none"
										style={{
											fontWeight: "600",
											color: "rgba(191, 34, 34, 1)",
											fontSize: 30,
										}}>
										<b>Price: &nbsp;</b>
									</p>
									<p
										className="text-gray-600"
										style={{
											fontWeight: "600",
											color: "rgba(191, 34, 34, 1)",
											fontSize: 30,
										}}>
										{price}$
									</p>
								</div>
								<div className="text-sm flex items-center">
									<p
										className="text-gray-900 leading-none"
										style={{ fontWeight: "600", color: "black", fontSize: 20 }}>
										<b>Rating : &nbsp;</b>
									</p>
									<p
										className="text-gray-600"
										style={{ fontWeight: "600", color: "black", fontSize: 20 }}>
										{productRate}/5
									</p>
								</div>
							</div>
							<button
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
								onClick={() => addToCart(products)}>
								Add to Cart
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ProductDetails;
