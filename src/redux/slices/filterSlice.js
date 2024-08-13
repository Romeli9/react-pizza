import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
  order: 'asc',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setFilter(state, action) {
      state.sort = action.payload;
    },
    setOrder(state, action) {
      state.order = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      state.order = action.payload.order;
      state.sort = action.payload.sort;
    },
  },
});

export const selectFilter = (state) => state.filter;

export const { setCategoryId, setFilter, setOrder, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
