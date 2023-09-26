/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

function Button({ type, classButton, text, onClick, ...buttonProps }) {
  return (
    <button
      type={type}
      className={classButton}
      onClick={onClick}
      {...buttonProps}
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.oneOf(['submit', 'button', 'reset']),
  classButton: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'submit',
  classButton: 'btn btn-primary',
  text: 'Submit',
  onClick: undefined,
};

export default Button;
