/**
 * #2 Where the reducers live
 */

import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './user.store/user.slice.js';

export default configureStore({
  reducer: {
    users: usersReducer,
  },
});
