import { configureStore } from '@reduxjs/toolkit';
import loaderReducer from './Slices/LoaderSlice';
import apiHitReducer from './Slices/ApiHitState';

const store = configureStore({
  reducer: {
    loader: loaderReducer,
    apiHit: apiHitReducer,
  },
});

export default store;
