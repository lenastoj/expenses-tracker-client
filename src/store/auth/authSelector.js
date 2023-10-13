export function userSelect(state) {
  return state.auth.activeUser;
}
export function hostsSelect(state) {
  return state.auth.activeUserHosts;
}
export function guestsPageSelect(state) {
  return state.auth.guests.data;
}
export function totalPagesSelect(state) {
  return state.auth.guests.metadata.totalPages;
}
