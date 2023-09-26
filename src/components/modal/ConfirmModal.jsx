/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Button from '../form/Button';

function ConfirmModal({
  title,
  message,
  buttonText1,
  buttonText2,
  onClick1,
  onClick2,
  children,
}) {
  return (
    <div className="card p-3 w-75 m-auto">
      <div className="PRINT">
        <h4>{title}</h4>
        <p>{message}</p>
        {children}
      </div>
      <div className="d-flex col gap-3 justify-content-center NO-PRINT">
        <Button
          text={buttonText1}
          onClick={() => {
            onClick1();
          }}
          type="button"
          classButton="btn btn-primary w-50"
        />
        {onClick2 && (
          <Button
            text={buttonText2}
            onClick={() => {
              onClick2();
            }}
            type="button"
            classButton="btn btn-outline-secondary w-50"
          />
        )}
      </div>
    </div>
  );
}

ConfirmModal.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  buttonText1: PropTypes.string,
  buttonText2: PropTypes.string,
  onClick1: PropTypes.func.isRequired,
  onClick2: PropTypes.func,
  children: PropTypes.array,
};
ConfirmModal.defaultProps = {
  buttonText1: 'No',
  buttonText2: 'Yes',
  children: undefined,
  onClick2: undefined,
};
export default ConfirmModal;
