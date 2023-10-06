/* eslint-disable react/jsx-props-no-spreading,react/destructuring-assignment,react/prop-types */
import Select, { components } from 'react-select';
import React from 'react';
import { useDispatch } from 'react-redux';
import Button from './Button';
import guestService from '../../services/guest.service';
import { getActiveUser } from '../../store/auth/authSlice';

function Option(props) {
  const dispatch = useDispatch();
  const removeGuest = async (value) => {
    await guestService.delete(value);
    dispatch(getActiveUser());
  };
  return (
    <components.Option {...props}>
      <div className="d-flex justify-content-between">
        <div>{props.children}</div>
        <Button
          text="x"
          onClick={(e) => {
            e.stopPropagation();
            removeGuest(props.value);
          }}
          classButton="btn btn-outline-danger"
        />
      </div>
    </components.Option>
  );
}
function SelectDelete({ guests, setGuest }) {
  return (
    <Select
      closeMenuOnSelect={false}
      name="guests"
      options={guests}
      components={{ Option }}
      className="basic-single"
      placeholder="See expenses of other users..."
      classNamePrefix="select"
      onChange={(option) => setGuest(option.value, option.label)}
      styles={{
        control: (provided) => ({
          ...provided,
          width: '300px',
        }),
      }}
    />
  );
}
export default SelectDelete;
