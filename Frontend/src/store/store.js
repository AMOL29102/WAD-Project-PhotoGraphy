import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import eventReducer from './slices/eventSlice';
import galleryReducer from './slices/gallerySlice';
import bookingReducer from './slices/bookingSlice';
import serviceReducer from './slices/serviceSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventReducer,
    gallery: galleryReducer,
    bookings: bookingReducer,
    services: serviceReducer,
  },
});
