export function userSelect(state) {
  return state.auth.activeUser;
}
export function guestsSelect(state) {
  return state.auth.activeUserGuests;
}
