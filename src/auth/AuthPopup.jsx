import React from 'react';
import { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const AuthPopup = ({ open, setOpen, isSignup, setIsSignup }) => {
  const closeModal = () => setOpen(false);

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-300 bg-opcity-10"
          onClick={closeModal}
        >
          {/* Modal */}
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md mx-auto transform transition-all"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <div className="p-6 relative"> {/* Add 'relative' for positioning close button */}
              
              {/* Close Button (Top Right) */}
              <button
                type="button"
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white text-xl font-bold"
                aria-label="Close modal"
              >
                &times;
              </button>

              {/* Modal Title */}
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                {isSignup ? 'Sign Up' : 'Log In'}
              </h2>

              {/* Conditional Form Rendering */}
              {isSignup ? (
                <SignupForm close={closeModal} switchMode={() => setIsSignup(false)}  />
              ) : (
                <LoginForm close={closeModal} switchMode={() => setIsSignup(true)} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthPopup;