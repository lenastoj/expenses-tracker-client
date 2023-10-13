/* eslint-disable react/no-unstable-nested-components */
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import Input from '../form/Input';
import Table from '../table/Table';
import guestTableColumns from '../table/data/guestTableColumns';
import ConfirmModal from '../modal/ConfirmModal';
import guestService from '../../services/guest.service';
import { getGuests } from '../../store/auth/authSlice';
import {
  guestsPageSelect,
  totalPagesSelect,
} from '../../store/auth/authSelector';
import Pagination from '../Pagination';

function GuestsList() {
  const dispatch = useDispatch();
  const paginatedGuests = useSelector(guestsPageSelect);
  const totalPages = useSelector(totalPagesSelect);

  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [searchQuery, setSearchQuery] = useState(
    { word: searchParams.get('word') } || { word: '' },
  );
  const [debouncedSearchWord] = useDebounce(searchQuery, 850);
  const [sortDirection, setSortDirection] = useState(
    searchParams.get('sortDirection') || '',
  );
  const [sort, setSort] = useState(searchParams.get('sort') || '');
  const searchParamsUrl = new URLSearchParams();

  useEffect(() => {
    if (sort && sortDirection) {
      searchParamsUrl.set('sort', sort);
      searchParamsUrl.set('sortDirection', sortDirection);
    }
    if (searchQuery && searchQuery.word) {
      searchParamsUrl.set('searchQuery', searchQuery.word);
    }
    setSearchParams(`?page=${page.toString()}&${searchParamsUrl}`);

    dispatch(
      getGuests({
        page,
        searchQuery: searchQuery.word,
        sort,
        sortDirection,
      }),
    );
  }, [page, debouncedSearchWord, sortDirection, sort]);

  const handleRemove = async (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <ConfirmModal
            title="Confirm Remove user from Guests list"
            message="Are you sure you want to remove user?"
            onClick1={onClose}
            onClick2={async () => {
              await guestService.deleteGuest(id);
              dispatch(getGuests({ page }));
              onClose();
            }}
          />
        );
      },
    });
  };

  const handleSort = (title) => {
    if (!sort) {
      setSort(title);
      setSortDirection('asc');
      setPage(1);
    } else if (sort === title && sortDirection === 'asc') {
      setSortDirection('desc');
      setPage(1);
    } else if (sort === title && sortDirection === 'desc') {
      setSort('');
      setSortDirection('');
      setPage(1);
    } else if (sort !== title) {
      setSort(title);
      setSortDirection('asc');
      setPage(1);
    }
  };
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  return (
    <div className="p-3">
      <h5 className="mr-md-auto font-weight-normal pt-2">Your Guests</h5>
      <div>
        <p className="m-0">Search for guest:</p>
        <Input
          name="word"
          type="text"
          placeholder="keyword..."
          id="word"
          value={searchQuery.word || ''}
          onChange={({ target }) => {
            setSearchQuery({ ...searchQuery, word: target.value });
            setPage(1);
          }}
        />
      </div>
      {paginatedGuests && paginatedGuests[0] ? (
        <Table
          data={paginatedGuests}
          columns={guestTableColumns(
            handleRemove,
            handleSort,
            sort,
            sortDirection,
          )}
        />
      ) : (
        <p>You currently do not have any guests.</p>
      )}
      {totalPages > 1 && (
        <Pagination
          totalPages={pages}
          currentPage={page}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default GuestsList;
