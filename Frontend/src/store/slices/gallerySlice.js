
import { createSlice } from '@reduxjs/toolkit';

const gallerySlice = createSlice({
  name: 'gallery',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    setGalleryItems: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setGalleryItems } = gallerySlice.actions;
export default gallerySlice.reducer;
