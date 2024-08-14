import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate, Link } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort, { arraySort } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
  selectFilter,
} from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzas } from '../redux/slices/pizzasSlice';

function Home() {
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, currentPage, sort, order, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzas);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (page) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    dispatch(
      fetchPizzas({
        currentPage,
        categoryId,
        sort,
        order,
        searchValue,
      }),
    );
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = arraySort.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(setFilters({ ...params, sort }));
      getPizzas();
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
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
  const pizzas = items.map((obj, ix) => <PizzaBlock {...obj} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onClickCategory={(id) => onClickCategory(id)} />
        <Sort />
      </div>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>
            Произошла ошибка <icon>😕</icon>
          </h2>
          <p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
        </>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}

export default Home;
