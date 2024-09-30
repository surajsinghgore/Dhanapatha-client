import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  state: false,
};

const loaderSlice = createSlice({
  name: 'apiHit',
  initialState,
  reducers: {
    toggleLoader: (state) => {
      state.state = !state.state; 
    },
  },
});

export const { toggleLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
