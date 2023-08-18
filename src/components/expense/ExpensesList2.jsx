/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  expensesSelect,
  expenseDelete,
} from '../../store/expense/expenseSelector';
// import { deleteExpense, getExpenses } from '../../store/expense/expenseSlice';
import { getExpenses } from '../../store/expense/expenseSlice';
import Table from '../table/Table';
import Button from '../form/Button';
import ROUTES from '../../utils/static';

function ExpensesList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const expenses = useSelector(expensesSelect);
  const deleteInfo = useSelector(expenseDelete);

  const [show, setShow] = useState(false);
  // const [confirm, setConfirm] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const handleConfirm = () => setConfirm(true);

  useEffect(() => {
    dispatch(getExpenses());
  }, [deleteInfo]);

  const handleEdit = (id) => {
    navigate(`${ROUTES.EXPENSES_EDIT}/${id}`);
  };

  // const handleRemove = async (id) => {
  //   if (confirm) {
  //     dispatch(deleteExpense(id));
  //   }
  // const confirmation = window.confirm(
  //   `Are you sure you want to delete expense?`,
  // );
  // if (confirmation) {
  //   dispatch(deleteExpense(id));
  // }
  // };
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
          handleRemove={handleShow}
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
      {show && (
        <div>
          <h5>Modal</h5>
          <button onClick={handleClose}>Cancle</button>
          {/* <button onClick={handleConfirm}>Confirm</button> */}
        </div>
      )}
    </div>
  );
}

export default ExpensesList;
