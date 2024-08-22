import { FC, memo } from 'react';

type CategoriesProps = {
  categoryId: number;
  onClickCategory: (ix: number) => void;
};

export const Categories: FC<CategoriesProps> = memo(({ categoryId, onClickCategory }) => {
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
});
