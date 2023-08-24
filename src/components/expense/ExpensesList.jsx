/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import {
  expensesSelect,
  expenseDelete,
  totalPagesSelect,
} from '../../store/expense/expenseSelector';
import { deleteExpense, getExpenses } from '../../store/expense/expenseSlice';
import Table from '../table/Table';
import ROUTES from '../../utils/static';
import expenseTableColumns from './expenseTableColumns';
import 'react-confirm-alert/src/react-confirm-alert.css';
// import Button from '../form/Button';
import Pagination from '../Pagination';
import ConfirmModal from '../modal/ConfirmModal';

function ExpensesList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const expenses = useSelector(expensesSelect);
  const totalPages = useSelector(totalPagesSelect);
  const deleteInfo = useSelector(expenseDelete);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getExpenses(currentPage));
  }, [deleteInfo, currentPage]);

  const handleEdit = (id) => {
    navigate(`${ROUTES.EXPENSES_EDIT}/${id}`);
  };
  const handleRemove = async (id) => {
    confirmAlert({
      // eslint-disable-next-line react/no-unstable-nested-components
      customUI: ({ onClose }) => {
        return (
          <ConfirmModal
            title="Confirm Delete"
            message="Are you sure you want to delete this expense?"
            onCLick1={onClose}
            onClick2={() => {
              dispatch(deleteExpense(id));
              onClose();
            }}
          />
        );
      },
    });
  };
  return (
    <div>
      <h2 className="my-0 mr-md-auto font-weight-normal pb-3">Expenses List</h2>
      {expenses && expenses[0] ? (
        <Table
          data={expenses}
          columns={expenseTableColumns(handleEdit, handleRemove)}
        />
      ) : (
        <h4 className="mb-5">Currently no expenses!</h4>
      )}
      <Link to={ROUTES.EXPENSES_NEW}>Add new expense</Link>
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}

export default ExpensesList;
