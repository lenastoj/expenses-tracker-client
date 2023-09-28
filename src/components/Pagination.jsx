/* eslint-disable react/no-array-index-key,react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Select from './form/Select';

const range = (start, end) => {
  return [...Array(end - start).keys()].map((el) => el + start);
};
const getPagesCut = ({ totalPages, pagesCutCount, currentPage }) => {
  const ceiling = Math.ceil(pagesCutCount / 2);
  const floor = Math.floor(pagesCutCount / 2);
  if (totalPages < pagesCutCount) {
    return { start: 1, end: totalPages + 1 };
  }
  if (currentPage >= 1 && currentPage <= ceiling) {
    return { start: 1, end: pagesCutCount + 1 };
  }
  if (currentPage + floor >= totalPages) {
    return { start: totalPages - pagesCutCount + 1, end: totalPages + 1 };
  }
  return { start: currentPage - ceiling + 1, end: currentPage + floor + 1 };
};

function Pagination({ totalPages, currentPage, handlePageChange }) {
  const pagesCut = getPagesCut({
    totalPages: totalPages.length,
    pagesCutCount: 5,
    currentPage,
  });
  const pages = range(pagesCut.start, pagesCut.end);
  return (
    <nav aria-label="Page navigation example">
      <div className="d-flex justify-content-center">
        <ul className="pagination flex-row justify-content-center">
          <li
            className={currentPage === 1 ? 'page-item disabled' : 'page-item'}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
          </li>
          {!pages.includes(1) && (
            <li
              className={currentPage === 1 ? 'page-item disabled' : 'page-item'}
            >
              <button className="page-link" onClick={() => handlePageChange(1)}>
                1
              </button>
            </li>
          )}
          {currentPage >= 4 && (
            <li className="page-link border-0">
              <span>...</span>
            </li>
          )}
          {pages.length > 1 &&
            pages.map((page) => (
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
          {currentPage + 4 <= totalPages.length + 1 && (
            <li className="page-link border-0">
              <span>...</span>
            </li>
          )}
          {!pages.includes(totalPages.length) && (
            <li
              className={
                currentPage === totalPages.length
                  ? 'page-item disabled'
                  : 'page-item'
              }
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(totalPages.length)}
              >
                {totalPages.length}
              </button>
            </li>
          )}
          <li
            className={
              currentPage === totalPages.length
                ? 'page-item disabled'
                : 'page-item'
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
        <Select
          options={totalPages}
          classSelect="form-select text-primary"
          change={handlePageChange}
          selected={currentPage}
        />
      </div>
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
