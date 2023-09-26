/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import Input from '../form/Input';
import Button from '../form/Button';
import 'react-datepicker/dist/react-datepicker.css';

function SortFilterCalendar({
  setSearchWord,
  searchWord,
  weekExpenses,
  setCurrentPage,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) {
  const convertToDate = (date) => {
    if (date && typeof date === 'string') {
      const dateSplit = date.split('-');
      return new Date(...dateSplit);
    }
    return null;
  };
  const showStartDate = convertToDate(startDate);
  const showEndDate = convertToDate(endDate);

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDateRange, setStartDateRange] = useState(
    showStartDate || dateRange[0],
  );
  const [endDateRange, setEndDateRange] = useState(showEndDate || dateRange[1]);

  console.log(showStartDate, showEndDate);
  const changeDateRange = (value) => {
    setDateRange(value);
    setStartDate(value[0]);
    setStartDateRange(value[0]);
    setEndDate(value[1]);
    setEndDateRange(value[1]);
  };
  console.log(dateRange, startDate, endDate);
  return (
    <div className="d-flex justify-content-between py-2 gap-2">
      <div className="w-50 h-25 d-flex flex-column gap-2">
        <div>
          <h6>Find by date range:</h6>
          <DatePicker
            selectsRange
            startDate={startDateRange}
            endDate={endDateRange}
            dateFormat="yyyy/MM/dd"
            onChange={(input) => {
              changeDateRange(input);
            }}
            isClearable
          />
        </div>
        <div>
          <h6>Find by description or comment:</h6>
          <Input
            name="word"
            type="text"
            placeholder="Search by keyword..."
            id="word"
            value={searchWord}
            onChange={({ target }) => {
              setSearchWord({ ...searchWord, word: target.value });
              setCurrentPage(1);
            }}
          />
        </div>
      </div>
      <div className="d-flex flex-column justify-content-end gap-2">
        <Button
          text="Print expenses: "
          onClick={() => weekExpenses()}
          classButton="btn btn-primary mb-3"
        />
      </div>
    </div>
  );
}

SortFilterCalendar.propTypes = {
  setSearchWord: PropTypes.func.isRequired,
  searchWord: PropTypes.string,
  weekExpenses: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  startDate: PropTypes.string.isRequired,
  setStartDate: PropTypes.func.isRequired,
  endDate: PropTypes.string.isRequired,
  setEndDate: PropTypes.func.isRequired,
};
SortFilterCalendar.defaultProps = {
  searchWord: undefined,
};

export default SortFilterCalendar;
