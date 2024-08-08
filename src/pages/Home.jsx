import { useState, useEffect } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/Skeleton';
import axios from 'axios';

function Home() {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get('https://66b4405e9f9169621ea23974.mockapi.io/items');

        setPizzas(data);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    })();
    window.scrollTo(0, 0);
  }, []);

  return (
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
  );
}

export default Home;
