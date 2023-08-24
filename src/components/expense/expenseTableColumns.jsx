import React from 'react';
import Button from '../form/Button';

const expenseTableColumns = (handleEdit, handleRemove) => {
  return [
    // {
    //   title: 'ID',
    //   render: (rowData) => {
    //     return <span>{rowData.id}</span>;
    //   },
    // },
    {
      title: 'Date',
      render: (rowData) => {
        return <span>{rowData.date}</span>;
      },
    },
    {
      title: 'Time',
      render: (rowData) => {
        return <span>{rowData.time}</span>;
      },
    },
    {
      title: 'Description',
      render: (rowData) => {
        return <span>{rowData.description}</span>;
      },
    },
    {
      title: 'Amount',
      render: (rowData) => {
        return <span>{rowData.amount}</span>;
      },
    },
    {
      title: 'Comment',
      render: (rowData) => {
        return <span>{rowData.comment}</span>;
      },
    },
    {
      title: 'Edit',
      render: (rowData) => {
        return (
          <Button
            type="button"
            classButton="btn-outline-primary"
            text="Edit"
            onClick={() => handleEdit(rowData.id)}
          />
        );
      },
    },
    {
      title: 'Delete',
      render: (rowData) => {
        return (
          <Button
            type="button"
            classButton="btn-outline-danger"
            text="Delete"
            onClick={() => handleRemove(rowData.id)}
          />
        );
      },
    },
  ];
};
export default expenseTableColumns;

// {
//   title: "Delete",
//     render;
// :
//   (rowData) => {
//     return (
//       <Button
//         type="button"
//         classButton="btn-outline-danger"
//         text="Delete"
//         onClick={() => handleRemove(rowData.id)}
//       />
//     );
//   },

// {
//   title: 'Delete',
//     render: (rowData) => {
//   return <Modal id={rowData.id} />;
// },
// },
