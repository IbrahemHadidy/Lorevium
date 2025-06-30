import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setToken, setUserInfo } from '../redux/authSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResetPassword from './ResetPassword';

const LoginForm = ({ close, switchMode }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  // Forgot Password State
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotError, setForgotError] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setError('');
    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      toast.error('Email and password are required');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('https://edu-master-delta.vercel.app/auth/login', formData);
      const token = res.data.token;
      dispatch(setToken(token));

      const profileRes = await axios.get('https://edu-master-delta.vercel.app/user/ ', {
        headers: { token },
      });
       
      dispatch(setUserInfo(profileRes.data.data));
      toast.success("Logged in successfully!");
      close();
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordSubmit = async () => {
    setForgotError('');
    if (!forgotEmail) {
      setForgotError('Please enter your email address.');
      return;
    }

    setForgotLoading(true);
    try {
      await axios.post('https://edu-master-delta.vercel.app/user/forgot-password', { email: forgotEmail });
      toast.success('Password reset link sent to your email!');
      setShowForgotPassword(false);

      setShowResetPassword(true);
      setForgotLoading(false);
    } catch (err) {
      const message = err.response?.data?.message || 'Something went wrong.';
      setForgotError(message);
      toast.error(message);
      
    }
  };

  return (
    <>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        {/* Password Input */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition flex items-center justify-center ${
            loading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {loading && (
            <div className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Logging in...</span>
            </div>
          )}
          {!loading && <span>Log In</span>}
        </button>

        {/* Forgot Password Link */}
        <div className="flex justify-between text-sm">
          <button
            type="button"
            onClick={() => setShowForgotPassword(true)}
            className="text-blue-600 hover:underline"
          >
            Forgot Password?
          </button>

          {/* Sign Up Link */}
          <button
            type="button"
            onClick={switchMode}
            className="text-blue-600 hover:underline"
          >
            Sign Up
          </button>
        </div>
      </form>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-500 bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md mx-auto p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Reset Password</h2>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
              Enter your email to receive a password reset link.
            </p>

            <input
              type="email"
              placeholder="Your Email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              className="w-full px-4 py-2 mb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />

            {forgotError && <p className="mt-1 text-red-500 text-sm">{forgotError}</p>}

            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowForgotPassword(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleForgotPasswordSubmit}
                disabled={forgotLoading}
                className={`px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition ${
                  forgotLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {forgotLoading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showResetPassword && <ResetPassword email={forgotEmail} closeModal={() => setShowResetPassword(false)} />}
    </>
  );
};

export default LoginForm;