// AddLessonForm.jsx (No longer fetches lesson by ID)
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddLessonForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);
  const editingLesson = location.state?.lesson;
  const isEditing = Boolean(editingLesson);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    video: "",
    scheduledDate: "",
    price: "",
    classLevel: "",
  });

  useEffect(() => {
    if (isEditing) {
      setFormData({
        ...editingLesson,
        scheduledDate: editingLesson.scheduledDate?.slice(0, 10) || "",
      });
    } else {
      setFormData((prev) => ({ ...prev, classLevel: user?.classLevel || "" }));
    }
  }, [isEditing, editingLesson, user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const {
          _id,
          isPaid,
          createdBy,
          createdAt,
          updatedAt,
          __v,
          scheduledDate,
          ...updateData
        } = formData;

        await axios.put(
          `https://edu-master-delta.vercel.app/lesson/${editingLesson._id}`,
          updateData,
          {
            headers: { token },
          }
        );
        toast.success("Lesson updated successfully");
      } else {
        await axios.post(
          "https://edu-master-delta.vercel.app/lesson",
          formData,
          {
            headers: { token },
          }
        );
        toast.success("Lesson added successfully");
      }
      navigate("/lessons");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "An error occurred while saving"
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        {isEditing ? "Edit Lesson" : "Add New Lesson"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Lesson title"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Lesson description"
          className="w-full p-2 border rounded"
        />
        <input
          type="url"
          name="video"
          value={formData.video}
          onChange={handleChange}
          placeholder="Video link"
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          name="scheduledDate"
          value={formData.scheduledDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required={!isEditing}
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Lesson price"
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="classLevel"
          value={formData.classLevel}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select class level</option>
          <option value="Grade 1 Secondary">Grade 10 (First Secondary)</option>
          <option value="Grade 2 Secondary">Grade 11 (Second Secondary)</option>
          <option value="Grade 3 Secondary">Grade 12 (Third Secondary)</option>
        </select>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {isEditing ? "Update Lesson" : "Save Lesson"}
        </button>
      </form>
    </div>
  );
};

export default AddLessonForm;
