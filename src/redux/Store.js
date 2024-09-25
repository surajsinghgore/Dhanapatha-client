import { configureStore } from '@reduxjs/toolkit';
import loaderReducer from './Slices/LoaderSlice';

const store = configureStore({
  reducer: {
    loader: loaderReducer,
  },
});

export default store;
