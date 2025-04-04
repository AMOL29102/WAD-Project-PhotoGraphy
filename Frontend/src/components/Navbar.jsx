import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';

export default function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  // Detect if current page has dark background
  const isDarkPage = location.pathname === '/'; // or any dark page routes you use

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isDarkPage
          ? 'bg-black/90 text-white shadow-md border-b border-white/10'
          : 'bg-white/90 text-black shadow-sm border-b border-gray-200 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-extrabold text-red-600">
              PhotoStudio
            </Link>
            <div className="hidden sm:flex space-x-6 font-medium">
              <Link
                to="/events"
                className="hover:text-red-500 transition-colors duration-200"
              >
                Events
              </Link>
              <Link
                to="/gallery"
                className="hover:text-red-500 transition-colors duration-200"
              >
                Gallery
              </Link>
              {user && (
                <>
                  <Link
                    to="/bookings"
                    className="hover:text-red-500 transition-colors duration-200"
                  >
                    My Bookings
                  </Link>
                  {user.isAdmin && (
                    <Link
                      to="/admin/events"
                      className="hover:text-red-500 transition-colors duration-200"
                    >
                      Admin Events
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="flex items-center">
            {user ? (
              <button
                onClick={() => dispatch(logout())}
                className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                  isDarkPage
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-red-500 text-white hover:bg-red-600'
                }`}
              >
                Logout
              </button>
            ) : (
              <div className="space-x-4">
                <Link
                  to="/login"
                  className="hover:text-red-500 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                    isDarkPage
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
