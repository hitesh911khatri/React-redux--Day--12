// Redux/Reducers/ServicesSlice.js

import { createSlice } from '@reduxjs/toolkit';

const servicesSlice = createSlice({
  name: 'services',
  initialState: {
    items: [], // Modify the initial state to store the products
  },
  reducers: {
    addNewProducts: (state, action) => {
      if (action.payload) {
        state.items.push(action.payload);
      }
    },
    removeProduct: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);
    },
  },
});

export const { addNewProducts, removeProduct } = servicesSlice.actions;

export default servicesSlice.reducer;
