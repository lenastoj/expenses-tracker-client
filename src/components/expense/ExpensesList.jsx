/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { useDebounce } from 'use-debounce';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
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
import { userSelect } from '../../store/auth/authSelector';
import ExpenseService from '../../services/expense.service';
import WeeklyExpensesTableModal from '../modal/WeeklyExpensesTableModal';
import SortFilter from './SortFilter';

function ExpensesList({
  wordFromURL,
  orderFromURL,
  sortFromURL,
  setSearchParams,
  startDateFromURL,
  endDateFromURL,
  guests,
  guestName,
  pageFromURL,
  setPageFromURL,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const expenses = useSelector(expensesSelect);
  const totalPages = useSelector(totalPagesSelect);
  const deleteInfo = useSelector(expenseDelete);
  const user = useSelector(userSelect);
  const { guestId, setGuestId } = useOutletContext();
  const searchParamsUrl = new URLSearchParams();
  const [searchWord, setSearchWord] = useState(
    { word: wordFromURL } || { word: '' },
  );
  const [debouncedSearchWord] = useDebounce(searchWord, 850);
  const [order, setOrder] = useState(orderFromURL);
  const [sort, setSort] = useState(sortFromURL);
  const [startDate, setStartDate] = useState(startDateFromURL);
  const [endDate, setEndDate] = useState(endDateFromURL);

  const formatsStringDate = (date) => {
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
    if (searchWord && searchWord.word) {
      searchParamsUrl.set('word', searchWord.word);
    }

    if (startDate && endDate) {
      if (typeof startDate === 'object' || typeof endDate === 'object') {
        searchParamsUrl.set('startDate', formatsStringDate(startDate));
        searchParamsUrl.set('endDate', formatsStringDate(endDate));
        setStartDate(formatsStringDate(startDate));
        setEndDate(formatsStringDate(endDate));
      } else if (typeof startDate === 'string' || typeof endDate === 'string') {
        searchParamsUrl.set('startDate', startDate);
        searchParamsUrl.set('endDate', endDate);
      }
    }
    if (user || guestId) {
      const hasGuest = guests.some(function (item) {
        return item.value === guestId;
      });
      if (hasGuest) {
        searchParamsUrl.set('id', guestId);
      } else if (user && user.id) {
        setGuestId(user.id);
        searchParamsUrl.set('id', user.id);
      }
    }
    setSearchParams(`?page=${pageFromURL.toString()}&${searchParamsUrl}`);

    if (
      (typeof startDate === 'string' || typeof endDate === 'string') &&
      user
    ) {
      dispatch(
        getExpenses({
          page: pageFromURL,
          id: guestId || user.id,
          word: searchWord.word,
          sort,
          order,
          startDate,
          endDate,
        }),
      );
    } else if (user) {
      dispatch(
        getExpenses({
          page: pageFromURL,
          id: guestId || user.id,
          word: searchWord.word,
          sort,
          order,
        }),
      );
    }
  }, [
    pageFromURL,
    deleteInfo,
    debouncedSearchWord,
    order,
    sort,
    endDate,
    guestId,
    user,
    pageFromURL,
  ]);

  const handleSort = (title) => {
    if (!sort) {
      setSort(title);
      setOrder('asc');
      setPageFromURL(1);
    } else if (sort === title && order === 'asc') {
      setOrder('desc');
      setPageFromURL(1);
    } else if (sort === title && order === 'desc') {
      setSort('');
      setOrder('');
      setPageFromURL(1);
    } else if (sort !== title) {
      setSort(title);
      setOrder('asc');
      setPageFromURL(1);
    }
  };
  const handleEdit = (id) => {
    navigate(`${ROUTES.EXPENSES_EDIT}/${id}`);
  };

  const handleRemove = async (id) => {
    const cookie = Cookies.get('login');
    if (!cookie) {
      navigate(ROUTES.LOGIN);
    } else {
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
    }
  };

  const handlePrint = async (week) => {
    const cookie = Cookies.get('login');

    async function getData(boolean) {
      if (boolean) {
        return ExpenseService.getWeekExpenses({ id: guestId });
      }
      return ExpenseService.getExpensesToPrint({
        id: guestId,
        word: searchWord.word,
        sort,
        order,
        startDate: startDate || null,
        endDate: endDate || null,
      });
    }

    if (!cookie) {
      navigate(ROUTES.LOGIN);
    } else {
      const {
        data,
        totalAmount,
        averagePerDayAmounts,
        startDateRange,
        endDateRange,
      } = await getData(week);
      confirmAlert({
        customUI: ({ onClose }) => {
          if (data && data.length >= 1) {
            return (
              <WeeklyExpensesTableModal
                totalAmount={totalAmount}
                onClose={onClose}
                startOfWeek={startDateRange || startDate}
                endOfWeek={endDateRange || endDate}
                data={data}
                averagePerDayAmounts={averagePerDayAmounts}
              />
            );
          }
          return (
            <ConfirmModal
              title={week ? 'This week expenses' : 'Expenses'}
              message={
                week
                  ? 'No expenses for this week'
                  : 'No expenses for this period'
              }
              onClick1={onClose}
              buttonText1="Close"
            />
          );
        },
      });
    }
  };
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPageFromURL(newPage);
    }
  };
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  return (
    <div className="container card p-3 mb-3 mt-2">
      <div className="d-flex justify-content-between">
        <h2 className="font-weight-normal">Expenses List</h2>
        {user && user.id === guestId ? (
          <h4>Hello {user.firstName}</h4>
        ) : (
          <h4>{guestName} mode</h4>
        )}
      </div>
      <SortFilter
        searchWord={searchWord.word}
        setSearchWord={setSearchWord}
        handlePrint={handlePrint}
        setCurrentPage={setPageFromURL}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      {/* eslint-disable-next-line no-nested-ternary */}
      {expenses && expenses[0] ? (
        guestId === user.id ? (
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
          <Table
            data={expenses}
            columns={expenseTableColumns(handleSort, sort, order)}
          />
        )
      ) : (
        <h4 className="mb-5 PRINT">Currently no expenses!</h4>
      )}
      {totalPages > 1 && (
        <Pagination
          totalPages={pages}
          currentPage={pageFromURL}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
  );
}

ExpensesList.propTypes = {
  wordFromURL: PropTypes.string.isRequired,
  orderFromURL: PropTypes.string.isRequired,
  sortFromURL: PropTypes.string.isRequired,
  setSearchParams: PropTypes.func.isRequired,
  startDateFromURL: PropTypes.string.isRequired,
  endDateFromURL: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  guests: PropTypes.array.isRequired,
  guestName: PropTypes.string,
  pageFromURL: PropTypes.number.isRequired,
  setPageFromURL: PropTypes.func.isRequired,
};
ExpensesList.defaultProps = {
  guestName: undefined,
};
export default ExpensesList;
