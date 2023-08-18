import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import expenseReducer from './expense/expenseSlice';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    expense: expenseReducer,
  },

  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    sagaMiddleware,
  ],
});

Object.keys(sagas).forEach((sagaKey) => {
  sagaMiddleware.run(sagas[sagaKey]);
});

export default store;
