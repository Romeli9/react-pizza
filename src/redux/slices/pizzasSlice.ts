import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { CartItem } from './cartSlice';

type SortType = {
  name: string;
  sortProperty: string;
};

type FetchArgs = {
  currentPage: number;
  categoryId: number;
  sort: SortType;
  order: string;
  searchValue: string;
};

export const fetchPizzas = createAsyncThunk<Pizza[], FetchArgs>(
  'pizzas/fetchPizzasStatus',
  async (props) => {
    const { currentPage, categoryId, sort, order, searchValue } = props;
    const { data } = await axios.get<Pizza[]>(
      `https://66b4405e9f9169621ea23974.mockapi.io/items?page=${currentPage}&limit=4&${
        categoryId > 0 ? `category=${categoryId}` : ''
      }&sortBy=${sort.sortProperty}&order=${order}&${searchValue ? `search=${searchValue}` : ''}`,
    );

    return data;
  },
);

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

interface PizzaSliceState {
  items: Pizza[];
  status: 'loading' | 'success' | 'error';
}

const initialState: PizzaSliceState = {
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

export const selectPizzas = (state: RootState) => state.pizzas;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
