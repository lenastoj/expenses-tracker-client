/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';

function Pagination({ totalPages, currentPage, setCurrentPage }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromURL = Number(searchParams.get('page')) || 1;

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    if (pageFromURL <= totalPages) {
      setCurrentPage(pageFromURL);
    }
  }, []);

  useEffect(() => {
    const params = currentPage.toString();
    setSearchParams(`?page=${params}`);
  }, [currentPage]);

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination flex-row justify-content-center">
        <li className={currentPage === 1 ? 'page-item disabled' : 'page-item'}>
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
        </li>
        {pages.map((page) => (
          <li
            className={page === currentPage ? 'page-item active' : 'page-item'}
            key={page}
          >
            <button
              className="page-link"
              onClick={() => setCurrentPage(page)}
              key={page}
            >
              {page}
            </button>
          </li>
        ))}
        <li
          className={
            currentPage === totalPages ? 'page-item disabled' : 'page-item'
          }
        >
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default Pagination;
