import React from 'react';
import ExpenseForm from '../components/expense/ExpenseForm';
import ExpenseService from '../services/expense.service';

function ExpenseCreate() {
  const handleCreate = async (formData) => {
    await ExpenseService.create(formData);
  };
  return <ExpenseForm onSubmit={handleCreate} />;
}

export default ExpenseCreate;
