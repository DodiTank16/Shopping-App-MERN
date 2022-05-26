import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../index.css";
import "../index";
import axiosInstance from "./AxiosConfig";
import Header from "./Header";
import Breadcrumb from "./Breadcrumb";
import Display from "../macbook.svg";

export default function HomePage() {
	const navigate = useNavigate();
	const location = useLocation();
	const token = localStorage.getItem("LoginToken");

	useEffect(() => {
		if (!token) navigate("/Login");
		document.title = "HomePage";
	}, []);

	const handleLogout = () => {
		const logOut = {
			empNo: location.state,
			token: token,
		};

		axiosInstance
			.post("/Login/LogOutLog", logOut)
			.then((res) => {
				console.clear();
				localStorage.removeItem("LoginToken");
			})
			.catch((error) => console.log("Error", error));

		navigate("/");
	};

	return (
		<>
			<Header />
			<Breadcrumb />
			<div className="h-full">
				{/* <!--Main--> */}
				<div className="container pt-24 md:pt-16 mx-auto flex flex-wrap flex-col md:flex-row items-center">
					{/* <!--Left Col--> */}
					<div className="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
						<h1 className="my-4 text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center md:text-left">
							Welcome to the
							<span className=" ml-3 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
								Shopping Application.
							</span>
						</h1>
						<p className="leading-normal text-base md:text-2xl mb-8 text-center md:text-left">
							We are here to
							<span className=" ml-1.5 mr-1.5	 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-green-400">
								SELL,
							</span>
							Are you ready to
							<span className=" ml-1.5 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
								BUY?
							</span>
						</p>

						<form className="bg-gray-900 opacity-75 w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
							<div className="mb-4">
								<label className="block text-blue-300 py-2 font-bold mb-2">
									Your Web-App Access Token:
								</label>
								<textarea
									className="shadow resize-none appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
									id="Token"
									rows={5}
									value={localStorage.getItem("LoginToken")}
									readOnly
								/>
							</div>

							<div className="flex items-center justify-between pt-4">
								<button
									className="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
									type="button"
									onClick={handleLogout}
								>
									Sign Out
								</button>
							</div>
						</form>
					</div>

					{/* <!--Right Col--> */}
					<div className="w-full xl:w-3/5 p-12 overflow-hidden">
						<img
							className="mx-auto w-full md:w-4/5 transform -rotate-6 transition hover:scale-105 duration-700 ease-in-out hover:rotate-6"
							src="https://api.daily.dev/devcards/975e902fea9b4584b1086b1db2fda485.png?r=ri8"
							alt="Not Supporten in your Device"
						/>
					</div>
				</div>
			</div>
		</>
	);
}
