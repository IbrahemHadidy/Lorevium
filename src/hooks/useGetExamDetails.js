import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// Base URL for API
const BASE_API = "https://edu-master-delta.vercel.app";

// Custom hook to fetch exam details and handle answer submission
const useGetExamDetails = (id) => {
  const [examData, setExamData] = useState(null); // Store exam and questions
  const [remainingTime, setRemainingTime] = useState(null);
  const [errorMessage, setErrorMessage] = useState("")
  const { token, user } = useSelector((state) => state.auth); // Get token and user from Redux
  const navigate = useNavigate();

  useEffect(() => {
    const headers = {
      headers: {
        token, // Send token in headers for authorization
      },
    };
    // Fetch full question data based on question IDs
    const fetchQuestions = async (questionIds) => {
      try {
        // Send parallel GET requests to fetch all questions
        const questionRequests = questionIds.map((id) =>
          axios.get(`${BASE_API}/question/get/${id}`, headers)
        );

        // Wait for all responses
        const responses = await Promise.all(questionRequests);

        // Extract actual question objects from response
        const questions = responses.map((res) => res.data.data);

        return questions;
      } catch (error) {
        console.error("Error fetching questions:", error);
        return []; // return empty array if something fails
      }
    };

    // Start the exam and get the exam object with question IDs
    const startExam = async () => {
      if (!token) return; // Don’t proceed if token is missing

      try {
        const res = await axios.post(
          `${BASE_API}/studentExam/start/${id}`,
          {},
          headers
        );

        const exam = res.data.data.exam; // Extract exam info (with question IDs only)

        // Fetch full question objects using the IDs
        const questions = await fetchQuestions(exam.questions);

        // Set final exam data (exam info + full questions)
        setExamData({
          ...exam,
          questions,
        });
        // Fetch remaining time
        const timeRes = await axios.get(`${BASE_API}/studentExam/exams/remaining-time/${id}`, headers);
        const timeData = timeRes.data.data.remainingTime;
        const totalSeconds = (Number(timeData.minutes) * 60) + Number(timeData.seconds);
        setRemainingTime(totalSeconds);

      } catch (error) {
        console.log("Error starting exam:", error.response.data.message);
        setErrorMessage(error.response.data.message)
          setTimeout(() => {
            navigate("/exams")
          }, 100)
      }

    };

    startExam(); // Trigger on mount

  }, [id, token, navigate]);

  // Submit student's answers to backend
  const submitAnswers = async (answers) => {
    try {
      const response = await axios.post(
        `${BASE_API}/studentExam/submit/${id}`,
        { answers },
        {
          headers: {
            token,
          },
        }
      );
      console.log("Submitted answers:", response.data);
    } catch (error) {
      console.log("Error submitting answers:", error);
    }
  };

  // Return all relevant data and functions to be used in component
  return { examData, submitAnswers, user, remainingTime,  errorMessage };
};

export default useGetExamDetails;
