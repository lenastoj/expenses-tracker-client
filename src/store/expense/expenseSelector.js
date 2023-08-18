export function expensesSelect(state) {
  return state.expense.data;
}
export function expenseSelect(state) {
  return state.expense.expense;
}
export function expenseDelete(state) {
  return state.expense.deleteInfo;
}
