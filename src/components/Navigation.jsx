import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTES } from '../utils/static';
import Button from './form/Button';
import userSelect from '../store/auth/authSelector';
import { getActiveUser, logout } from '../store/auth/authSlice';

function Navigation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      dispatch(
        logout({
          meta: {
            onSuccess: () => {
              navigate(ROUTES.LOGIN);
            },
          },
        }),
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(getActiveUser());
  }, []);

  const user = useSelector(userSelect);
  return (
    <div>
      <nav className="navbar bg-body-tertiary border-bottom">
        {user ? (
          <div className="container-fluid">
            <div className="d-flex ms-3">
              <Link className="navbar-brand" to={ROUTES.EXPENSES}>
                Expenses
              </Link>
              <Link className="nav nav-link" to={ROUTES.EXPENSES_NEW}>
                Add new expense
              </Link>
            </div>
            <Button
              text="Logout"
              classButton="btn-outline-danger"
              onClick={handleLogout}
            />
          </div>
        ) : (
          <h2 className="my-1 ms-5 mr-md-auto font-weight-normal">
            Expenses Tracker App
          </h2>
        )}
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Navigation;
