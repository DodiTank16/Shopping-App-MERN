import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../index.css"
import { searchProduct, setProducts } from "../Redux/actions/productActions";

function Header() {
	const products = useSelector((state) => state.allProducts.products);
	const [isOpen, setIsOpen] = useState(false);
	const location = useLocation();
	const dispatch = useDispatch();
	const [showSearch, setShowSearch] = useState();
	const [searchedValue, setSearchedValue] = useState("")
	const cartProducts = useSelector((state) => state.handleCart);
	// const ref = useRef;


	const handleLogout = () => {
		localStorage.removeItem("LoginToken");
	};

	useEffect(() => {
		location.pathname === "/ProductListing"
			? setShowSearch(true)
			: setShowSearch(false);
	}, [location.pathname]);

	useEffect(() => {
		searchedValue === "" && dispatch(setProducts(products));
	}, [searchedValue]);


	const handleSearch = (e) => {
		e.preventDefault();
		dispatch(searchProduct(products, searchedValue));
	}

	return (
		<div>
			<nav className="bg-gray-800">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-3">
					<div className="flex items-center justify-between h-16">
						<div className="flex items-center">
							<div className="flex-shrink-0">
								<Link
									className="flex items-center text-green-400 no-underline hover:underline font-bold text-2xl lg:text-4xl"
									to="/"
								>
									Tank's
									<span className="bg-clip-text ml-2 text-transparent bg-gradient-to-r hover:underline from-green-400 via-pink-500 to-purple-500">
										Corporation
									</span>
								</Link>
							</div>
							<div className="hidden md:block">
								<div className="ml-10 flex items-baseline space-x-4">
									<Link
										to={"/ProductListing"}
										className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
									>
										Products
									</Link>

									<Link
										to={"/AboutUs"}
										className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
									>
										About Us
									</Link>

									<Link
										to={"/ContactUs"}
										className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
									>
										Contact Us
									</Link>

									<Link
										to={"/"}
										onClick={handleLogout}
										className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
									>
										Logout
									</Link>
									<Link
										to="/Cart"
										className="cart position-relative d-inline-flex"
										aria-label="View your shopping cart"
									>
										<i className="fas fa fa-shopping-cart fa-lg"></i>
										<span className="cart-basket d-flex align-items-center justify-content-center">
											{cartProducts.length}
										</span>
									</Link>
									{showSearch && <div className="flex justify-center ml-5">
										<div className="w-70">
											<div className="input-group relative flex flex-wrap items-stretch w-full ">
												<input className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
													type="search"
													placeholder="Search..."
													aria-label="Search"
													aria-describedby="button-addon2"
													onChange={(e) => {
														e.preventDefault();
														setSearchedValue(e.target.value);
														dispatch(searchProduct(products, searchedValue))
														// console.log(searchedValue);
													}}
												/>
												<button className="btn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
													type="button"
													id="button-addon2"
													onClick={handleSearch}
												>
													<svg aria-hidden="true"
														focusable="false"
														data-prefix="fas"
														data-icon="search"
														className="w-4"
														role="img"
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 512 512">
														<path fill="currentColor"
															d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
													</svg>
												</button>
											</div>
										</div>
									</div>}
								</div>
							</div>
						</div>
						<div className="mr-2 flex md:hidden">
							<button
								onClick={() => setIsOpen(!isOpen)}
								type="button"
								className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
								aria-controls="mobile-menu"
								aria-expanded="false"
							>
								<span className="sr-only">Open main menu</span>
								{!isOpen ? (
									<svg
										className="block h-6 w-6"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M4 6h16M4 12h16M4 18h16"
										/>
									</svg>
								) : (
									<svg
										className="block h-6 w-6"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								)}
							</button>
						</div>
					</div>
				</div>

				<Transition
					show={isOpen}
					enter="transition ease-out duration-100 transform"
					enterFrom="opacity-0 scale-95"
					enterTo="opacity-100 scale-100"
					leave="transition ease-in duration-75 transform"
					leaveFrom="opacity-100 scale-100"
					leaveTo="opacity-0 scale-95"
				>
					{(ref) => (
						<div className="md:hidden" id="mobile-menu">
							<div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
								<Link
									className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
									to={"/ProductListing"}
								>
									Products
								</Link>

								<Link
									to={"/AboutUs"}
									className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
								>
									About Us
								</Link>

								<Link
									to={"/ContactUs"}
									className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
								>
									Contact Us
								</Link>

								<Link
									className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
									to={"/Cart"}
									onClick={handleLogout}
								>
									Cart({cartProducts.length})
								</Link>


								<Link
									className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
									to={"/"}
									onClick={handleLogout}
								>
									Logout
								</Link>

							</div>
						</div>
					)}
				</Transition>
			</nav>
		</div>
	);
}

export default Header;
