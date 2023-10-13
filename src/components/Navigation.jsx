import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { ROUTES } from '../utils/static';
import Button from './form/Button';
import { userSelect } from '../store/auth/authSelector';
import { getActiveUser, logout } from '../store/auth/authSlice';

function Navigation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cookie = Cookies.get('login');

  const user = useSelector(userSelect);
  if (!user) dispatch(getActiveUser());

  const [searchParams] = useSearchParams();
  const [hostId, setHostId] = useState(Number(searchParams.get('id')));
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
  return (
    <div>
      <nav className="navbar bg-body-tertiary border-bottom">
        {cookie ? (
          <div className="container-fluid d-flex justify-content-between">
            <div className="d-flex ms-5">
              <Link className="navbar-brand" to={ROUTES.EXPENSES}>
                Expenses
              </Link>
              {((user && hostId === user.id) || (user && hostId === 0)) && (
                <Link className="nav nav-link" to={ROUTES.EXPENSES_NEW}>
                  Add new expense
                </Link>
              )}
            </div>
            <div className="d-flex justify-content-between me-5">
              <Button
                text="Logout"
                classButton="btn btn-outline-danger ms-3"
                onClick={handleLogout}
              />
            </div>
          </div>
        ) : (
          <h2 className="my-1 ms-5 mr-md-auto font-weight-normal">
            Expenses Tracker App
          </h2>
        )}
      </nav>
      <div>
        <Outlet context={{ hostId, setHostId }} />
      </div>
    </div>
  );
}

export default Navigation;
