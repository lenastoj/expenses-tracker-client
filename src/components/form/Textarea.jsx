/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';

function Textarea({ id, name, label, errors, register, rules, ...inputProps }) {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <textarea
        className="form-control"
        id="description"
        {...register(name, rules)}
        {...inputProps}
      />
      {errors && errors[name] && (
        <p className="text-danger">{errors[name].message}</p>
      )}
    </div>
  );
}

Textarea.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  register: PropTypes.func,
  rules: PropTypes.object,
};

Textarea.defaultProps = {
  register: undefined,
  rules: undefined,
};
export default Textarea;
