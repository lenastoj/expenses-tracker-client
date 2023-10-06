import { call, put, takeLatest } from 'redux-saga/effects';
import { setActiveUser, setActiveUserGuests } from './authSlice';
import AuthService from '../../services/auth.service';
import { setExpenses } from '../expense/expenseSlice';

function* getActiveUserHandler() {
  try {
    const data = yield call(AuthService.activeUser);
    yield put(setActiveUser(data.user));
    yield put(setActiveUserGuests(data.guests));
  } catch (e) {
    if (e.code === 'ERR_BAD_REQUEST') {
      put(setActiveUser(null));
    }
    console.log('auth error', e);
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
