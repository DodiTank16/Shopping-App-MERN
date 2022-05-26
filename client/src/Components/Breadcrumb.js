import React from "react";
import { useLocation, Link } from 'react-router-dom'

const Breadcrumb = () => {
	const location = useLocation()
	const breadCrumbView = () => {
		const { pathname } = location;
		const pathnames = pathname.split("/").filter((item) => item);
		const capatilize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

		return (

			<div>
				<nav
					className="flex py-3 px-5 text-gray-700 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
					aria-label="Breadcrumb"
				>
					{pathnames.length > 0 ? (
						<ol className="inline-flex items-center space-x-1 md:space-x-3">
							<li className="inline-flex items-center">
								<Link to="/">HomePage</Link>
							</li></ol>
					) : (
						<ol className="inline-flex items-center space-x-1 md:space-x-3">
							<li className="inline-flex items-center">HomePage</li></ol>
					)}
					{pathnames.map((name, index) => {
						const routeTo = ("/" + pathnames.slice(0, index + 1).join("/"))
						const isLast = index === pathnames.length - 1;
						return isLast ? (
							<ol className="inline-flex items-center space-x-1 md:space-x-3" key={index}> &gt;
								<li className="inline-flex items-center">{capatilize(name)}</li></ol>
						) : (
							<ol className="inline-flex items-center space-x-1 md:space-x-3" key={index}>&gt;
								<li className="inline-flex items-center">
									<Link to={routeTo}>{capatilize(name)}</Link>
								</li></ol>
						);
					})}
				</nav>
			</div>
		);
	};

	return (
		<>{breadCrumbView()}
		</>
	);
};

export default Breadcrumb;
