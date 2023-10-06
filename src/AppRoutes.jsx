import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ExpenseCreate from './pages/ExpenseCreate';
import ExpenseUpdate from './pages/ExpenseUpdate';
import Login from './pages/Login';
import Navigation from './components/Navigation';
import Auth from './pages/Auth';
import { ROUTES } from './utils/static';
import Expenses from './pages/Expenses';
import AddGuest from './pages/AddGuest';

function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Navigation />}>
        <Route
          path={ROUTES.HOME}
          element={<Navigate to={ROUTES.EXPENSES} replace />}
        />
        <Route path={ROUTES.EXPENSES} element={<Expenses />} />
        <Route path={ROUTES.EXPENSES_NEW} element={<ExpenseCreate />} />
        <Route path={ROUTES.EXPENSES_EDIT_ID} element={<ExpenseUpdate />} />
        <Route path="/auth" element={<Auth />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.GUEST} element={<AddGuest />} />
      </Route>
      <Route
        path="*"
        element={<h3 className="container mt-5">Page not found</h3>}
      />
    </Routes>
  );
}

export default AppRoutes;
