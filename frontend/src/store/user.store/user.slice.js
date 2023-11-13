import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';

import http from '../../axios/http_common';

const usersAdapter = createEntityAdapter({
  selectId: (user) => user.id,
  sortComparer: (b, a) => a.firstName.localeCompare(b.firstName),
});

const initialState = usersAdapter.getInitialState({
  user: null,
  createUserStatus: 'idle',
  readUserStatus: 'idle',
  readUsersStatus: 'idle',
  updateUserStatus: 'idle',
  deleteUserStatus: 'idle',
  createUserError: null,
  readUserError: null,
  readUsersError: null,
  updateUserError: null,
  deleteUserError: null,
});
// Create User
export const createUser = createAsyncThunk(
  'user/createUser',
  async (payload) => {
    const response = await http.post(`users`, payload);
    return response.data;
  }
);
// Read User
export const readUser = createAsyncThunk('user/readUser', async (id) => {
  console.log(`UserSlice id ${id}`);
  const response = await http.get(`/users/${id}`);
  return response.data;
});
// Read All Users
export const readUsers = createAsyncThunk('users/readUsers', async () => {
  const response = await http.get('/users');
  return response.data;
});
// Update User
export const updateUser = createAsyncThunk('user/updateUser', async (id) => {
  const response = await http.put(`users/${id}`);
  return response.data;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCreateUserStatusIdle(state, action) {
      state.createUserStatus = 'idle';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(readUsers.pending, (state, action) => {
        state.readUsersStatus = 'loading';
      })
      .addCase(readUsers.fulfilled, (state, action) => {
        state.readUsersStatus = 'succeeded';
        // upsert is an update setAll writes over everything
        usersAdapter.upsertMany(state, action.payload);
      })
      .addCase(readUsers.rejected, (state, action) => {
        if (state.readUsersStatus !== 'succeeded') {
          state.readUsersStatus = 'error';
          state.readUsersError = `Error ${action.error.message}`;
        }
      })
      .addCase(readUser.pending, (state, action) => {
        state.readUserStatus = 'loading';
      })
      .addCase(readUser.fulfilled, (state, action) => {
        state.readUserStatus = 'succeeded';
        state.user = action.payload;
      })
      .addCase(readUser.rejected, (state, action) => {
        if (state.readUserStatus !== 'succeeded') {
          state.readUserStatus = 'error';
          state.readUserError = `Error ${action.error.message}`;
        }
      })
      .addCase(createUser.pending, (state, action) => {
        state.createUserStatus = 'loading';
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.createUserStatus = 'succeeded';
        // Set Token Etc
      })
      .addCase(createUser.rejected, (state, action) => {
        state.createUserStatus = 'error';
        state.createUserError = `Error ${action.error.message}`;
      });
  },
});

export const { setCreateUserStatusIdle } = usersSlice.actions;

export default usersSlice.reducer;

export const {
  selectAll: selectAllUsers,
  selectById: selectUsersById,
  selectIds: selectUsersIds,
} = usersAdapter.getSelectors((state) => state.users);

export const selectUser = (state) => state.user;
