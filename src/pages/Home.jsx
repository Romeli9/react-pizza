import { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { setCategoryId, setFilter, setOrder } from '../redux/slices/filterSlice';

function Home() {
  const { searchValue } = useContext(SearchContext);

  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const categoryId = useSelector((state) => state.filter.categoryId);

  const sortType = useSelector((state) => state.filter.sort);

  const order = useSelector((state) => state.filter.order);

  const dispatch = useDispatch(setCategoryId);

  const [currentPage, setCurrentPage] = useState(1);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangeType = (type) => {
    dispatch(setFilter(type));
  };

  const onChangeOrder = (order) => {
    dispatch(setOrder(order));
  };

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://66b4405e9f9169621ea23974.mockapi.io/items?page=${currentPage}&limit=4&${
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
  }, [categoryId, sortType, order, searchValue, currentPage]);

  const skeletons = [...Array(10)].map((_, ix) => <PizzaSkeleton key={ix} />);
  const items = pizzas.map((obj, ix) => <PizzaBlock key={ix} {...obj} isLoading={isLoading} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onClickCategory={(id) => onClickCategory(id)} />
        <Sort
          sortType={sortType}
          onChangeType={(type) => onChangeType(type)}
          order={order}
          onChangeOrder={(order) => onChangeOrder(order)}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : items}</div>
      <Pagination onChangePage={(page) => setCurrentPage(page)} />
    </div>
  );
}

export default Home;
