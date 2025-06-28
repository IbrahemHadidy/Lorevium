import React from "react";
import { Link } from "react-router-dom";
import notFound from "../../assets/not-found.svg";
const NotFound = () => {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center text-center p-4 bg-gray-100 ">
			<h1 className="text-6xl font-bold text-red-600 mb-4 sr-only">404</h1>
			<div className="w-full max-w-xl">
				<img src={notFound} alt="Not Found" className="w-full mx-auto" />
				<p className="text-xl mb-4 whitespace-break-spaces text-start">
					We were not able to find the page you're looking for. Try{" "}
					<Link to="/lessons" className="text-[#4a90e2]">
						{" "}
						browsing our lesson catalog
					</Link>{" "}
					or go back to the{" "}
					<Link to="/" className="text-[#4a90e2] underline ">
						Home
					</Link>
					.
				</p>
			</div>
		</div>
	);
};

export default NotFound;
