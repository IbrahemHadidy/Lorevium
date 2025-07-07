import React from "react";
import Loading from "./Loading";

const ResultSection = ({ exam, answers, score }) => {
  if (!answers || answers.length !== exam.questions.length) {
    return <Loading text="Calculating ..." />;
  }

  // Total possible points
  const totalPoints = exam.questions.reduce(
    (sum, q) => sum + (q.points || 1),
    0
  );

  // Count correct answers
  const correctCount = exam.questions.reduce(
    (count, q, idx) => count + (answers[idx] === q.correctAnswer ? 1 : 0),
    0
  );

  const incorrectCount = exam.questions.length - correctCount;

  // Earned points
  const earnedPoints = exam.questions.reduce(
    (sum, q, idx) =>
      sum + (answers[idx] === q.correctAnswer ? q.points || 1 : 0),
    0
  );

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow p-8 mt-8">
      {/* Score */}
      <h2 className="text-2xl font-bold text-center text-green-700 mb-2">
        Your Score: {score}
      </h2>

      {/* Earned points */}
      <div className="text-center text-lg text-gray-700 mb-2">
        Points: <span className="font-bold text-blue-700">{earnedPoints}</span> / {totalPoints}
      </div>

      {/* Correct / Incorrect count */}
      <div className="flex justify-center gap-6 text-md mb-6">
        <span className="text-green-600 font-semibold">✅ Correct: {correctCount}</span>
        <span className="text-red-600 font-semibold">❌ Incorrect: {incorrectCount}</span>
      </div>

      {/* Questions with result badges */}
      <div className="space-y-6">
        {exam.questions.map((q, idx) => {
          const userAnswer = answers[idx];
          const isCorrect = userAnswer === q.correctAnswer;

          return (
            <div
              key={q._id}
              className="p-4 rounded border flex flex-col md:flex-row md:items-center gap-4 border-gray-200 bg-gray-50"
            >
              <div className="flex-1">
                {/* Question text with correct/incorrect badge */}
                <div className="font-semibold text-gray-900 flex items-center gap-2">
                  {q.text}

                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      isCorrect
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {isCorrect ? "Correct" : "Incorrect"}
                  </span>

                  {typeof q.points === "number" && (
                    <span className="ml-2 text-xs text-gray-500">
                      ({q.points} pt{q.points > 1 ? "s" : ""})
                    </span>
                  )}
                </div>

                {/* Options with answer status */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {q.options.map((choice) => (
                    <span
                      key={choice}
                      className={`px-3 py-1 rounded-full text-sm ${
                        choice === q.correctAnswer
                          ? "bg-green-200 text-green-800"
                          : userAnswer === choice && !isCorrect
                          ? "bg-red-200 text-red-800"
                          : "bg-gray-200 text-gray-700"
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
            </div>
          );
        })}
      </div>

      {/* Final notice */}
      <div className="mt-8 text-center">
        <span className="inline-block px-6 py-3 bg-gray-300 text-gray-700 rounded-lg font-bold text-lg">
          The exam has been submitted. You cannot re-enter.
        </span>
      </div>
    </div>
  );
};

export default ResultSection;
