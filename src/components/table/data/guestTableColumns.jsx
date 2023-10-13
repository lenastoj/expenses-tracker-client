import React from 'react';
import Button from '../../form/Button';

const guestTableColumns = (handleRemove, handleSort, sort, sortDirection) => {
  return [
    {
      title: (
        <Button
          text={
            sort === 'firstName' ? `First name ${sortDirection}` : 'First name'
          }
          type="button"
          classButton="btn p-0"
          onClick={() => handleSort('firstName')}
          style={{ fontWeight: 'bold' }}
        />
      ),
      render: (rowData) => {
        return <span>{rowData.firstName}</span>;
      },
    },
    {
      title: (
        <Button
          text={
            sort === 'lastName' ? `Last name ${sortDirection}` : 'Last name'
          }
          type="button"
          classButton="btn p-0"
          onClick={() => handleSort('lastName')}
          style={{ fontWeight: 'bold' }}
        />
      ),
      render: (rowData) => {
        return <span>{rowData.lastName}</span>;
      },
    },
    {
      title: (
        <Button
          text={sort === 'email' ? `Email ${sortDirection}` : 'Email'}
          type="button"
          classButton="btn p-0"
          onClick={() => handleSort('email')}
          style={{ fontWeight: 'bold' }}
        />
      ),
      render: (rowData) => {
        return <span>{rowData.email}</span>;
      },
    },
    {
      title: 'Remove',
      render: (rowData) => {
        return (
          <Button
            type="button"
            classButton="btn btn-outline-danger"
            text="Remove"
            onClick={() => handleRemove(rowData.id)}
          />
        );
      },
    },
  ];
};

export default guestTableColumns;
