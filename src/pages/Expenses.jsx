import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useAuthGuard from '../hooks/useAuthGuard';
import ExpensesList from '../components/expense/ExpensesList';
import HostMode from '../components/HostMode';
import { hostsSelect } from '../store/auth/authSelector';

function Expenses() {
  useAuthGuard(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageFromURL, setPageFromURL] = useState(
    Number(searchParams.get('page')) || 1,
  );
  const queryString = {
    searchQueryFromURL: searchParams.get('searchQuery') || '',
    orderFromURL: searchParams.get('order') || '',
    sortFromURL: searchParams.get('sort') || '',
    startDateFromURL: searchParams.get('startDate') || '',
    endDateFromURL: searchParams.get('endDate') || '',
  };
  const hostsOriginal = useSelector(hostsSelect);
  let hosts = [{ value: 0, label: 'nothing' }];
  if (hostsOriginal) {
    hosts = hostsOriginal.map((item) => {
      const fullName = `${item.firstName} ${item.lastName}`;
      return { value: item.id, label: fullName };
    });
  }
  return (
    <div>
      <HostMode setPageFromURL={setPageFromURL} hosts={hosts} />
      <ExpensesList
        searchQueryFromURL={queryString.searchQueryFromURL}
        orderFromURL={queryString.orderFromURL}
        sortFromURL={queryString.sortFromURL}
        setSearchParams={setSearchParams}
        startDateFromURL={queryString.startDateFromURL}
        endDateFromURL={queryString.endDateFromURL}
        hosts={hosts}
        pageFromURL={pageFromURL}
        setPageFromURL={setPageFromURL}
      />
    </div>
  );
}

export default Expenses;
