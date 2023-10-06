/* eslint-disable react/no-array-index-key,react/jsx-props-no-spreading */
/* eslint-disable react/forbid-prop-types,react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';

function Select({
  label,
  options,
  classSelect,
  selected,
  change,
  ...selectProps
}) {
  return (
    <div>
      {Array.isArray(options) ? (
        <select
          className={classSelect}
          aria-label="Default select example"
          {...selectProps}
          value={selected}
          onChange={({ target }) => change(Number(target.value))}
        >
          {label && <option value="">{label}</option>}
          {options.map((item, index) => (
            <option
              key={index}
              value={typeof item === 'string' ? item.toLowerCase() : item}
            >
              {item}
            </option>
          ))}
          )
        </select>
      ) : (
        <select
          className={classSelect}
          aria-label="Default select example"
          {...selectProps}
        >
          {label && <option value="">{label}</option>}
          {Object.keys(options).map((key) => (
            <option key={key.id} value={key.id} selected={selected}>
              {options[key.id]}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

Select.propTypes = {
  label: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  classSelect: PropTypes.string,
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  change: PropTypes.func,
};
Select.defaultProps = {
  classSelect: 'form-select',
  selected: undefined,
  label: undefined,
  change: undefined,
};
export default Select;
