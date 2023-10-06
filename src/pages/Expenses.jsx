import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useAuthGuard from '../hooks/useAuthGuard';
import ExpensesList from '../components/expense/ExpensesList';
import GuestMode from '../components/GuestMode';
import { guestsSelect } from '../store/auth/authSelector';

function Expenses() {
  useAuthGuard(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageFromURL, setPageFromURL] = useState(
    Number(searchParams.get('page')) || 1,
  );
  const [guestName, setGuestName] = useState();
  const queryString = {
    wordFromURL: searchParams.get('word') || '',
    orderFromURL: searchParams.get('order') || '',
    sortFromURL: searchParams.get('sort') || '',
    startDateFromURL: searchParams.get('startDate') || '',
    endDateFromURL: searchParams.get('endDate') || '',
  };
  const guestsOriginal = useSelector(guestsSelect);
  let guests = [{ value: 0, label: 'nothing' }];
  if (guestsOriginal) {
    guests = guestsOriginal.map((item) => {
      const fullName = `${item.firstName} ${item.lastName}`;
      return { value: item.id, label: fullName };
    });
  }
  return (
    <div>
      <GuestMode
        guestName={guestName}
        setGuestName={setGuestName}
        setPageFromURL={setPageFromURL}
        guests={guests}
      />

      <ExpensesList
        wordFromURL={queryString.wordFromURL}
        orderFromURL={queryString.orderFromURL}
        sortFromURL={queryString.sortFromURL}
        setSearchParams={setSearchParams}
        startDateFromURL={queryString.startDateFromURL}
        endDateFromURL={queryString.endDateFromURL}
        guests={guests}
        guestName={guestName}
        pageFromURL={pageFromURL}
        setPageFromURL={setPageFromURL}
      />
    </div>
  );
}

export default Expenses;
