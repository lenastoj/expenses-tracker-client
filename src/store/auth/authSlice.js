import { createSlice } from '@reduxjs/toolkit';

const middlewareActions = {
  getActiveUser: () => {},
  logout: () => {},
  getGuests: () => {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    activeUser: null,
    activeUserHosts: null,
    guests: {
      data: [],
      metadata: {
        page: 0,
        paginationLimit: 0,
        count: 0,
        total: 0,
        totalPages: 0,
      },
    },
  },
  reducers: {
    setActiveUser: (state, action) => ({
      ...state,
      activeUser: action.payload,
    }),
    setActiveUserHosts: (state, action) => ({
      ...state,
      activeUserHosts: action.payload,
    }),
    setGuests: (state, action) => ({ ...state, guests: action.payload }),
    ...middlewareActions,
  },
});

export const {
  setActiveUser,
  getActiveUser,
  setActiveUserHosts,
  logout,
  setGuests,
  getGuests,
} = authSlice.actions;

export default authSlice.reducer;
