import { useState, useEffect } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/Skeleton';
import axios from 'axios';

function Home({ searchValue }) {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: 'популярности',
    sortProperty: 'rating',
  });

  const [order, setOrder] = useState('asc');

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://66b4405e9f9169621ea23974.mockapi.io/items?${
            categoryId > 0 ? `category=${categoryId}` : ''
          }&sortBy=${sortType.sortProperty}&order=${order}&${
            searchValue ? `search=${searchValue}` : ''
          }`,
        );

        setPizzas(data);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    })();
    window.scrollTo(0, 0);
  }, [categoryId, sortType, order, searchValue]);

  const skeletons = [...Array(10)].map((_, ix) => <PizzaSkeleton key={ix} />);
  const items = pizzas.map((obj, ix) => <PizzaBlock key={ix} {...obj} isLoading={isLoading} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onClickCategory={(id) => setCategoryId(id)} />
        <Sort
          sortType={sortType}
          onChangeType={(type) => setSortType(type)}
          order={order}
          onChangeOrder={(order) => setOrder(order)}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : items}</div>
    </div>
  );
}

export default Home;
