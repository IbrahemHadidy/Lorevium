import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { Link } from 'react-router-dom';
import { useState } from "react"; 
import AuthPopup from "../auth/AuthPopup";


const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  //sign in/up popup states
  const [open, setOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  return (
    <nav className="bg-white shadow dark:bg-gray-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">Lorevium</Link>

        <div>
          {user ? (
            <>
              <span className="text-gray-700 dark:text-white mr-4">Hello, {user.fullName}</span>
              <button
                onClick={() => dispatch(logout())}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Logout
              </button>
              <button>
                <Link to="/profile" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Profile
                </Link>
              </button>
            </>
          ) : (
            <> 
            {/* to be changed when adding the navbar */}
            <div className="flex justify-center p-4">
                <button
                onClick={() => {setOpen(true); setIsSignup(false);}}
                className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                Log in
                </button>
                <button
                onClick={() => {setOpen(true); setIsSignup(true);}}
                className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                Sign up
                </button>
            </div>
            <AuthPopup open={open} setOpen={setOpen} isSignup={isSignup} setIsSignup={setIsSignup} />
            {/*                                                  */}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;