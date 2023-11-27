import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { http } from '../axios/http_common.axios.js';

const usersAdapter = createEntityAdapter({
  selectId: (user) => user.id,
  sortComparer: (b, a) => a.firstName.localeCompare(b.firstName),
});

const initialState = usersAdapter.getInitialState({
  user: {
    token: null,
    firstName: null,
    lastName: null,
  },
  createUserStatus: 'idle',
  readUserStatus: 'idle',
  readUsersStatus: 'idle',
  updateUserStatus: 'idle',
  deleteUserStatus: 'idle',
  loginTokenStatus: 'idle',

  createUserError: null,
  readUserError: null,
  readUsersError: null,
  updateUserError: null,
  deleteUserError: null,
  loginTokenError: null,
});

// Password Reset
export const passwordReset = createAsyncThunk(
  '/user/passwordReset',
  async (formData) => {
    const { data } = await http.put('/users/passwordreset', formData, {
      headers: { 'Content-Type': 'multipart/form/data' },
    });
    if (data) {
      return data;
    } else {
      return null;
    }
  }
);

// Forgot Password
export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (formData) => {
    console.log(formData.get('email'));
    const { data } = await http.post('/users/forgotpassword', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (data) {
      console.log(data);
      return data;
    }
    if (!data) {
      console.log('no data');
      return data;
    }
  }
);

// Login With Token
export const loginToken = createAsyncThunk(
  'user/loginToken',
  async (payload) => {
    const { data } = await http.get('/users/loginToken', {
      headers: {
        Authorization: `Bearer ${payload}`,
      },
    });
    return data;
  }
);

// Create User
export const createUser = createAsyncThunk(
  'user/createUser',
  async (payload) => {
    const data = await http.post(`/users/signup`, payload);
    const token = data.token;
    if (token) {
      localStorage.setItem('token', token);
    }
    return data;
  }
);
// Read User
export const readUser = createAsyncThunk('user/readUser', async (id) => {
  const { data } = await http.get(`/users/${id}`);
  return data;
});

// Read All Users
export const readUsers = createAsyncThunk('users/readUsers', async () => {
  const { data } = await http.get('/users');
  return data;
});
// Update User
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (payload) => {
    const { data } = await http.put(`/users`, payload);
    console.log(data);
    return data;
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCreateUserStatusIdle(state, action) {
      state.createUserStatus = 'idle';
    },
    setReadUserStatusIdle(state, action) {
      state.readUserStatus = 'idle';
    },
    loginTokenStatusAndErrorReset(state, action) {
      state.loginTokenError = null;
      state.loginTokenStatus = 'idle';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createUser.pending, (state, action) => {
        state.createUserStatus = 'loading';
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.createUserStatus = 'succeeded';
        state.loginTokenStatus = 'idle';
        state.loginTokenError = 'null';
        state.user = action.payload;
        // Set Token Etc
      })
      .addCase(createUser.rejected, (state, action) => {
        state.createUserStatus = 'error';
        if (action.error.message === 'Request failed with status code 400') {
          state.createUserError = 'Email already exists please REFRESH PAGE';
        } else {
          state.createUserError = 'Error please try again';
        }
        //state.createUserError = `Error ${action.error.message}`;
      })
      .addCase(readUsers.pending, (state, action) => {
        state.readUsersStatus = 'loading';
      })
      .addCase(readUsers.fulfilled, (state, action) => {
        state.readUsersStatus = 'succeeded';
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
      .addCase(updateUser.pending, (state, action) => {
        state.createUserStatus = 'loading';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        usersAdapter.updateOne(state, action.payload);

        state.createUserStatus = 'succeeded';
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.createUserStatus = 'error';
        state.updateUserError = `Error ${action.error.message}`;
      })
      .addCase(loginToken.pending, (state, action) => {
        state.loginTokenStatus = 'loading';
      })
      .addCase(loginToken.fulfilled, (state, action) => {
        state.loginTokenStatus = 'succeeded';
        state.loginTokenError = null;
        state.user = action.payload;
      })
      .addCase(loginToken.rejected, (state, action) => {
        if (state.loginTokenStatus !== 'succeeded') {
          state.loginTokenStatus = 'error';
          state.loginTokenError = `Error ${action.error.message}`;
        }
      });
  },
});

// Actions that manupulate the state in the reducer
export const {
  setCreateUserStatusIdle,
  setReadUserStatusIdle,
  loginTokenStatusAndErrorReset,
} = usersSlice.actions;

// Imported to the store so the slice can ve used
export default usersSlice.reducer;

// For the entities
export const {
  selectIds: selectAllUserIds,
  selectAll: selectAllUsers,
  selectById: selectUsersById,
  selectIds: selectUsersIds,
  selectTotal: selectTotalNumberOfUsers,
} = usersAdapter.getSelectors((state) => state.users);

// Get things from the state cannot manipulate state on read state
// Manipulate state in reducer as an action and export wtih the userSlice.actiions above
export const selectUser = (state) => state.user;

/**
 *
 */
