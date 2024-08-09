import { useState } from 'react';

function Sort({ sortType, onChangeType, order, onChangeOrder }) {
  const [isOpen, setIsOpen] = useState(false);

  const arraySort = [
    { name: 'популярности', sortProperty: 'rating' },
    { name: 'цене', sortProperty: 'price' },
    { name: 'алфавиту', sortProperty: 'title' },
  ];

  const onClickSort = (index) => {
    setIsOpen((prev) => !isOpen);
    onChangeType(index);
  };

  return (
    <div className="sort">
      <div className="sort__label">
        {order === 'asc' ? (
          <span className="sort__label-order" onClick={() => onChangeOrder('desc')}>
            ↑
          </span>
        ) : (
          <span className="sort__label-order" onClick={() => onChangeOrder('asc')}>
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
