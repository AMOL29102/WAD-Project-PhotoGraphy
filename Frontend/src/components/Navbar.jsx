import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Detect if current page has dark background
  const isDarkPage = location.pathname === '/' || location.pathname === '/gallery';

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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
          </div>

          {/* Hamburger Button for Mobile */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <div className="flex space-x-6 font-medium">
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
              {isAuthenticated && (
                <>
                  {!(user?.isAdmin) && (
                    <Link
                      to="/wishlist"
                      className="hover:text-red-500 transition-colors duration-200"
                    >
                      Wishlist
                    </Link>
                  )}
                  {user?.isAdmin && (
                    <>
                      <Link
                        to="/admin/events"
                        className="hover:text-red-500 transition-colors duration-200"
                      >
                        Admin Events
                      </Link>
                      <Link
                        to="/admin/add-service"
                        className="hover:text-red-500 transition-colors duration-200"
                      >
                        Add Service
                      </Link>
                      <Link
                        to="/admin/photo-rates"
                        className="hover:text-red-500 transition-colors duration-200"
                      >
                        Manage Photo Rates
                      </Link>
                    </>
                  )}
                </>
              )}
            </div>
            <div className="flex items-center">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
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
                </div>
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/events"
                className="block px-3 py-2 rounded-md text-base font-medium hover:text-red-500 hover:bg-gray-100 transition-colors duration-200"
                onClick={toggleMobileMenu}
              >
                Events
              </Link>
              <Link
                to="/gallery"
                className="block px-3 py-2 rounded-md text-base font-medium hover:text-red-500 hover:bg-gray-100 transition-colors duration-200"
                onClick={toggleMobileMenu}
              >
                Gallery
              </Link>
              {isAuthenticated && (
                <>
                  {!(user?.isAdmin) && (
                    <Link
                      to="/wishlist"
                      className="block px-3 py-2 rounded-md text-base font-medium hover:text-red-500 hover:bg-gray-100 transition-colors duration-200"
                      onClick={toggleMobileMenu}
                    >
                      Wishlist
                    </Link>
                  )}
                  {user?.isAdmin && (
                    <>
                      <Link
                        to="/admin/events"
                        className="block px-3 py-2 rounded-md text-base font-medium hover:text-red-500 hover:bg-gray-100 transition-colors duration-200"
                        onClick={toggleMobileMenu}
                      >
                        Admin Events
                      </Link>
                      <Link
                        to="/admin/add-service"
                        className="block px-3 py-2 rounded-md text-base font-medium hover:text-red-500 hover:bg-gray-100 transition-colors duration-200"
                        onClick={toggleMobileMenu}
                      >
                        Add Service
                      </Link>
                      <Link
                        to="/admin/photo-rates"
                        className="block px-3 py-2 rounded-md text-base font-medium hover:text-red-500 hover:bg-gray-100 transition-colors duration-200"
                        onClick={toggleMobileMenu}
                      >
                        Manage Photo Rates
                      </Link>
                    </>
                  )}
                </>
              )}
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    dispatch(logout());
                    toggleMobileMenu();
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                    isDarkPage
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-red-500 text-white hover:bg-red-600'
                  } transition-colors duration-200`}
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium hover:text-red-500 hover:bg-gray-100 transition-colors duration-200"
                    onClick={toggleMobileMenu}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      isDarkPage
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    } transition-colors duration-200`}
                    onClick={toggleMobileMenu}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}