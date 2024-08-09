import { useState } from 'react';

function Categories({ categoryId, onClickCategory }) {
  const categoriesList = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categoriesList.map((category, ix) => (
          <li
            key={ix}
            onClick={() => onClickCategory(ix)}
            className={categoryId === ix ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
