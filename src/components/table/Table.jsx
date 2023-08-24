/* eslint-disable react/forbid-prop-types,react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';

function Table({ data, columns, tableClassName }) {
  return (
    <table className={`table ${tableClassName}`}>
      <thead>
        <tr>
          {columns.map((headerItem) => (
            <th scope="col" key={headerItem.title}>
              {headerItem.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map((col, index) => (
              <td key={index}>{col.render(item)} </td>
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
// function Table({
//   expenses,
//   headers,
//   tableClassName,
//   edit,
//   remove,
//   handleRemove,
//   handleEdit,
// }) {
//   return (
//     <table className={`table ${tableClassName}`}>
//       <thead>
//         <tr>
//           {headers &&
//             headers.map((header) => (
//               <th scope="col" key={header}>
//                 {header}
//               </th>
//             ))}
//           {edit && <th>Edit</th>}
//           {remove && <th>Delete</th>}
//         </tr>
//       </thead>
//       <tbody>
//         {expenses &&
//           headers &&
//           expenses.map((expense) => (
//             <tr key={expense.id}>
//               {headers.map((header) => (
//                 <td key={header}>
//                   {expense[header] ? (
//                     expense[header]
//                   ) : (
//                     <span className="text-secondary">/</span>
//                   )}
//                 </td>
//               ))}
//               {edit && (
//                 <td>
//                   <Button
//                     type="button"
//                     classButton="btn-outline-primary"
//                     text="Edit"
//                     onClick={() => handleEdit(expense.id)}
//                   />
//                 </td>
//               )}
//               {remove && (
//                 <td>
//                   <Button
//                     type="button"
//                     classButton="btn-outline-danger"
//                     text="Delete"
//                     onClick={() => handleRemove(expense.id)}
//                   />
//                 </td>
//               )}
//             </tr>
//           ))}
//       </tbody>
//     </table>
//   );
// }
//
// Table.propTypes = {
//   expenses: PropTypes.array.isRequired,
//   headers: PropTypes.array.isRequired,
//   tableClassName: PropTypes.string,
//   edit: PropTypes.bool,
//   remove: PropTypes.bool,
//   handleEdit: PropTypes.func,
//   handleRemove: PropTypes.func,
// };
//
// Table.defaultProps = {
//   tableClassName: 'table-bordered',
//   edit: true,
//   remove: true,
//   handleEdit: undefined,
//   handleRemove: undefined,
// };

export default Table;
