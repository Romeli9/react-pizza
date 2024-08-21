export enum SortPropertyEnum {
  RATING = 'rating',
  PRICE = 'price',
  TITLE = 'title',
}

export type SortType = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: SortType;
  order: 'asc' | 'desc';
}

export type SetFiltersType = {
  categoryId: number;
  currentPage: number;
  sort: SortType;
  order: 'asc' | 'desc';
};
