import { createSlice } from '@reduxjs/toolkit';

const middlewareActions = {
  getExpenses: () => {},
  getExpense: () => {},
  deleteExpense: () => {},
};

const expenseSlice = createSlice({
  name: 'expense',
  initialState: {
    data: [],
    expense: {},
    deleteInfo: false,
  },

  reducers: {
    setExpenses: (state, action) => ({ ...state, data: action.payload }),
    setExpense: (state, action) => ({ ...state, expense: action.payload }),
    setDeleteInfo: (state, action) => ({
      ...state,
      deleteInfo: action.payload,
    }),
    ...middlewareActions,
  },
});

export const {
  setExpenses,
  getExpenses,
  setExpense,
  getExpense,
  deleteExpense,
  setDeleteInfo,
} = expenseSlice.actions;

export default expenseSlice.reducer;
