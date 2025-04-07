import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Helper function to get initial state
const getInitialState = () => {
  const token = localStorage.getItem('token');
  const userData = localStorage.getItem('userData');
  return {
    user: token ? { token, ...(userData ? JSON.parse(userData) : {}) } : null,
    loading: false,
    error: null,
  };
};

export const login = createAsyncThunk('auth/login', async (credentials) => {
  const response = await api.post('/users/login', credentials);
  const { token, ...userData } = response.data;
  localStorage.setItem('token', token);
  localStorage.setItem('userData', JSON.stringify(userData));
  return { ...userData, token };
});

export const register = createAsyncThunk('auth/register', async (userData) => {
  const response = await api.post('/users/register', userData);
  const { token, ...userDataWithoutToken } = response.data;
  localStorage.setItem('token', token);
  localStorage.setItem('userData', JSON.stringify(userDataWithoutToken));
  return { ...userDataWithoutToken, token };
});

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userData');
  return null;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.user = null;
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.user = null;
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.error = null;
      });
  },
});

export default authSlice.reducer;
