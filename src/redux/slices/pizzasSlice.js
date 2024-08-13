import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzasStatus',
  async ({ currentPage, categoryId, sort, order, searchValue }) => {
    const { data } = await axios.get(
      `https://66b4405e9f9169621ea23974.mockapi.io/items?page=${currentPage}&limit=4&${
        categoryId > 0 ? `category=${categoryId}` : ''
      }&sortBy=${sort.sortProperty}&order=${order}&${searchValue ? `search=${searchValue}` : ''}`,
    );
    console.log(data);
    return data;
  },
);

const initialState = {
  items: [],
  status: 'loading', // loading | success | error
};

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = 'loading';
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = 'success';
      state.items = action.payload;
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = 'error';
      state.items = [];
    });
  },
});

export const selectPizzas = (state) => state.pizzas;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
