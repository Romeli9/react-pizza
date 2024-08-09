import { useState, useEffect } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/Skeleton';
import axios from 'axios';

import AppContext from '../context';

function Home() {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [categories, setCategories] = useState(0);
  const [sortBy, setSortBy] = useState('rating');
  //↓
  //↑
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const url = new URL('https://66b4405e9f9169621ea23974.mockapi.io/items');
        if (categories) {
          url.searchParams.append('category', categories);
        }
        if (sortBy) {
          url.searchParams.append('sortBy', sortBy);
          url.searchParams.append('order', 'desc');
        }

        console.log(url);
        const { data } = await axios.get(url);

        setPizzas(data);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    })();
    window.scrollTo(0, 0);
  }, [categories, sortBy]);

  console.log(pizzas);
  console.log(categories, sortBy, 'Home.jsx');

  return (
    <AppContext.Provider value={{ categories, setCategories, sortBy, setSortBy }}>
      <div className="container">
        <div className="content__top">
          <Categories />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading
            ? [...Array(10)].map((_, ix) => <PizzaSkeleton key={ix} />)
            : pizzas.map((obj, ix) => <PizzaBlock key={ix} {...obj} isLoading={isLoading} />)}
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default Home;
