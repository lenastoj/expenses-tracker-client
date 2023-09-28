/* eslint-disable react/forbid-prop-types,react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';

function Table({ data, columns, tableClassName }) {
  return (
    <table className={`table ${tableClassName}`}>
      <thead>
        <tr>
          {columns.map((headerItem, index) => (
            <th scope="col" key={`${headerItem.title} ${index}`}>
              {headerItem.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map((col, index) => (
              <td key={index} style={{ minWidth: '100px' }}>
                {col.render(item)}{' '}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  tableClassName: PropTypes.string,
};

Table.defaultProps = {
  tableClassName: 'table-bordered',
};
export default Table;
