import { call, put, takeLatest } from 'redux-saga/effects';
import expenseService from '../../services/expense.service';
import {
  deleteExpense,
  getExpense,
  getExpenses,
  setDeleteInfo,
  setExpense,
  setExpenses,
} from './expenseSlice';

function* getExpensesHandler() {
  try {
    const expenses = yield call(expenseService.getAll);
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
  yield takeLatest(getExpenses.type, getExpensesHandler);
}

export function* watchGetExpense() {
  yield takeLatest(getExpense.type, getExpenseHandler);
}

export function* watchDeleteExpense() {
  yield takeLatest(deleteExpense.type, deleteExpenseHandler);
}
