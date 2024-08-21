import { CartItemType } from '../redux/cart/types';
import { calcSum } from './calcTotalPrice';

export const getCartFromLocalStorage = () => {
  const data = localStorage.getItem('cart');
  const items = data ? (JSON.parse(data) as CartItemType[]) : [];
  const totalPrice = calcSum(items);

  return {
    items,
    totalPrice,
  };
};
