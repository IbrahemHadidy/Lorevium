import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import AuthPopup from "@/auth/AuthPopup";

const API_URL = "https://edu-master-delta.vercel.app/lesson";

const AllLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { token, user } = useSelector((state) => state.auth);
  const isAdmin = user?.role === "admin";
  const navigate = useNavigate();

  const fetchLessons = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL, {
        headers: { token },
        params: isAdmin
          ? {}
          : {
              isPaid: true,
              sortBy: "scheduledDate",
              sortOrder: "asc",
              scheduledAfter: "2025-07-01",
              classLevel: user?.classLevel,
            },
      });
      setLessons(res.data.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError("Failed to load lessons");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && user) fetchLessons();
  }, [token, user]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { token },
      });
      toast.success("Lesson deleted successfully");
      fetchLessons();
    } catch (err) {
      toast.error("Failed to delete lesson");
    }
  };

  const handleEdit = (lesson) => {
    navigate("/add-lesson", { state: { lesson } });
  };

  const handleLessonClick = (lessonId) => {
    navigate(`/lesson/${lessonId}`);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950">
        <div className="text-center space-y-4">
          <p className="text-xl text-gray-800 dark:text-gray-200">
            Please log in first to view lessons
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950">
        <p className="text-xl text-gray-800 dark:text-gray-200 animate-pulse">
          Loading lessons...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-950 font-sans text-gray-900 dark:text-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-2">
              {isAdmin ? "Manage Lessons" : "All Available Lessons"}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {isAdmin
                ? "You can edit or delete lessons here"
                : "Start your learning journey now"}
            </p>
          </div>
          {isAdmin && (
            <Link
              to="/add-lesson"
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Add Lesson
            </Link>
          )}
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {lessons.map((lesson) => (
            <div
              key={lesson._id}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group"
            >
              <div className="relative">
                <img
                  src={`https://placehold.co/600x400/0056d2/ffffff?text=${encodeURIComponent(
                    lesson.title
                  )}&font=cairo`}
                  alt={`Lesson cover: ${lesson.title}`}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight h-14">
                  {lesson.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow text-sm">
                  {lesson.description}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  Date: {lesson.scheduledDate?.slice(0, 10)}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Price: {lesson.price || "Free"} EGP
                </p>

                <div className="mt-auto space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                  {isAdmin ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(lesson)}
                        className="flex-1 bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(lesson._id)}
                        className="flex-1 bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleLessonClick(lesson._id)}
                      className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                    >
                      View Lesson
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllLessons;
