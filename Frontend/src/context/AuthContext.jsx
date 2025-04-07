import React, { createContext, useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slices/authSlice';
import api from '../services/api';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [isInitialized, setIsInitialized] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const initializeAuth = async () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        dispatch(login.fulfilled({
          ...parsedUserData,
          token
        }));
      } catch (error) {
        console.error('Failed to parse user data:', error);
      }
    }
    setIsInitialized(true);
  };

  useEffect(() => {
    initializeAuth();
  }, []);

  // Add a listener for storage events to handle token changes
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'token') {
        if (!e.newValue) {
          // Token was removed, clear auth state
          dispatch(login.fulfilled(null));
        } else {
          // Token was added, reinitialize auth
          initializeAuth();
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const value = {
    isInitialized,
    isAuthenticated: !!user,
    user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
