export function expensesSelect(state) {
  return state.expense.data.data;
}

export function totalPagesSelect(state) {
  return state.expense.data.metadata.totalPages;
}

export function expenseSelect(state) {
  return state.expense.expense;
}

export function expenseDelete(state) {
  return state.expense.deleteInfo;
}
