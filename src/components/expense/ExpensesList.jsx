/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
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

function ExpensesList() {
  // const [searchParams, setSearchParams] = useSearchParams();
  // const wordFromURL = searchParams.get('word') || '';
  // const amountFromURL = searchParams.get('amount') || '';
  // const dateFromURL = searchParams.get('date') || '';
  // const monthFromURL = searchParams.get('month') || '';
  //
  // const pageFromURL = Number(searchParams.get('page') || 1);
  // const [currentPage, setCurrentPage] = useState(pageFromURL);
  //
  // const [searchWord, setSearchWord] = useState({ word: wordFromURL });
  // const [debouncedSearchWord] = useDebounce(searchWord, 850);
  // const [selectedMonths, setSelectedMonths] = useState(monthFromURL);
  // const [debouncedSelectedMonths] = useDebounce(selectedMonths, 850);
  // const [sort, setSort] = useState();
  // const [order, setOrder] = useState(amountFromURL || dateFromURL);

  const [searchParams, setSearchParams] = useSearchParams();
  const wordFromURL = searchParams.get('word') || '';
  const amountFromURL = searchParams.get('amount') || '';
  const dateFromURL = searchParams.get('date') || '';
  const monthFromURL = searchParams.get('month') || '';
  const pageFromURL = Number(searchParams.get('page') || 1);
  console.log('pageFromURL', pageFromURL);

  const [currentPage, setCurrentPage] = useState(1);

  const [searchWord, setSearchWord] = useState({ word: '' });
  const [debouncedSearchWord] = useDebounce(searchWord, 850);
  const [selectedMonths, setSelectedMonths] = useState();
  const [debouncedSelectedMonths] = useDebounce(selectedMonths, 850);
  const [sort, setSort] = useState();
  const [order, setOrder] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const expenses = useSelector(expensesSelect);
  const totalPages = useSelector(totalPagesSelect);
  const deleteInfo = useSelector(expenseDelete);
  const user = useSelector(userSelect);

  useEffect(() => {
    // setSearchParams({page: pageFromURL})

    const searchParamsUrl = new URLSearchParams();
    const params = pageFromURL.toString();
    sort && order && searchParamsUrl.set(sort, order);
    searchWord &&
      searchWord.word &&
      searchParamsUrl.set('word', searchWord.word);
    selectedMonths && searchParamsUrl.set('months', selectedMonths);
    setSearchParams(`?page=${params}&${searchParamsUrl}`);
    dispatch(
      getExpenses({
        page: pageFromURL,
        word: searchWord.word,
        sort: sort,
        order: order,
        month: selectedMonths,
      }),
    );
  }, [
    searchParams,
    deleteInfo,
    debouncedSearchWord,
    debouncedSelectedMonths,
    order,
    sort,
  ]);

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
      <div className="d-flex justify-content-between">
        <h2 className="font-weight-normal">Expenses List</h2>
        {user && <h4>Hello {user.firstName}</h4>}
      </div>
      <SortFilter
        setSort={setSort}
        setSelectedMonths={setSelectedMonths}
        searchWord={setSearchWord}
        setSearchWord={setSearchWord}
        setOrder={setOrder}
      />
      {expenses && expenses[0] ? (
        <Table
          data={expenses}
          columns={expenseTableColumns(handleEdit, handleRemove)}
        />
      ) : (
        <h4 className="mb-5">Currently no expenses!</h4>
      )}
      {totalPages > 1 && (
        // <Pagination
        //   totalPages={totalPages}
        //   currentPage={currentPage}
        //   setCurrentPage={setCurrentPage}
        // />
        <Pagination
          totalPages={totalPages}
          currentPage={pageFromURL}
          setSearchParams={setSearchParams}
        />
      )}
    </div>
  );
}

export default ExpensesList;
