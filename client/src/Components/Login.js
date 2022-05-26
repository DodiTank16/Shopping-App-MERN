import React, { useEffect, useState } from "react";
import axiosInstance from "./AxiosConfig";
import "../index.css";
import { useNavigate } from "react-router-dom";

const initialValues = {
	empNo: "",
	password: "",
};

export default function ApiFetch(props) {
	const [login, setLogin] = useState(initialValues);
	const navigate = useNavigate();

	useEffect(() => {
		document.title = "Login Page";
	}, []);

	const handleChange = (e) => {
		setLogin({
			...login,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const userData = {
			empNo: login.empNo,
			password: login.password,
		};

		axiosInstance
			.post("/Login/Login", userData)
			.then((res) => {
				localStorage.setItem("LoginToken", res.data.data.tokenData);
				if (res.data) {
					navigate("/HomePage", { state: userData.empNo });
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<>
			<div className="w-full max-w-xs mx-auto">
				<form
					className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
					onSubmit={handleSubmit}
				>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Username
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="username"
							name="empNo"
							type="text"
							placeholder="Username"
							onChange={handleChange}
						/>
					</div>
					<div className="mb-6">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Password
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							id="password"
							name="password"
							type="password"
							placeholder="******************"
							onChange={handleChange}
						/>
					</div>
					<div className="flex items-center justify-between">
						<button
							className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							type="submit"
							style={{ background: "black" }}
						>
							Sign In
						</button>
					</div>
				</form>
				<p className="text-center text-gray-300 text-xs">
					&copy;2022 Tank's Corp. All rights reserved.
				</p>
			</div>
		</>
	);
}
