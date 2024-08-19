import { useEffect, useRef, FC } from 'react';
import { useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

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
  SetFiltersType,
} from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzas } from '../redux/slices/pizzasSlice';
import { useAppDispatch } from '../redux/store';

const Home: FC = () => {
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, currentPage, sort, order, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzas);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const onClickCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (page: number) => {
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

      if (sort) {
        const filters: SetFiltersType = {
          categoryId: Number(params.categoryId),
          currentPage: Number(params.currentPage),
          sort: sort,
          order: params.order as 'asc' | 'desc',
        };
        dispatch(setFilters(filters));
      }

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
  const pizzas = items.map((obj: any, ix: number) => <PizzaBlock key={ix} {...obj} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onClickCategory={(id: number) => onClickCategory(id)} />
        <Sort />
      </div>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>
            Произошла ошибка <span>😕</span>
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
};

export default Home;
