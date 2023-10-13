/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Button from '../form/Button';
import printTablePdf from '../../utils/helpers/printTablePdf';
import Table from '../table/Table';
import expenseTableColumns from '../table/data/expenseTableColumns';

function WeeklyExpensesTableModal({
  onClose,
  startOfWeek,
  endOfWeek,
  totalAmount,
  averagePerDayAmounts,
  data,
}) {
  return (
    <div
      className="card ps-3 w-75 m-auto modalPdf border-1"
      style={{ maxHeight: '800px', overflow: 'auto' }}
    >
      <div className="ps-2 pt-3 pb-3 sticky-top bg-white">
        <Button
          type="button"
          text="Print"
          onClick={() => {
            printTablePdf();
            onClose();
          }}
          classButton="btn btn-primary noPrint me-1"
        />
        <Button
          type="button"
          text="Cancle"
          onClick={onClose}
          classButton="btn btn-secondary noPrint"
        />
      </div>
      <div className="printPdf p-2">
        {startOfWeek ? (
          <h4 className="text">
            Expenses
            {startOfWeek === endOfWeek
              ? ` for ${startOfWeek}`
              : ` from ${startOfWeek} to ${endOfWeek}`}
          </h4>
        ) : (
          <h4>All Expenses</h4>
        )}
        <p className="mb-1 text">Total amount spent: {totalAmount}</p>
        <p className="text">Average per day: {averagePerDayAmounts}</p>
        <Table data={data} columns={expenseTableColumns()} />
      </div>
    </div>
  );
}

WeeklyExpensesTableModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  startOfWeek: PropTypes.string,
  endOfWeek: PropTypes.string,
  totalAmount: PropTypes.number.isRequired,
  averagePerDayAmounts: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
};
WeeklyExpensesTableModal.defaultProps = {
  startOfWeek: null,
  endOfWeek: null,
};

export default WeeklyExpensesTableModal;
