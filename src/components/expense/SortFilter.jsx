/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import Input from '../form/Input';
import Button from '../form/Button';
import 'react-datepicker/dist/react-datepicker.css';

function SortFilter({
  setSearchWord,
  searchWord,
  handlePrint,
  setCurrentPage,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) {
  const convertToDate = (date) => {
    if (date && typeof date === 'string') {
      const dateSplit = date.split('-');
      return new Date(dateSplit[0], dateSplit[1] - 1, dateSplit[2]);
    }
    return date;
  };
  const showStartDate = convertToDate(startDate);
  const showEndDate = convertToDate(endDate);

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDateRange, setStartDateRange] = useState(
    showStartDate || dateRange[0],
  );
  const [endDateRange, setEndDateRange] = useState(showEndDate || dateRange[1]);

  const changeDateRange = (value) => {
    setDateRange(value);
    setStartDate(value[0]);
    setStartDateRange(value[0]);
    setEndDate(value[1]);
    setEndDateRange(value[1]);
    if (value[1]) {
      setCurrentPage(1);
    }
  };

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
          text="Expenses for current week"
          onClick={() => handlePrint(true)}
          classButton="btn btn-primary mb-3"
        />
        <Button
          text="Print expenses"
          onClick={() => handlePrint(false)}
          classButton="btn btn-primary mb-3"
        />
      </div>
    </div>
  );
}

SortFilter.propTypes = {
  setSearchWord: PropTypes.func.isRequired,
  searchWord: PropTypes.string,
  handlePrint: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  startDate: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  setStartDate: PropTypes.func.isRequired,
  endDate: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  setEndDate: PropTypes.func.isRequired,
};
SortFilter.defaultProps = {
  searchWord: undefined,
  endDate: null,
  startDate: null,
};

export default SortFilter;
