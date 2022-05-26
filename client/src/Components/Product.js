import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { filterByCategory, setProducts } from "../Redux/actions/productActions";

const Product = () => {
	const products = useSelector((state) => state.allProducts.filterItem);
	const dispatch = useDispatch();
	const [flag, setFlag] = React.useState();
	const [data, setData] = React.useState([]);
	const navigate = useNavigate();
	const token = localStorage.getItem("LoginToken");
	const filterByCategoryProducts = useSelector(
		(state) => state.allProducts.filteredProductsByCategory
	);
	const [state, setState] = useState([
		{
			id: 1,
			name: "All",
			checked: true,
			value: "ALL",
		},
		{
			id: 2,
			name: "Men",
			value: "men's clothing",
			checked: false,
		},
		{
			id: 3,
			name: "Women",
			value: "women's clothing",
			checked: false,
		},
		{
			id: 4,
			name: "Jewelery",
			checked: false,
			value: "jewelery",
		},
		{
			id: 5,
			name: "Electronics",
			checked: false,
			value: "electronics",
		},
	]);

	useEffect(() => {
		if (!token) navigate("/Login");
		document.title = "Products";
	}, []);

	useEffect(() => {
		setData(products);
	}, [products]);

	useEffect(() => {
		setData(filterByCategoryProducts);
	}, [filterByCategoryProducts]);

	const handleSort = (data) => {
		const sortedData = data.sort((first, second) => {
			var titleOfA = first.title.toUpperCase();
			var titleOfB = second.title.toUpperCase();
			if (titleOfA < titleOfB) {
				return -1;
			}
			if (titleOfA > titleOfB) {
				return 1;
			}
			return 0;
		});
		dispatch(setProducts(sortedData));
		setFlag(!flag);
	};

	const handleDefaultSort = (data) => {
		const sortedData = data.sort((first, second) => {
			var titleOfA = first.title.toUpperCase();
			var titleOfB = second.title.toUpperCase();
			if (titleOfA > titleOfB) {
				return -1;
			}
			if (titleOfA < titleOfB) {
				return 1;
			}
			return 0;
		});
		dispatch(setProducts(sortedData));
		setFlag(!flag);
	};

	const [checkedState, setCheckedState] = useState(
		new Array(state.length).fill(false)
	);
	const onFilterChange2 = (id) => {
		const updatedCheckedState = checkedState.map((item, index) =>
			index === id ? !item : item
		);
		console.log(updatedCheckedState);

		let tempArr = [...state];
		tempArr[id].checked = !tempArr[id].checked;
		setState(tempArr);

		if (tempArr[id].name === "All" && tempArr[id].checked === true) {
			const newArr = state.map((item) => item.value);
			let newArr2 = tempArr.map((item) => {
				if (item.name !== "All")
					return {
						...item,
						checked: false,
					};
				return item;
			});

			setState(newArr2);
			dispatch(filterByCategory(newArr, products));
		} else {
			const newArr = state
				.filter((item) => item.checked === true)
				.map((item) => item.value);

			let newArr2 = tempArr.map((item) => {
				if (item.name === "All")
					return {
						...item,
						checked: false,
					};
				return item;
			});
			setState(newArr2);
			dispatch(filterByCategory(newArr, products));
		}
	};

	return (
		<>
			<div className="flex float-right mr-5">
				<button
					className="mt-3 mr-2 bg-black hover:bg-white text-green-700 font-semibold hover:text-black py-2 px-4 rounded flex .content-end"
					disabled={data.length ? false : true}
					onClick={() => handleSort(data)}>
					Sort A-Z
				</button>
				<button
					className="mt-3 bg-black hover:bg-white text-green-700 font-semibold hover:text-black py-2 px-4 rounded flex .content-end"
					onClick={() => handleDefaultSort(data)}
					disabled={data.length ? false : true}>
					Sort Z-A
				</button>
			</div>
			<div className="justify-center text-cenetr justify-items-center ml-52 mt-5 h-50 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5">
				{state.map((item, index) => (
					<label
						className="inline-flex items-center m-3 cursor-pointer"
						key={index}>
						<input
							id={item._id}
							name={item.name}
							value={item.value}
							type="checkbox"
							className="form-checkbox h-4 w-4 text-gray-600 cursor-pointer mb-1"
							// checked={check.allProducts}
							onChange={() => onFilterChange2(index)}
							checked={item.checked}
						/>
						<span className="ml-2 text-white font-semibold ">{item.name}</span>
					</label>
				))}
			</div>
			<div className="container p-10 h-50 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
				{/* Cards */}
				{data &&
					data.map((item) => (
						<div
							className="max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"
							key={item._id}>
							<div className=" mt-2 h-70">
								<img
									className="p-8 rounded-t-lg max-h-60 w-3/5 block ml-auto mr-auto"
									src={item.image}
									alt={item.title}
								/>
							</div>
							<div className="px-5 pb-5 h-auto">
								<h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
									{item.title}
								</h5>
								<div className="flex items-center mt-2.5 mb-5">
									<svg
										className="w-5 h-5 text-yellow-300"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg">
										<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
									</svg>
									<svg
										className="w-5 h-5 text-yellow-300"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg">
										<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
									</svg>
									<svg
										className="w-5 h-5 text-yellow-300"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg">
										<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
									</svg>
									<svg
										className="w-5 h-5 text-yellow-300"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg">
										<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
									</svg>
									<svg
										className="w-5 h-5 text-yellow-300"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg">
										<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
									</svg>
									<span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
										5.0
									</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-3xl font-bold text-gray-900 dark:text-white">
										${item.price}
									</span>
									<button
										className=" mt-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
										onClick={() =>
											navigate(`/ProductListing/${item._id}`, {
												state: item._id,
											})
										}>
										Details
									</button>
								</div>
							</div>
						</div>
					))}
			</div>
		</>
	);
};

export default Product;
