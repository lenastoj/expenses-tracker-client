/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from 'use-debounce';
import { confirmAlert } from 'react-confirm-alert';
import useAuthGuard from '../hooks/useAuthGuard';
import Table from '../components/table/Table';
import expenseTableColumns from '../components/expense/expenseTableColumns';
import Pagination from '../components/Pagination';
import {
  expenseDelete,
  expensesSelect,
  totalPagesSelect,
} from '../store/expense/expenseSelector';
import userSelect from '../store/auth/authSelector';
import { deleteExpense, getExpenses } from '../store/expense/expenseSlice';
import { ROUTES } from '../utils/static';
import ConfirmModal from '../components/modal/ConfirmModal';
import ExpenseService from '../services/expense.service';
import WeeklyExpensesTableModal from '../components/modal/WeeklyExpensesTableModal';
import SortFilterCalendar from '../components/expense/SortFilterCalendar';

function ExpensesPrint() {
  useAuthGuard(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const queryString = {
    pageFromURL: Number(searchParams.get('page')) || 1,
    wordFromURL: searchParams.get('word') || '',
    orderFromURL: searchParams.get('order') || '',
    sortFromURL: searchParams.get('sort') || '',
    startDateFromURL: searchParams.get('startDate') || '',
    endDateFromURL: searchParams.get('endDate') || '',
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const expenses = useSelector(expensesSelect);
  const totalPages = useSelector(totalPagesSelect);
  const deleteInfo = useSelector(expenseDelete);
  const user = useSelector(userSelect);
  const searchParamsUrl = new URLSearchParams();

  const [currentPage, setCurrentPage] = useState(queryString.pageFromURL);
  const [searchWord, setSearchWord] = useState(
    { word: queryString.wordFromURL } || { word: '' },
  );
  const [debouncedSearchWord] = useDebounce(searchWord, 850);
  const [selectedMonths, setSelectedMonths] = useState(
    queryString.monthFromURL,
  );
  const [order, setOrder] = useState(queryString.orderFromURL);
  const [sort, setSort] = useState(queryString.sortFromURL);
  const [startDate, setStartDate] = useState(queryString.startDateFromURL);
  const [endDate, setEndDate] = useState(queryString.endDateFromURL);

  const formatsDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (sort && order) {
      searchParamsUrl.set('sort', sort);
      searchParamsUrl.set('order', order);
    }
    searchWord &&
      searchWord.word &&
      searchParamsUrl.set('word', searchWord.word);
    selectedMonths && searchParamsUrl.set('month', selectedMonths);

    if (startDate && endDate) {
      if (typeof startDate === 'object' || typeof endDate === 'object') {
        searchParamsUrl.set('startDate', formatsDate(startDate));
        searchParamsUrl.set('endDate', formatsDate(endDate));
      } else {
        searchParamsUrl.set('startDate', startDate);
        searchParamsUrl.set('endDate', endDate);
      }
    }
    setSearchParams(`?page=${currentPage.toString()}&${searchParamsUrl}`);

    dispatch(
      getExpenses({
        page: currentPage,
        word: searchWord.word,
        sort,
        order,
        startDate: startDate,
        endDate: endDate,
      }),
    );
  }, [currentPage, deleteInfo, debouncedSearchWord, order, sort, endDate]);

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
      await ExpenseService.getExpensesToPrint({
        word: searchWord.word,
        sort,
        order,
        startDate: startDate ? formatsDate(startDate) : null,
        endDate: endDate ? formatsDate(endDate) : null,
      });
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
        }
        return (
          <ConfirmModal
            title="This week expenses"
            message="No expenses for this week"
            onClick1={onClose}
            buttonText1="Close"
          />
        );
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
      <SortFilterCalendar
        searchWord={searchWord.word}
        setSearchWord={setSearchWord}
        weekExpenses={handleWeekExpenses}
        setCurrentPage={setCurrentPage}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
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

export default ExpensesPrint;
