import * as expenseSaga from './expense/expenseSaga';
import * as authSaga from './auth/authSaga';

const sagas = {
  ...expenseSaga,
  ...authSaga,
};

export default sagas;
