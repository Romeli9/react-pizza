import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalPrice: 0,
};

const calcSum = (state) => {
  state.totalPrice = state.items.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  }, 0);
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      calcSum(state);
    },
    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }

      calcSum(state);
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);

      calcSum(state);
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state) => state.cart;
export const selectCardItemById = (id) => (state) => state.cart.items.find((obj) => obj.id === id);

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
