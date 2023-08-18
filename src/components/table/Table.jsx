/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Button from '../form/Button';

function Table({
  expenses,
  headers,
  tableClassName,
  edit,
  remove,
  handleRemove,
  handleEdit,
}) {
  return (
    <table className={`table ${tableClassName}`}>
      <thead>
        <tr>
          {headers &&
            headers.map((header) => (
              <th scope="col" key={header}>
                {header}
              </th>
            ))}
          {edit && <th>Edit</th>}
          {remove && <th>Delete</th>}
        </tr>
      </thead>
      <tbody>
        {expenses &&
          headers &&
          expenses.map((expense) => (
            <tr key={expense.id}>
              {headers.map((header) => (
                <td key={header}>
                  {expense[header] ? (
                    expense[header]
                  ) : (
                    <span className="text-secondary">/</span>
                  )}
                </td>
              ))}
              {edit && (
                <td>
                  <Button
                    type="button"
                    classButton="btn-outline-primary"
                    text="Edit"
                    onClick={() => handleEdit(expense.id)}
                  />
                </td>
              )}
              {remove && (
                <td>
                  <Button
                    type="button"
                    classButton="btn-outline-danger"
                    text="Delete"
                    onClick={() => handleRemove()}
                  />
                </td>
              )}
            </tr>
          ))}
      </tbody>
    </table>
  );
}

Table.propTypes = {
  expenses: PropTypes.array.isRequired,
  headers: PropTypes.array.isRequired,
  tableClassName: PropTypes.string,
  edit: PropTypes.bool,
  remove: PropTypes.bool,
  handleEdit: PropTypes.func,
  handleRemove: PropTypes.func,
};

Table.defaultProps = {
  tableClassName: 'table-bordered',
  edit: true,
  remove: true,
  handleEdit: undefined,
  handleRemove: undefined,
};

export default Table;
