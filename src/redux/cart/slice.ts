import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CartItemType, CartSliceState } from './types';
import { getCartFromLocalStorage } from '../../utils/getCartFromLocalStorage';
import { calcSum } from '../../utils/calcTotalPrice';

const { items, totalPrice } = getCartFromLocalStorage();

console.log(totalPrice);

const initialState: CartSliceState = {
  items,
  totalPrice,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItemType>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = calcSum(state.items);
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }

      state.totalPrice = calcSum(state.items);
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);

      state.totalPrice = calcSum(state.items);
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
