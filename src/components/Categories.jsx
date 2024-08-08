import { useState } from 'react';

function Categories() {
  const [activeIndex, setActiveIndex] = useState(0);

  const onClickCategory = (index) => {
    setActiveIndex(index);
  };

  const categoriesList = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

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
