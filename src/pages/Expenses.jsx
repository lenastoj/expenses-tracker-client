import React from 'react';
import { useSearchParams } from 'react-router-dom';
import useAuthGuard from '../hooks/useAuthGuard';
import ExpensesList from '../components/expense/ExpensesList';

function Expenses() {
  useAuthGuard(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const queryString = {
    pageFromURL: Number(searchParams.get('page')) || 1,
    wordFromURL: searchParams.get('word') || '',
    orderFromURL: searchParams.get('order') || '',
    sortFromURL: searchParams.get('sort') || '',
    startDateFromURL: searchParams.get('startDate') || '',
    endDateFromURL: searchParams.get('endDate') || '',
  };

  return (
    <ExpensesList
      pageFromURL={queryString.pageFromURL}
      wordFromURL={queryString.wordFromURL}
      orderFromURL={queryString.orderFromURL}
      sortFromURL={queryString.sortFromURL}
      setSearchParams={setSearchParams}
      startDateFromURL={queryString.startDateFromURL}
      endDateFromURL={queryString.endDateFromURL}
    />
  );
}

export default Expenses;
