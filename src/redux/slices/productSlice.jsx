import { createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../../lib/axios';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    authData: null,
  },
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    addProduct(state, action) {
      state.products.push(action.payload);
    },
    updateProduct(state, action) {
      const index = state.products.findIndex(product => product.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct(state, action) {
      state.products = state.products.filter(product => product.id !== action.payload);
    },
    setAuthData(state, action) {
      state.authData = action.payload;
    },
  },
});

export const putProduct = (updatedProduct) => async (dispatch) => {
  try {
    const token = localStorage.getItem('nilai token');
    if (!token) throw new Error('No token found');

    const headers = { Authorization: `Bearer ${token}` };
    const response = await axiosInstance.put(`/products/${updatedProduct.id}`, updatedProduct, { headers });
    dispatch(updateProduct(response.data.data));
  } catch (error) {
    console.log("ERROR UPDATING DATA", error);
  }
};

export const { setProducts, addProduct, updateProduct, deleteProduct, setAuthData } = productSlice.actions;

export default productSlice.reducer;
