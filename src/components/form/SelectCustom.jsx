/* eslint-disable react/no-array-index-key,react/jsx-props-no-spreading */
/* eslint-disable react/forbid-prop-types,react/no-array-index-key */

import React from 'react';
import PropTypes from 'prop-types';

function SelectCustom({
  label,
  options,
  classSelect,
  selected,
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
        >
          {label && <option value="">{label}</option>}
          {options.map((item, index) => (
            <option
              key={index}
              value={item.toLowerCase()}
              // selected={selected === item.toLowerCase()}
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
            <option
              key={key}
              value={key}
              selected={selected === key.toLowerCase()}
            >
              {options[key]}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

SelectCustom.propTypes = {
  label: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  classSelect: PropTypes.string,
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
SelectCustom.defaultProps = {
  classSelect: 'form-select',
  selected: undefined,
  label: undefined,
};
export default SelectCustom;
