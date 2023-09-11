/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';

function Pagination({ totalPages, currentPage, setSearchParams }) {
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      // setCurrentPage(newPage);
      setSearchParams({ page: newPage });
    }
  };

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
              // onClick={() => setCurrentPage(page)}
              onClick={() => setSearchParams({ page })}
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
  currentPage: PropTypes.number,
  // setCurrentPage: PropTypes.func.isRequired,
  setSearchParams: PropTypes.func.isRequired,
};
Pagination.defaultProps = {
  currentPage: 1,
};

export default Pagination;
