import React from 'react';
import { useSearchParams } from 'react-router-dom';
import ExpensesList from '../components/expense/ExpensesList';
import useAuthGuard from '../hooks/useAuthGuard';

function Expenses() {
  useAuthGuard(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const queryString = {
    pageFromURL: Number(searchParams.get('page')) || 1,
    wordFromURL: searchParams.get('word') || '',
    orderFromURL: searchParams.get('order') || '',
    sortFromURL: searchParams.get('sort') || '',
    monthFromURL: searchParams.get('month') || '',
  };

  return (
    <ExpensesList
      pageFromURL={queryString.pageFromURL}
      wordFromURL={queryString.wordFromURL}
      orderFromURL={queryString.orderFromURL}
      sortFromURL={queryString.sortFromURL}
      monthFromURL={queryString.monthFromURL}
      setSearchParams={setSearchParams}
    />
  );
}

export default Expenses;
