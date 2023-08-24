import React from 'react';
import PropTypes from 'prop-types';
import Button from '../form/Button';

function ConfirmModal({
  title,
  message,
  buttonText1,
  buttonText2,
  onCLick1,
  onClick2,
}) {
  return (
    <div className="popup-overlay">
      <div className="card p-3 mb-3 mt-5">
        <h3>{title}</h3>
        <p>{message}</p>
        <Button
          text={buttonText1}
          onClick={() => {
            onCLick1();
          }}
          type="button"
          classButton="btn-primary mb-2"
        />
        <Button
          text={buttonText2}
          onClick={() => {
            onClick2();
          }}
          type="button"
          classButton="btn-outline-secondary"
        />
      </div>
    </div>
  );
}

ConfirmModal.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  buttonText1: PropTypes.string,
  buttonText2: PropTypes.string,
  onCLick1: PropTypes.func.isRequired,
  onClick2: PropTypes.func.isRequired,
};
ConfirmModal.defaultProps = {
  buttonText1: 'No',
  buttonText2: 'Yes',
};
export default ConfirmModal;
