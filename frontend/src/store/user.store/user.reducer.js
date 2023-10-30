/**
 * #1 Make a slice for the store.index.js
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [{ name: 'Dariusz' }, { name: 'Eric' }, { name: 'Alicia' }],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

// Will be imported as usersReducer in the store.index.js
export default usersSlice.reducer;
export const selectAllUsers = (state) => state.users;
