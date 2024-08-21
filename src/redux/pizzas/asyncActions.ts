import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchArgs, Pizza } from './types';
import axios from 'axios';

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
