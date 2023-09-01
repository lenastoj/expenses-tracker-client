import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { expenseSelect } from '../store/expense/expenseSelector';
import { getExpense } from '../store/expense/expenseSlice';
import ExpenseForm from '../components/expense/ExpenseForm';
import ExpenseService from '../services/expense.service';
import useAuthGuard from '../hooks/useAuthGuard';

function ExpenseUpdate() {
  useAuthGuard(true);

  const { id } = useParams();
  const expense = useSelector(expenseSelect);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(getExpense(id));
    }
  }, []);

  const handleUpdate = async (formData) => {
    await ExpenseService.edit(id, formData);
    navigate(-1);
  };
  return <ExpenseForm expense={expense} onSubmit={handleUpdate} />;
}

export default ExpenseUpdate;
