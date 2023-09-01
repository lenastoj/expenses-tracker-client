import { call, put, takeLatest } from 'redux-saga/effects';
import { setActiveUser } from './authSlice';
import AuthService from '../../services/auth.service';
import { setExpenses } from '../expense/expenseSlice';

function* getActiveUserHandler() {
  try {
    const data = yield call(AuthService.activeUser);
    yield put(setActiveUser(data));
  } catch (e) {
    console.log(e);
  }
}

function* logoutHandler(action) {
  try {
    yield call(AuthService.logout);
    yield put(setActiveUser(null));
    yield put(
      setExpenses({
        data: [],
        metadata: {
          page: 0,
          paginationLimit: 0,
          count: 0,
          total: 0,
          totalPages: 0,
        },
      }),
    );
    if (typeof action.payload.meta.onSuccess === 'function') {
      yield call(action.payload.meta.onSuccess);
    }
  } catch (e) {
    console.log(e);
  }
}

export function* watchGetActiveUser() {
  yield takeLatest('auth/getActiveUser', getActiveUserHandler);
}

export function* watchLogout() {
  yield takeLatest('auth/logout', logoutHandler);
}
