import { useState, FC } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { selectCardItemById } from '../../redux/cart/selectors';
import { CartItemType } from '../../redux/cart/types';
import { addItem } from '../../redux/cart/slice';

type PizzaBlockProps = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export const PizzaBlock: FC<PizzaBlockProps> = ({ id, title, price, imageUrl, sizes, types }) => {
  const dispatch = useDispatch();

  const cartItem = useSelector(selectCardItemById(id));

  const addedCount = cartItem ? cartItem.count : 0;

  const [activeSizeIndex, setActiveSizeIndex] = useState(0);
  const [activeTypeIndex, setActiveTypeIndex] = useState(0);

  const typeNames = ['тонкое', 'традиционное'];

  const onClickAdd = () => {
    const item: CartItemType = {
      id,
      title,
      price,
      imageUrl,
      type: typeNames[activeTypeIndex],
      size: sizes[activeSizeIndex],
      count: 0,
    };
    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={`/react-pizza/pizza/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        </Link>
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((type, ix) => (
              <li
                key={ix}
                onClick={() => setActiveTypeIndex(ix)}
                className={activeTypeIndex === ix ? 'active' : ''}>
                {typeNames[type]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, ix) => (
              <li
                key={ix}
                onClick={() => setActiveSizeIndex(ix)}
                className={activeSizeIndex === ix ? 'active' : ''}>
                {size}
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button onClick={onClickAdd} type="button" className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};
