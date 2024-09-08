import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  konsumen: [],  // Tetap menggunakan 'konsumen' sebagai nama state
};

const pelangganSlice = createSlice({
  name: 'bills',
  initialState,
  reducers: {
    setPelanggan: (state, action) => {
      state.konsumen = action.payload;
    },
    addPelanggan: (state, action) => {
      state.konsumen.push(action.payload);
    },
    // Hapus fungsi updatePelanggan
    deletePelanggan: (state, action) => {
      state.konsumen = state.konsumen.filter(bills => bills.id !== action.payload);
    },
  },
});

export const { setPelanggan, addPelanggan, deletePelanggan } = pelangganSlice.actions;
export default pelangganSlice.reducer;
