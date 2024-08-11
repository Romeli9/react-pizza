import { useState, useEffect, useContext, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort, { arraySort } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';

function Home() {
  const { searchValue } = useContext(SearchContext);

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { categoryId, currentPage, sort, order } = useSelector((state) => state.filter);

  const dispatch = useDispatch(setCategoryId);

  const navigate = useNavigate();

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (page) => {
    dispatch(setCurrentPage(page));
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = arraySort.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      (async () => {
        try {
          setIsLoading(true);
          const { data } = await axios.get(
            `https://66b4405e9f9169621ea23974.mockapi.io/items?page=${currentPage}&limit=4&${
              categoryId > 0 ? `category=${categoryId}` : ''
            }&sortBy=${sort.sortProperty}&order=${order}&${
              searchValue ? `search=${searchValue}` : ''
            }`,
          );

          setPizzas(data);
        } catch (error) {
          console.error(error);
        }
        setIsLoading(false);
      })();
    }
    isSearch.current = false;

    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, order, searchValue, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const querryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
        order,
      });

      navigate(`?${querryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, order, currentPage]);

  const skeletons = [...Array(10)].map((_, ix) => <PizzaSkeleton key={ix} />);
  const items = pizzas.map((obj, ix) => <PizzaBlock key={ix} {...obj} isLoading={isLoading} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onClickCategory={(id) => onClickCategory(id)} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : items}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}

export default Home;
