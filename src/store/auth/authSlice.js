import { createSlice } from '@reduxjs/toolkit';

const middlewareActions = {
  getActiveUser: () => {},
  logout: () => {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    activeUser: null,
  },
  reducers: {
    setActiveUser: (state, action) => ({
      ...state,
      activeUser: action.payload,
    }),
    ...middlewareActions,
  },
});

export const { setActiveUser, getActiveUser, logout } = authSlice.actions;

export default authSlice.reducer;
