import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  progress: 0,
};

const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    showLoader: (state) => {
      state.loading = true;
      state.progress = 10;
    },
    updateProgress: (state, action) => {
      state.progress = action.payload;
    },
    hideLoader: (state) => {
      state.loading = false;
      state.progress = 0;
    },
  },
});

export const { showLoader, updateProgress, hideLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
