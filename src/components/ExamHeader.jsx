import React from "react";

const ExamHeader = ({ title, duration, timeLeft, isSubmitted }) => {
	return (
		<div className="flex flex-col md:flex-row items-center justify-between px-4 py-4">
			<div className="flex flex-col md:flex-row items-center gap-2">
				<h2 className="text-lg font-semibold text-whie ">
					{title}
				</h2>
				<span className="text-xs text-gray-950 ml-2">
					Duration: {duration} min
				</span>
			</div>
			<div className="flex items-center gap-2 mt-2 md:mt-0">
				<span className="text-base font-mono px-2 py-0 rounded bg-gray-300 text-black">
					{timeLeft}
				</span>
				{isSubmitted && (
					<span className="ml-2 px-2 py-0 bg-green-100 text-green-800 rounded text-xs">
						Submitted
					</span>
				)}
			</div>
		</div>
	);
};

export default ExamHeader;
