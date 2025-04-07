import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchServices = createAsyncThunk('services/fetchAll', async () => {
  const response = await api.get('/services');
  return response.data;
});

export const addService = createAsyncThunk('http://localhost:3000/services/add', async (serviceData) => {
  const response = await api.post('/services', serviceData);
  return response.data;
});

export const addToWishlist = createAsyncThunk('wishlist/add', async (serviceId) => {
  const response = await api.post(`http://localhost:3000/wishlist/${serviceId}`);
  return response.data;
});

export const removeFromWishlist = createAsyncThunk('wishlist/remove', async (serviceId) => {
  const response = await api.delete(`http://localhost:3000/wishlist/${serviceId}`);
  return response.data;
});

export const fetchWishlist = createAsyncThunk('wishlist/fetch', async () => {
  const response = await api.get('/wishlist');
  return response.data;
});

const serviceSlice = createSlice({
  name: 'services',
  initialState: {
    services: [],
    wishlist: [],
    loading: false,
    error: null,
  },
  reducers: {
    calculateCustomEventPrice: (state, action) => {
      const { selectedServices } = action.payload;
      return selectedServices.reduce((total, service) => total + service.price, 0);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.wishlist.push(action.payload);
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.wishlist = state.wishlist.filter(item => item._id !== action.payload._id);
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload;
      });
  },
});

export const { calculateCustomEventPrice } = serviceSlice.actions;
export default serviceSlice.reducer; 