import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setUserInfo } from '../redux/authSlice';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';

// Validation functions
const validateProfileForm = (data) => {
  const errors = {};

  if (!data.fullName.trim()) {
    errors.fullName = 'Full name is required';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email.trim() || !emailRegex.test(data.email)) {
    errors.email = 'Valid email is required';
  }

  const phoneRegex = /^01[0-9]{9}$/;
  if (!data.phoneNumber.trim() || !phoneRegex.test(data.phoneNumber)) {
    errors.phoneNumber = 'Phone number must start with 01 and be 11 digits';
  }

  const validClassLevels = ['Grade 1 Secondary', 'Grade 2 Secondary', 'Grade 3 Secondary'];
  if (!validClassLevels.includes(data.classLevel)) {
    errors.classLevel = 'Please select a valid class level';
  }

  return errors;
};

const validatePasswordChange = (passwordData) => {
  const errors = {};

  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  if (!passwordRegex.test(passwordData.newPassword)) {
    errors.newPassword =
      'Password must be at least 8 characters with uppercase, lowercase, number, and special character.';
  }

  if (passwordData.newPassword !== passwordData.cpassword) {
    errors.cpassword = 'Passwords do not match';
  }

  return errors;
};

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  // Form States
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    classLevel: user?.classLevel || ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [editLoading, setEditLoading] = useState(false);

  // Password Change State
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    cpassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Delete Account State
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const toggleEditMode = () => {
    if (isEditing) {
      // If currently editing, reset form
      setFormData({
        fullName: user?.fullName || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || '',
        classLevel: user?.classLevel || ''
      });
      setErrors({});
    }
    setIsEditing(!isEditing);
  };

  const handleUpdateProfile = async () => {
    const validationErrors = validateProfileForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setEditLoading(true);
    try {
        const response = await axios.put(
        `https://edu-master-delta.vercel.app/user/${user._id}`,
        formData,  
        {
            headers: {
            token: token
            }
        }
        );

        toast.success('✅ Profile updated successfully!');
        console.log('User updated:', response.data);
        dispatch(setUserInfo(response.data.data)); 
    } catch (error) {
        toast.error('❌ Failed to update profile');
        console.error('Error updating user:', error.response?.data || error.message);
    } finally {
      setEditLoading(false);
    }
  };

  const handleChangePassword = async () => {
    const validationErrors = validatePasswordChange(passwordData);
    setPasswordErrors(validationErrors);

    if (!passwordData.currentPassword) {
      toast.warn('⚠️ Current password is required');
      return;
    }

    if (Object.keys(validationErrors).length > 0) {
      Object.entries(validationErrors).forEach(([field, message]) => {
        toast.error(`❌ ${message}`);
      });
      return;
    }

    setPasswordLoading(true);
    try {
        const response = await axios.patch(
        'https://edu-master-delta.vercel.app/user/update-password ',
        {
            oldPassword: passwordData.currentPassword, 
            newPassword: passwordData.newPassword,
            cpassword : passwordData.cpassword
        },
        {
            headers: {
                token 
            }
        }
        );
       
        toast.success('✅ Password changed successfully!');
        setPasswordData({ oldPassword: '', newPassword: '', cpassword: '' });
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to change password';
        toast.error(`❌ ${message}`);
    } finally {
        setPasswordLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    setDeleteLoading(true);
    try {
      await axios.delete('https://edu-master-delta.vercel.app/user/', {
        headers: { token }
      });
      toast.success('🗑️ Account deleted successfully!');
      dispatch(logout())
      navigate('/'); // Redirect to home page after deletion
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to delete account';
      toast.error(`❌ ${message}`);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Your Profile</h2>

      {/* View Mode */}
      {!isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
            <p className="mt-1 text-gray-900 dark:text-gray-100">{user?.fullName}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <p className="mt-1 text-gray-900 dark:text-gray-100">{user?.email}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
            <p className="mt-1 text-gray-900 dark:text-gray-100">{user?.phoneNumber}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Class Level</label>
            <p className="mt-1 text-gray-900 dark:text-gray-100">{user?.classLevel}</p>
          </div>

          <button
            onClick={toggleEditMode}
            className="px-4 py-2 mt-4 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        /* Edit Mode */
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.fullName && <p className="mt-1 text-red-500 text-sm">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.phoneNumber && <p className="mt-1 text-red-500 text-sm">{errors.phoneNumber}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Class Level</label>
            <select
              name="classLevel"
              value={formData.classLevel}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">Select Class Level</option>
              <option value="Grade 1 Secondary">Grade 1 Secondary</option>
              <option value="Grade 2 Secondary">Grade 2 Secondary</option>
              <option value="Grade 3 Secondary">Grade 3 Secondary</option>
            </select>
            {errors.classLevel && <p className="mt-1 text-red-500 text-sm">{errors.classLevel}</p>}
          </div>

          <div className="flex space-x-2">
            <button
              onClick={handleUpdateProfile}
              disabled={editLoading}
              className={`px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-md transition ${
                editLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {editLoading ? 'Saving...' : 'Save Changes'}
            </button>

            <button
              onClick={toggleEditMode}
              type="button"
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <hr className="my-6 border-gray-300 dark:border-gray-600" />

      {/* Change Password Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Change Password</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={passwordData.currentPassword || ''}
            onChange={handlePasswordChange}
            disabled={passwordLoading}
            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            disabled={passwordLoading}
            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          {passwordErrors.newPassword && (
            <p className="mt-1 text-red-500 text-sm">{passwordErrors.newPassword}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm New Password</label>
          <input
            type="password"
            name="cpassword"
            value={passwordData.cpassword}
            onChange={handlePasswordChange}
            disabled={passwordLoading}
            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          {passwordErrors.cpassword && (
            <p className="mt-1 text-red-500 text-sm">{passwordErrors.cpassword}</p>
          )}
        </div>

        <button
          onClick={handleChangePassword}
          disabled={passwordLoading}
          className={`px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-md transition ${
            passwordLoading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {passwordLoading ? 'Changing...' : 'Change Password'}
        </button>
      </div>

      <hr className="my-6 border-gray-300 dark:border-gray-600" />

      {/* Delete Account Section */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Danger Zone</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">Permanently delete your account</p>
        <button
          onClick={handleDeleteAccount}
          disabled={deleteLoading}
          className={`px-4 py-2 mt-2 text-white bg-red-600 hover:bg-red-700 rounded-md transition ${
            deleteLoading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {deleteLoading ? 'Deleting...' : 'Delete Account'}
        </button>
      </div>
    </div>
  );
};

export default Profile;