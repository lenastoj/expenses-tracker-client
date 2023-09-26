/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
// import SelectCustom from '../form/SelectCustom';

import Input from '../form/Input';
import { MONTHS } from '../../utils/static';
import Button from '../form/Button';

function SortFilter({
  setSearchWord,
  searchWord,
  setSelectedMonths,
  selectedMonths,
  weekExpenses,
  setCurrentPage,
}) {
  const [selected, setSelected] = useState(null);
  const [valuesToFind] = useState(
    selectedMonths ? selectedMonths.split(',').map(Number) : 0,
  );
  const [matchingMonths] = useState(
    valuesToFind
      ? MONTHS.filter((month) => valuesToFind.includes(month.value))
      : 0,
  );

  const array = [];
  const handleChange = (selectedOption) => {
    setSelected(selectedOption);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (selectedMonths && !selected) {
      return;
    }
    if (selected && selected.length > 0) {
      selected.forEach((item) => {
        array.push(item.value);
        setSelectedMonths(array.toString());
      });
    } else {
      setSelectedMonths();
    }
  }, [selected]);
  return (
    <div className="d-flex justify-content-between py-2 gap-2">
      <div className="w-50 h-25 d-flex flex-column gap-2">
        <div>
          <h6>Find by month:</h6>
          <Select
            closeMenuOnSelect={false}
            isMulti
            name="colors"
            options={MONTHS}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleChange}
            defaultValue={matchingMonths}
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
          text="Get expenses for current week"
          onClick={() => weekExpenses()}
          classButton="btn btn-primary mb-3"
        />
      </div>
    </div>
  );
}

SortFilter.propTypes = {
  setSearchWord: PropTypes.func.isRequired,
  searchWord: PropTypes.string,
  setSelectedMonths: PropTypes.func.isRequired,
  selectedMonths: PropTypes.string,
  weekExpenses: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};
SortFilter.defaultProps = {
  selectedMonths: undefined,
  searchWord: undefined,
};

export default SortFilter;
