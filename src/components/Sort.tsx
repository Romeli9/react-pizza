import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setFilter, setOrder, selectFilter } from '../redux/slices/filterSlice';

type ArrayItem = {
  name: string;
  sortProperty: string;
};

export const arraySort: ArrayItem[] = [
  { name: 'популярности', sortProperty: 'rating' },
  { name: 'цене', sortProperty: 'price' },
  { name: 'алфавиту', sortProperty: 'title' },
];

function Sort() {
  const [isOpen, setIsOpen] = useState(false);

  const { sort, order } = useSelector(selectFilter);

  const sortRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    // const handleClickOutside = (event: Event) => {
    //   console.log(event);
    //   if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
    //     setIsOpen(false);
    //   }
    // };

    const handleClickOutside = (e: MouseEvent) => {
      const current = sortRef.current;
      const path = e.composedPath();
      if (current && !path.includes(current)) {
        setIsOpen(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const onClickSort = (obj: ArrayItem) => {
    setIsOpen((prev) => !isOpen);
    dispatch(setFilter(obj));
  };

  return (
    <div ref={sortRef} className="sort">
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
        <span onClick={() => setIsOpen((prev) => !isOpen)}>{sort.name}</span>
      </div>
      {isOpen && (
        <div className="sort__popup">
          <ul>
            {arraySort.map((obj, ix) => (
              <li
                key={ix}
                onClick={() => onClickSort(obj)}
                className={sort.sortProperty === obj.sortProperty ? 'active' : ''}>
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
