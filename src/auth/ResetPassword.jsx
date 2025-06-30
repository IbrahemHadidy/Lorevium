import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPasswordPopup = ({ email, closeModal }) => {
  const [formData, setFormData] = useState({
    otp: '',
    newPassword: '',
    cpassword: ''
  });

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    const errors = {};

    // OTP validation (6 digits)
    if (!formData.otp || formData.otp.length !== 6 || !/^[0-9]{6}$/.test(formData.otp)) {
      errors.otp = 'OTP must be 6 digits';
    }

    // Password validation
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (!passwordRegex.test(formData.newPassword)) {
      errors.newPassword =
        'Password must be at least 8 characters with uppercase, lowercase, number, and special character.';
    }

    if (formData.newPassword !== formData.cpassword) {
      errors.cpassword = 'Passwords do not match';
    }

    return errors;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    setError(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    try {
      const rData =  { ...formData, 'email': email }
      console.log(rData);
      const res = await axios.post(
        'https://edu-master-delta.vercel.app/user/reset-password ',
        rData 
      );

      toast.success('✅ Password changed successfully!');
      setTimeout(() => {
        closeModal(); // Close modal after success
      }, 1500);
    } catch (err) {
      const message = err.response?.data?.message || 'Something went wrong.';
      toast.error(`❌ ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-500 bg-opacity-50">
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md mx-auto transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 relative">
          {/* Modal Title */}
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Reset Password</h2>

          {/* Close Button */}
          <button
            type="button"
            onClick={closeModal}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white text-xl font-bold"
            aria-label="Close modal"
          >
            &times;
          </button>

          {/* OTP */}
          <div className="mt-4">
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              OTP
            </label>
            <input
              id="otp"
              name="otp"
              type="text"
              placeholder="000000"
              value={formData.otp}
              onChange={handleChange}
              maxLength={6}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {error.otp && <p className="mt-1 text-red-500 text-sm">{error.otp}</p>}
          </div>

          {/* New Password */}
          <div className="mt-4">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              New Password
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {error.newPassword && (
              <p className="mt-1 text-red-500 text-sm">{error.newPassword}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mt-4">
            <label htmlFor="cpassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirm Password
            </label>
            <input
              id="cpassword"
              name="cpassword"
              type="password"
              placeholder="Confirm Password"
              value={formData.cpassword}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {error.cpassword && (
              <p className="mt-1 text-red-500 text-sm">{error.cpassword}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full mt-6 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Changing...' : 'Change Password'}
          </button>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default ResetPasswordPopup;