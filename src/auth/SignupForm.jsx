import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setToken, setUserInfo } from '../redux/authSlice';
import { toast } from 'sonner';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

// Validation function
const validateSignup = (data) => {
  const errors = {};
  if (!data.fullName) errors.fullName = 'Full name is required';
  if (!data.email.includes('@')) errors.email = 'Invalid email';
  // Password validation
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  if (!passwordRegex.test(data.password)) {
    errors.password = 'Password must have at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character';
  }
  if (data.password !== data.cpassword) errors.cpassword = 'Passwords do not match';
  if (!/^01[0-9]{9}$/.test(data.phoneNumber)) errors.phoneNumber = 'Invalid phone number';
  if (!data.classLevel) errors.classLevel = 'Class level is required';
  return errors;
};

// Form fields config
const fields = [
  { name: 'fullName', placeholder: 'Full Name', type: 'text' },
  { name: 'email', placeholder: 'Email', type: 'email' },
  { name: 'password', placeholder: 'Password', type: 'password' },
  { name: 'cpassword', placeholder: 'Confirm Password', type: 'password' },
  { name: 'phoneNumber', placeholder: 'Phone Number', type: 'text' },
];

const classOptions = [
  { value: '', label: 'Select your class' },
  { value: 'Grade 1 Secondary', label: 'Grade 1 Secondary' },
  { value: 'Grade 2 Secondary', label: 'Grade 2 Secondary' },
  { value: 'Grade 3 Secondary', label: 'Grade 3 Secondary' },
];

const SignupForm = ({ close, switchMode}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    cpassword: '',
    phoneNumber: '',
    classLevel: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const validationErrors = validateSignup(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);

    try {
      const res = await axios.post('https://edu-master-delta.vercel.app/auth/signup', formData);
     
      toast.success("Verification email sent to your inbox");
      
      setLoading(false);
      setTimeout(() => {
        switchMode();
      }, 3000);
    } catch (err) {
        toast.error(err.response?.data?.message || 'Signup failed');
        console.error('Signup error:',err.response?.data?.message);
        setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={(e) => {e.preventDefault();handleSubmit();}}>
      {/* Render regular fields */}
        {fields.map(({ name, placeholder, type }) => (
        <div key={name}>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {placeholder}
            </label>
            <div className="relative">
            <input
                id={name}
                name={name}
                type={
                type === 'password' && showPassword ? 'text' : type
                } // Show as text if it's password and toggled
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {/* Only show eye icon for password fields */}
            {type === 'password' && (
                <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                    ) : (
                    <EyeIcon className="h-5 w-5 text-gray-500" />
                )}
                </button>
            )}
            </div>
            {errors[name] && <p className="mt-1 text-red-500 text-sm">{errors[name]}</p>}
        </div>
        ))}

      {/* Class Level Dropdown */}
      <div>
        <label htmlFor="classLevel" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Class Level
        </label>
        <select
          id="classLevel"
          name="classLevel"
          value={formData.classLevel}
          onChange={handleChange}
          className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          {classOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.classLevel && <p className="mt-1 text-red-500 text-sm">{errors.classLevel}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="button"
        onClick={handleSubmit}
        className="w-full px-4 py-2 mt-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200"
      >
        {loading ? (
            <div className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Signing up...
            </div>
        ) : (
            'Create Account'
        )}
      </button>

      {/* Switch Mode Link */}
      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account?
        <button
          type="button"
          onClick={switchMode}
          className="ml-1 text-blue-600 hover:underline"
        >
          Log In
        </button>
      </p>
    </form>
  );
};

export default SignupForm;