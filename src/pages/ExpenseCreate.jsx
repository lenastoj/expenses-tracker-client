import React from 'react';
import ExpenseForm from '../components/expense/ExpenseForm';
import ExpenseService from '../services/expense.service';
import useAuthGuard from '../hooks/useAuthGuard';

function ExpenseCreate() {
  useAuthGuard(true);
  console.log('create');
  const handleCreate = async (formData) => {
    await ExpenseService.create(formData);
  };
  return <ExpenseForm onSubmit={handleCreate} />;
}

export default ExpenseCreate;
