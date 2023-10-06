import { createSlice } from '@reduxjs/toolkit';

const middlewareActions = {
  getActiveUser: () => {},
  logout: () => {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    activeUser: null,
    activeUserGuests: null,
  },
  reducers: {
    setActiveUser: (state, action) => ({
      ...state,
      activeUser: action.payload,
    }),
    setActiveUserGuests: (state, action) => ({
      ...state,
      activeUserGuests: action.payload,
    }),
    ...middlewareActions,
  },
});

export const { setActiveUser, getActiveUser, setActiveUserGuests, logout } =
  authSlice.actions;

export default authSlice.reducer;
