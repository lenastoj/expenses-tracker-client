import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ROUTES from './utils/static';
import ExpenseCreate from './pages/ExpenseCreate';
import Expenses from './pages/Expenses';
import ExpenseUpdate from './pages/ExpenseUpdate';

function AppRoutes() {
  return (
    <Routes>
      <Route
        path={ROUTES.HOME}
        element={<Navigate to={ROUTES.EXPENSES} replace />}
      />
      <Route path={ROUTES.EXPENSES} element={<Expenses />} />
      <Route path={ROUTES.EXPENSES_NEW} element={<ExpenseCreate />} />
      <Route path={ROUTES.EXPENSES_EDIT_ID} element={<ExpenseUpdate />} />
      <Route
        path="*"
        element={<h3 className="container mt-5">Page not found</h3>}
      />
    </Routes>
  );
}

export default AppRoutes;
