import React from 'react';
import useAuthGuard from '../hooks/useAuthGuard';
import AddGuest from '../components/guest/AddGuest';
import GuestsList from '../components/guest/GuestsList';

function Guest() {
  useAuthGuard(true);
  return (
    <div className="container card p-0 mb-3 mt-5 w-50">
      <AddGuest />
      <GuestsList />
    </div>
  );
}

export default Guest;
