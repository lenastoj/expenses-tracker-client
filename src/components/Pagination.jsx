/* eslint-disable react/no-array-index-key,react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

function Pagination({ totalPages, currentPage, handlePageChange }) {
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
        {totalPages.length > 1 &&
          totalPages.map((page) => (
            <li
              className={
                page === currentPage ? 'page-item active' : 'page-item'
              }
              key={page}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(page)}
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
  totalPages: PropTypes.array.isRequired,
  currentPage: PropTypes.number,
  handlePageChange: PropTypes.func.isRequired,
};
Pagination.defaultProps = {
  currentPage: 1,
};

export default Pagination;
