/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import {
  expensesSelect,
  expenseDelete,
  totalPagesSelect,
} from '../../store/expense/expenseSelector';
import { deleteExpense, getExpenses } from '../../store/expense/expenseSlice';
import Table from '../table/Table';
import { ROUTES } from '../../utils/static';
import expenseTableColumns from './expenseTableColumns';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Pagination from '../Pagination';
import ConfirmModal from '../modal/ConfirmModal';
import userSelect from '../../store/auth/authSelector';
import SortFilter from './SortFilter';
import { useDebounce } from 'use-debounce';
import ExpenseService from '../../services/expense.service';
import WeeklyExpensesTableModal from '../modal/WeeklyExpensesTableModal';

function ExpensesList({
  pageFromURL,
  wordFromURL,
  monthFromURL,
  orderFromURL,
  sortFromURL,
  setSearchParams,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const expenses = useSelector(expensesSelect);
  const totalPages = useSelector(totalPagesSelect);
  const deleteInfo = useSelector(expenseDelete);
  const user = useSelector(userSelect);
  const searchParamsUrl = new URLSearchParams();

  const [currentPage, setCurrentPage] = useState(pageFromURL);
  const [searchWord, setSearchWord] = useState(
    { word: wordFromURL } || { word: '' },
  );
  const [debouncedSearchWord] = useDebounce(searchWord, 850);
  const [selectedMonths, setSelectedMonths] = useState(monthFromURL);
  const [debouncedSelectedMonths] = useDebounce(selectedMonths, 850);
  const [order, setOrder] = useState(orderFromURL);
  const [sort, setSort] = useState(sortFromURL);

  useEffect(() => {
    if (sort && order) {
      searchParamsUrl.set('sort', sort);
      searchParamsUrl.set('order', order);
    }
    searchWord &&
      searchWord.word &&
      searchParamsUrl.set('word', searchWord.word);
    selectedMonths && searchParamsUrl.set('month', selectedMonths);
    setSearchParams(`?page=${currentPage.toString()}&${searchParamsUrl}`);

    dispatch(
      getExpenses({
        page: currentPage,
        word: searchWord.word,
        sort: sort,
        order: order,
        month: selectedMonths,
      }),
    );
  }, [
    currentPage,
    deleteInfo,
    debouncedSearchWord,
    debouncedSelectedMonths,
    order,
    sort,
  ]);

  const handleSort = (title) => {
    if (!sort) {
      setSort(title);
      setOrder('asc');
      setCurrentPage(1);
    } else if (sort === title && order === 'asc') {
      setOrder('desc');
      setCurrentPage(1);
    } else if (sort === title && order === 'desc') {
      setSort('');
      setOrder('');
      setCurrentPage(1);
    } else if (sort !== title) {
      setSort(title);
      setOrder('asc');
      setCurrentPage(1);
    }
  };
  const handleEdit = (id) => {
    navigate(`${ROUTES.EXPENSES_EDIT}/${id}`);
  };

  const handleRemove = async (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <ConfirmModal
            title="Confirm Delete"
            message="Are you sure you want to delete this expense?"
            onClick1={onClose}
            onClick2={() => {
              dispatch(deleteExpense(id));
              onClose();
            }}
          />
        );
      },
    });
  };

  const handleWeekExpenses = async () => {
    const { data, totalAmount, averagePerDayAmounts, startOfWeek, endOfWeek } =
      await ExpenseService.getWeekExpenses();
    confirmAlert({
      customUI: ({ onClose }) => {
        if (data.length > 1) {
          return (
            <WeeklyExpensesTableModal
              totalAmount={totalAmount}
              onClose={onClose}
              startOfWeek={startOfWeek}
              endOfWeek={endOfWeek}
              data={data}
              averagePerDayAmounts={averagePerDayAmounts}
            />
          );
        } else {
          return (
            <ConfirmModal
              title="This week expenses"
              message="No expenses for this week"
              onClick1={onClose}
              buttonText1="Close"
            />
          );
        }
      },
    });
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  return (
    <div className="container card p-3 mb-3 mt-5">
      <div className="d-flex justify-content-between">
        <h2 className="font-weight-normal">Expenses List</h2>
        {user && <h4>Hello {user.firstName}</h4>}
      </div>
      <SortFilter
        setSelectedMonths={setSelectedMonths}
        searchWord={searchWord.word}
        setSearchWord={setSearchWord}
        selectedMonths={selectedMonths}
        weekExpenses={handleWeekExpenses}
        setCurrentPage={setCurrentPage}
      />
      {expenses && expenses[0] ? (
        <Table
          data={expenses}
          columns={expenseTableColumns(
            handleEdit,
            handleRemove,
            handleSort,
            sort,
            order,
          )}
        />
      ) : (
        <h4 className="mb-5 PRINT">Currently no expenses!</h4>
      )}
      {totalPages > 1 && (
        <Pagination
          totalPages={pages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default ExpensesList;
