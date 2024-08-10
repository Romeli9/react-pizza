import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setFilter, setOrder } from '../redux/slices/filterSlice';

function Sort() {
  const [isOpen, setIsOpen] = useState(false);

  const sortType = useSelector((state) => state.filter.sort);
  const order = useSelector((state) => state.filter.order);

  const dispatch = useDispatch();

  const arraySort = [
    { name: 'популярности', sortProperty: 'rating' },
    { name: 'цене', sortProperty: 'price' },
    { name: 'алфавиту', sortProperty: 'title' },
  ];

  const onClickSort = (obj) => {
    setIsOpen((prev) => !isOpen);
    dispatch(setFilter(obj));
  };

  return (
    <div className="sort">
      <div className="sort__label">
        {order === 'asc' ? (
          <span className="sort__label-order" onClick={() => dispatch(setOrder('desc'))}>
            ↑
          </span>
        ) : (
          <span className="sort__label-order" onClick={() => dispatch(setOrder('asc'))}>
            ↓
          </span>
        )}
        <b>Сортировка по:</b>
        <span onClick={() => setIsOpen((prev) => !isOpen)}>{sortType.name}</span>
      </div>
      {isOpen && (
        <div className="sort__popup">
          <ul>
            {arraySort.map((obj, ix) => (
              <li
                key={ix}
                onClick={() => onClickSort(obj)}
                className={sortType.sortProperty === obj.sortProperty ? 'active' : ''}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
