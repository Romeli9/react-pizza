import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type SortType = {
  name: string;
  sortProperty: 'rating' | 'price' | 'popular';
};

interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: SortType;
  order: 'asc' | 'desc';
}

const initialState: FilterSliceState = {
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
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setFilter(state, action: PayloadAction<SortType>) {
      state.sort = action.payload;
    },
    setOrder(state, action: PayloadAction<'asc' | 'desc'>) {
      state.order = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.currentPage = Number(action.payload.currentPage);
        state.categoryId = Number(action.payload.categoryId);
        state.order = action.payload.order;
        state.sort = action.payload.sort;
      } else {
        state.currentPage = 1;
        state.categoryId = 0;
        state.order = 'asc';
        state.sort = {
          name: 'популярности',
          sortProperty: 'rating',
        };
      }
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;

export const { setCategoryId, setFilter, setOrder, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
