import React from "react";

const ResultSection = ({ exam, answers, score }) => {
  // Calculate total possible points (default to 1 if not defined)
  const totalPoints = exam.questions.reduce(
    (sum, q) => sum + (q.points || 1),
    0
  );

  // Calculate the total points earned based on correct answers
  const earnedPoints = exam.questions.reduce(
    (sum, q, idx) =>
      sum + (answers[idx] === q.correctAnswer ? q.points || 1 : 0),
    0
  );

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow p-8 mt-8">
      {/* Display score in terms of number of correct questions */}
      <h2 className="text-2xl font-bold text-center text-green-700 mb-2">
        Your Score: {score} / {exam.questions.length}
      </h2>

      {/* Display earned points versus total points */}
      <div className="text-center text-lg text-gray-700 mb-6">
        Points: <span className="font-bold text-blue-700">{earnedPoints}</span> / {totalPoints}
      </div>

      {/* Loop through each question to show answer status */}
      <div className="space-y-6">
        {exam.questions.map((q, idx) => {
          const userAnswer = answers[idx];
          const isCorrect = userAnswer === q.correctAnswer;

          return (
            <div
              key={q._id}
              className="p-4 rounded border flex flex-col md:flex-row md:items-center gap-4 border-gray-200 bg-gray-50"
            >
              {/* Question text and point value */}
              <div className="flex-1">
                <div className="font-semibold text-gray-900">
                  {q.text}
                  {typeof q.points === "number" && (
                    <span className="ml-2 text-xs text-gray-500">
                      ({q.points} pt{q.points > 1 ? "s" : ""})
                    </span>
                  )}
                </div>

                {/* Display answer choices with colored badges */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {q.options.map((choice) => (
                    <span
                      key={choice}
                      className={`px-3 py-1 rounded-full text-sm ${
                        choice === q.correctAnswer
                          ? "bg-green-200 text-green-800" // Correct answer
                          : userAnswer === choice && !isCorrect
                          ? "bg-red-200 text-red-800" // Incorrect selected answer
                          : "bg-gray-200 text-gray-700" // Neutral option
                      }`}
                    >
                      {choice}
                      {choice === q.correctAnswer && (
                        <span className="ml-1">✔</span>
                      )}
                      {userAnswer === choice && choice !== q.correctAnswer && (
                        <span className="ml-1">✘</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>

              {/* Correct/Incorrect badge */}
              <div className="md:w-32 text-center">
                {isCorrect ? (
                  <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full font-bold">
                    Correct
                  </span>
                ) : (
                  <span className="inline-block px-4 py-2 bg-red-100 text-red-700 rounded-full font-bold">
                    Incorrect
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Final note indicating the exam is closed */}
      <div className="mt-8 text-center">
        <span className="inline-block px-6 py-3 bg-gray-300 text-gray-700 rounded-lg font-bold text-lg">
          The exam has been submitted. You cannot re-enter.
        </span>
      </div>
    </div>
  );
};

export default ResultSection;
