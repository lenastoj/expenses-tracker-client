/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

function Input({
  id,
  name,
  label,
  type,
  errors,
  register,
  rules,
  ...inputProps
}) {
  return (
    <div className="mb-3">
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
        </label>
      )}
      {register ? (
        <input
          className="form-control"
          id={id}
          type={type}
          {...register(name, rules)}
          {...inputProps}
        />
      ) : (
        <input className="form-control" id={id} type={type} {...inputProps} />
      )}
      {errors && errors[name] && (
        <p className="text-danger">{errors[name].message}</p>
      )}
    </div>
  );
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  errors: PropTypes.object,
  type: PropTypes.string.isRequired,
  register: PropTypes.func,
  rules: PropTypes.object,
};

Input.defaultProps = {
  label: undefined,
  register: undefined,
  rules: undefined,
  errors: undefined,
};

export default Input;
