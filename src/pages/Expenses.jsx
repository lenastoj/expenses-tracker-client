import React from 'react';
import ExpensesList from '../components/expense/ExpensesList';
import useAuthGuard from '../hooks/useAuthGuard';

function Expenses() {
  useAuthGuard(true);

  return (
    <div className="container card p-3 mb-3 mt-5">
      <ExpensesList />
    </div>
  );
}

export default Expenses;
