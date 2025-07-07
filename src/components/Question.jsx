import React from "react";

const Question = ({
	question,
	choices,
	selectedAnswer,
	onSelect,
	disabled,
	showFeedback,
	correctAnswer,
	type = "multiple-choice",
	onTextChange,
}) => {
	const renderInput = () => {
		switch (type) {
			case "multiple-choice":
				return (
					<div className="flex flex-col gap-3">
						{choices.map((choice) => {
							const isCorrect = showFeedback && choice === correctAnswer;
							const isIncorrect =
								showFeedback &&
								choice === selectedAnswer &&
								choice !== correctAnswer;
							return (
								<label
									key={choice}
									className={`flex items-center px-4 py-3 rounded-lg cursor-pointer border transition-colors
                    ${
											isCorrect
												? "bg-green-100 border-green-400"
												: isIncorrect
												? "bg-red-100 border-red-400"
												: "bg-gray-50 border-gray-200 hover:bg-gray-100"
										}
                    ${disabled ? "opacity-70 cursor-not-allowed" : ""}`}
								>
									<input
										type="radio"
										name="choice"
										value={choice}
										checked={selectedAnswer === choice}
										onChange={() => onSelect(choice)}
										disabled={disabled}
										className="form-radio h-5 w-5 text-blue-600 mr-3"
									/>
									<span className="text-gray-900 flex-1">{choice}</span>
									{showFeedback && isCorrect && (
										<span className="ml-2 text-green-700 font-bold">✔ Correct</span>
									)}
									{showFeedback && isIncorrect && (
										<span className="ml-2 text-red-700 font-bold">✘ Incorrect</span>
									)}
								</label>
							);
						})}
					</div>
				);

			case "short-answer":
				return (
					<div className="space-y-3">
						<input
							type="text"
							value={selectedAnswer || ""}
							onChange={(e) => onTextChange(e.target.value)}
							disabled={disabled}
							placeholder="Enter your answer..."
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-70 disabled:cursor-not-allowed"
						/>
						{showFeedback && (
							<div className="mt-2 p-3 rounded-lg bg-gray-100">
								<span className="font-semibold text-gray-700">Your answer: </span>
								<span className="text-gray-900">{selectedAnswer || "No answer provided"}</span>
								{correctAnswer && (
									<>
										<br />
										<span className="font-semibold text-gray-700">Correct answer: </span>
										<span className="text-green-700">{correctAnswer}</span>
									</>
								)}
							</div>
						)}
					</div>
				);

				case "true-false":
					{ const trueFalseOptions = ["True", "False"];
				return (
					<div className="flex flex-col gap-3">
						{trueFalseOptions.map((option) => {
							const isCorrect = showFeedback && option === correctAnswer;
							const isIncorrect =
								showFeedback &&
								option === selectedAnswer &&
								option !== correctAnswer;
							return (
								<label
									key={option}
									className={`flex items-center px-4 py-3 rounded-lg cursor-pointer border transition-colors
                    ${
											isCorrect
												? "bg-green-100 border-green-400"
												: isIncorrect
												? "bg-red-100 border-red-400"
												: "bg-gray-50 border-gray-200 hover:bg-gray-100"
										}
                    ${disabled ? "opacity-70 cursor-not-allowed" : ""}`}
								>
									<input
										type="radio"
										name="trueFalse"
										value={option}
										checked={selectedAnswer === option}
										onChange={() => onSelect(option)}
										disabled={disabled}
										className="form-radio h-5 w-5 text-blue-600 mr-3"
									/>
									<span className="text-gray-900 flex-1 font-medium">{option}</span>
									{showFeedback && isCorrect && (
										<span className="ml-2 text-green-700 font-bold">✔ Correct</span>
									)}
									{showFeedback && isIncorrect && (
										<span className="ml-2 text-red-700 font-bold">✘ Incorrect</span>
									)}
								</label>
							);
						})}
					</div>
				);}

			default:
				return (
					<div className="text-gray-500 italic">
						Unsupported question type: {type}
					</div>
				);
		}
	};

	return (
		<div className="w-full bg-gray-100 rounded-lg shadow p-6 mb-6">
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-lg md:text-xl font-semibold text-gray-900 flex-1">
					{question}
				</h3>
				<span className="ml-3 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
					{type.replace("-", " ")}
				</span>
			</div>
			{renderInput()}
		</div>
	);
};

export default Question;
