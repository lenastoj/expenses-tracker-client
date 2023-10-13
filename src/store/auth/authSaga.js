import { call, put, takeLatest } from 'redux-saga/effects';
import { setActiveUser, setActiveUserHosts, setGuests } from './authSlice';
import AuthService from '../../services/auth.service';
import { setExpenses } from '../expense/expenseSlice';
import guestService from '../../services/guest.service';

function* getActiveUserHandler() {
  try {
    const data = yield call(AuthService.activeUser);
    yield put(setActiveUser(data.user));
    yield put(setActiveUserHosts(data.hosts));
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

function* getGuestsHandler(action) {
  try {
    const guests = yield call(guestService.getGuests, action.payload);
    yield put(setGuests(guests));
  } catch (e) {
    yield put(
      setGuests({
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
    console.log(e);
  }
}
export function* watchGetActiveUser() {
  yield takeLatest('auth/getActiveUser', getActiveUserHandler);
}

export function* watchLogout() {
  yield takeLatest('auth/logout', logoutHandler);
}

export function* watchGetGuests() {
  yield takeLatest('auth/getGuests', getGuestsHandler);
}
