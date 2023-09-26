import React from 'react';
import Button from '../form/Button';

const expenseTableColumns = (
  handleEdit,
  handleRemove,
  handleSort,
  sort,
  order,
) => {
  if (handleEdit && handleRemove) {
    return [
      {
        // title: 'Date',
        title: (
          <Button
            text={sort === 'date' ? `Date ${order}` : 'Date'}
            type="button"
            classButton="btn p-0"
            onClick={() => handleSort('date')}
            style={{ 'font-weight': 'bold' }}
          />
        ),
        render: (rowData) => {
          return <span>{rowData.date}</span>;
        },
      },
      {
        // title: 'Time',
        title: (
          <Button
            text={sort === 'time' ? `Time ${order}` : 'Time'}
            type="button"
            classButton="btn p-0"
            onClick={() => handleSort('time')}
            style={{ 'font-weight': 'bold' }}
          />
        ),
        render: (rowData) => {
          return <span>{rowData.time}</span>;
        },
      },
      {
        // title: 'Description',
        title: (
          <Button
            text={
              sort === 'description' ? `Description ${order}` : 'Description'
            }
            type="button"
            classButton="btn p-0"
            onClick={() => handleSort('description')}
            style={{ 'font-weight': 'bold' }}
          />
        ),
        render: (rowData) => {
          return <span>{rowData.description}</span>;
        },
      },
      {
        // title: 'Amount',
        title: (
          <Button
            text={sort === 'amount' ? `Amount ${order}` : 'Amount'}
            type="button"
            classButton="btn p-0"
            onClick={() => handleSort('amount')}
            style={{ 'font-weight': 'bold' }}
          />
        ),
        render: (rowData) => {
          return <span>{rowData.amount}</span>;
        },
      },
      {
        // title: 'Comment',
        title: (
          <Button
            text={sort === 'comment' ? `Comment ${order}` : 'Comment'}
            type="button"
            classButton="btn p-0"
            onClick={() => handleSort('comment')}
            style={{ 'font-weight': 'bold' }}
          />
        ),
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
              classButton="btn btn-outline-primary"
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
              classButton="btn btn-outline-danger"
              text="Delete"
              onClick={() => handleRemove(rowData.id)}
            />
          );
        },
      },
    ];
  }
  return [
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
  ];
};
export default expenseTableColumns;
