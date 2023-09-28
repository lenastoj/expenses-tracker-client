import React from 'react';
import { useSelector } from 'react-redux';
import userSelect from '../store/auth/authSelector';

function Auth() {
  const user = useSelector(userSelect);

  return (
    <div>
      <h3>Name {user ? user.firstName : ''}</h3>
    </div>
  );
}

export default Auth;
