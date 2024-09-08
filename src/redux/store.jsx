import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import pelangganReducer from './slices/pelangganSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
    bills: pelangganReducer,
  },
});

export default store;
