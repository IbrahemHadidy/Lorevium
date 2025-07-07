import * as React from "react";

const Loading = ({text = "Getting Ready..."}) => {
	return (
		<>
			<div className="flex flex-col items-center justify-center h-screen border border-amber-400">
				<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
				<p className="text-gray-700 mt-4">{text}</p>
			</div>
		</>
	);
};

export default Loading;
