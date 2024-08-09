import { useState, useContext } from 'react';

import AppContext from '../context';

function Categories() {
  const [activeIndex, setActiveIndex] = useState(0);

  const { categories, setCategories } = useContext(AppContext);

  const onClickCategory = (index) => {
    setActiveIndex(index);
    setCategories(index);
  };

  const categoriesList = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  console.log('Categories.jsx: ', categories);

  return (
    <div className="categories">
      <ul>
        {categoriesList.map((category, ix) => (
          <li
            key={ix}
            onClick={() => onClickCategory(ix)}
            className={activeIndex === ix ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
