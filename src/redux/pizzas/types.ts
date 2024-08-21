import { SortPropertyEnum } from '../filter/types';

export type SortType = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export type FetchArgs = {
  currentPage: number;
  categoryId: number;
  sort: SortType;
  order: string;
  searchValue: string;
};

export type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}
