/* eslint-disable no-alert */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  expensesSelect,
  expenseDelete,
} from '../../store/expense/expenseSelector';
import { deleteExpense, getExpenses } from '../../store/expense/expenseSlice';
// import { getExpenses } from '../../store/expense/expenseSlice';
import Table from '../table/Table';
import Button from '../form/Button';
import ROUTES from '../../utils/static';

function ExpensesList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const expenses = useSelector(expensesSelect);
  const deleteInfo = useSelector(expenseDelete);

  useEffect(() => {
    dispatch(getExpenses());
  }, [deleteInfo]);

  const handleEdit = (id) => {
    navigate(`${ROUTES.EXPENSES_EDIT}/${id}`);
  };

  const handleRemove = async (id) => {
    const confirmation = window.confirm(
      `Are you sure you want to delete expense?`,
    );
    if (confirmation) {
      dispatch(deleteExpense(id));
    }
  };
  return (
    <div className="container card p-3 mb-3 mt-5">
      <h2 className="my-0 mr-md-auto font-weight-normal pb-3">Expenses List</h2>
      {expenses && expenses[0] ? (
        <Table
          expenses={expenses}
          headers={Object.keys(expenses[0])}
          edit
          remove
          handleEdit={handleEdit}
          handleRemove={handleRemove}
        />
      ) : (
        <h4 className="mb-5">Currently no expenses!</h4>
      )}
      <Button
        type="button"
        text="Add new expense"
        classButton="btn-primary col-2"
        onClick={() => navigate(ROUTES.EXPENSES_NEW)}
      />
    </div>
  );
}

export default ExpensesList;
