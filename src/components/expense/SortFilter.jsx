/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import SelectCustom from '../form/SelectCustom';
import Input from '../form/Input';
import { MONTHS } from '../../utils/static';

function SortFilter({
  setSearchWord,
  searchWord,
  setSelectedMonths,
  setSort,
  setOrder,
}) {
  const [selected, setSelected] = useState(null);
  const array = [];
  const handleChange = (selectedOption) => {
    setSelected(selectedOption);
  };
  useEffect(() => {
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
      <div className="w-25 h-25">
        <h6>Select expenses by month: </h6>
        <Select
          closeMenuOnSelect={false}
          isMulti
          name="colors"
          options={MONTHS}
          className="basic-multi-select"
          classNamePrefix="select"
          // onChange={(option) => setSelectedMonths([option])
          onChange={handleChange}
        />
      </div>
      <div className="d-flex flex-column justify-content-end gap-2">
        <SelectCustom
          label="Sort by:"
          options={['Amount', 'Date']}
          onChange={(e) => setSort(e.target.value)}
        />
        <SelectCustom
          label="Order by:"
          options={['asc', 'desc']}
          onChange={(e) => setOrder(e.target.value)}
        />
        <Input
          name="word"
          type="text"
          placeholder="Search by keyword..."
          id="word"
          onChange={({ target }) =>
            setSearchWord({ ...searchWord, word: target.value })
          }
        />
      </div>
    </div>
  );
}

SortFilter.propTypes = {
  setSearchWord: PropTypes.func.isRequired,
  searchWord: PropTypes.func.isRequired,
  setSelectedMonths: PropTypes.func.isRequired,
  setSort: PropTypes.func.isRequired,
  setOrder: PropTypes.func.isRequired,
};

export default SortFilter;
