import React, { useEffect, useState, useRef } from "react";
import ExamHeader from "../components/ExamHeader";
import Question from "../components/Question";
import ResultSection from "../components/ResultSection";
import Loading from "@/components/Loading";
import useGetExamDetails from "@/hooks/useGetExamDetails";

// Exam ID for testing purposes
const id = "671a785c3fa556fe79e8abc9";

// Helper function to format seconds into MM:SS
const formatTime = (seconds) => {
	const m = Math.floor(seconds / 60).toString().padStart(2, "0");
	const s = (seconds % 60).toString().padStart(2, "0");
	return `${m}:${s}`;
};

const StudentExam = () => {
	// States
	const [currentQuestion, setCurrentQuestion] = useState(0); // index of the current question
	const [answers, setAnswers] = useState([]); // student's answers
	const [isSubmitted, setIsSubmitted] = useState(false); // if the exam was submitted
	const [score, setScore] = useState(0); // final score
	const [timeLeft, setTimeLeft] = useState(0); // countdown timer (in seconds)
	const [isLoading, setIsLoading] = useState(true); // loading state
	const timerRef = useRef(); // reference to timeout for cleanup

	// Custom hook to get exam details and submit answers
	//TODO: Replace id with actually examId  
	const { examData, submitAnswers, user } = useGetExamDetails(id);

	// Initialize exam data when it's loaded
	useEffect(() => {
		if (!examData || !examData.questions) return;

		const initExam = () => {
			setAnswers(Array(examData.questions.length).fill(null)); // create empty answers array
			setScore(0); // reset score
			setTimeLeft(examData.duration * 60); // set timer in seconds
			setIsLoading(false); // stop loading
		};

		initExam();
	}, [examData]);

	// Countdown logic
	useEffect(() => {
		if (isSubmitted || isLoading) return;

		if (timeLeft <= 0) {
			handleSubmit(); // auto-submit if time is up
			return;
		}

		timerRef.current = setTimeout(() => setTimeLeft((t) => t - 1), 1000);

		return () => clearTimeout(timerRef.current); // cleanup
	}, [timeLeft, isSubmitted, isLoading]);

	// Handle selection for multiple choice
	const handleSelect = (choice) => {
		if (isSubmitted) return;
		setAnswers((prev) => {
			const updated = [...prev];
			updated[currentQuestion] = choice;
			return updated;
		});
	};

	// Handle text input for open questions
	const handleTextChange = (text) => {
		if (isSubmitted) return;
		setAnswers((prev) => {
			const updated = [...prev];
			updated[currentQuestion] = text;
			return updated;
		});
	};

	// Navigate to previous question
	const handlePrev = () => {
		setCurrentQuestion((q) => Math.max(0, q - 1));
	};

	// Navigate to next question
	const handleNext = () => {
		setCurrentQuestion((q) =>
			Math.min(examData.questions.length - 1, q + 1)
		);
	};

	// Submit exam
	const handleSubmit = () => {
		if (isSubmitted) return;

		let newScore = 0;

		// Calculate score based on correct answers
		examData.questions.forEach((q, idx) => {
			if (q.type === "text") {
				if (
					answers[idx]?.trim().toLowerCase() ===
					q.correctAnswer?.trim().toLowerCase()
				) {
					newScore++;
				}
			} else {
				if (answers[idx] === q.correctAnswer) {
					newScore++;
				}
			}
		});

		// Format answers to send to backend
		const formattedAnswers = examData.questions.map((question, index) => ({
			questionId: question._id,
			selectedAnswer: answers[index],
		}));

		// Submit answers and update state
		submitAnswers(formattedAnswers);
		setScore(newScore);
		setIsSubmitted(true);
	};

	// Show loading spinner
	if (isLoading) {
		return <Loading />;
	}

	// Show result after submission
	if (isSubmitted) {
		return (
			<div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
				<div className="w-full max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-0 md:p-0 mt-8 mb-8">
					<ExamHeader
						title={examData.title}
						duration={examData.duration}
						timeLeft={formatTime(0)}
						isSubmitted={true}
					/>
					<ResultSection
						exam={examData}
						answers={answers}
						score={score}
					/>
				</div>
			</div>
		);
	}

	// Render exam UI
	return (
		<div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
			{/* Exam Header */}
			<header className="w-full lg:w-xl bg-white border-b border-gray-200 shadow-sm py-4 px-6 flex items-center justify-between">
				<div className="flex flex-col">
					<span className="text-lg font-bold text-blue-700">Exam</span>
					<span className="text-sm text-gray-950">{examData.title}</span>
					<span className="text-xs text-gray-500">Student: {user?.fullName}</span>
					<span className="text-xs text-gray-600 mt-1">{examData.description}</span>
				</div>
				<div className="flex flex-col items-end">
					<span className="text-xs text-gray-600">Duration: {examData.duration} min</span>
					<span className="text-xs text-gray-600">Class: {examData.classLevel}</span>
				</div>
			</header>

			{/* Main Card */}
			<div className="w-full max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-0 md:p-0 mt-8 mb-8 flex flex-col">
				{/* Progress Bar */}
				<div className="w-full h-2 bg-gray-200 rounded-t-2xl overflow-hidden">
					<div
						className="h-full bg-blue-600 transition-all duration-300"
						style={{
							width: `${((currentQuestion + 1) / examData.questions.length) * 100}%`,
						}}
					></div>
				</div>

				{/* Timer + Question Counter */}
				<div className="flex flex-col md:flex-row items-center justify-between px-6 py-4 border-b border-gray-100">
					<div className="flex items-center gap-2">
						<span className="text-sm text-gray-950">Time left:</span>
						<span className="font-mono text-lg text-blue-700">
							{formatTime(timeLeft)}
						</span>
					</div>
					<div className="text-sm text-gray-950">
						Question {currentQuestion + 1} of {examData.questions.length}
					</div>
				</div>

				{/* Current Question */}
				<div className="px-6 py-8 flex-1 flex flex-col justify-center">
					<Question
						question={examData.questions[currentQuestion].text}
						choices={examData.questions[currentQuestion].options}
						selectedAnswer={answers[currentQuestion]}
						onSelect={handleSelect}
						onTextChange={handleTextChange}
						disabled={isSubmitted}
						showFeedback={isSubmitted}
						correctAnswer={examData.questions[currentQuestion].correctAnswer}
						type={examData.questions[currentQuestion].type}
					/>
				</div>

				{/* Navigation Buttons */}
				<div className="flex justify-between items-center px-6 pb-6">
					<button
						onClick={handlePrev}
						disabled={currentQuestion === 0}
						className="px-6 py-2 rounded-full bg-gray-100 text-gray-700 font-semibold border border-gray-200 hover:bg-gray-200 transition disabled:opacity-50 cursor-pointer"
					>
						Previous
					</button>

					<button
						onClick={handleNext}
						disabled={currentQuestion === examData.questions.length - 1}
						className="px-6 py-2 rounded-full bg-gray-100 text-gray-700 font-semibold border border-gray-200 hover:bg-gray-200 transition disabled:opacity-50 cursor-pointer"
					>
						Next
					</button>

					<button
						onClick={handleSubmit}
						disabled={isSubmitted || answers.some((a) => a === null)}
						className="px-8 py-2 rounded-full bg-blue-600 text-white font-bold border border-blue-600 hover:bg-blue-700 hover:border-blue-700 transition disabled:opacity-50 cursor-pointer"
					>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
};

export default StudentExam;
