import { call, put, takeLatest } from 'redux-saga/effects';
import expenseService from '../../services/expense.service';
import { setDeleteInfo, setExpense, setExpenses } from './expenseSlice';

function* getExpensesHandler(action) {
  try {
    const expenses = yield call(expenseService.getAll, action.payload);
    yield put(setExpenses(expenses));
  } catch (e) {
    console.log(e);
  }
}

function* getExpenseHandler(action) {
  try {
    const expense = yield call(expenseService.get, action.payload);
    yield put(setExpense(expense));
  } catch (e) {
    console.log(e);
  }
}

function* deleteExpenseHandler(action) {
  yield put(setDeleteInfo(false));
  try {
    yield call(expenseService.delete, action.payload);
    yield put(setDeleteInfo(true));
  } catch (e) {
    console.log(e);
  }
}

export function* watchGetExpenses() {
  yield takeLatest('expense/getExpenses', getExpensesHandler);
}

export function* watchGetExpense() {
  yield takeLatest('expense/getExpense', getExpenseHandler);
}

export function* watchDeleteExpense() {
  yield takeLatest('expense/deleteExpense', deleteExpenseHandler);
}
