import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';

import { http, httpImage } from '../../axios/http_common.js';

const postsAdapter = createEntityAdapter({
  selectId: (posts) => posts.id,
  sortComparer: (a, b) => a.updatedAt.localeCompare(a.updatedAt),
});

const initialState = postsAdapter.getInitialState({
  post: {
    postId: null,
    anonId: null,
  },
  createPostStatus: 'idle',
  createPostsError: null,
});

export const createPostImage = createAsyncThunk(
  'posts/createPost',
  async (payload) => {
    await httpImage.post('/posts', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    //const response = await httpImage.post('/posts/');
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {},
});

// export const {} = postsSlice.actions

export default postsSlice.reducer;

export const {
  selectAll: selectAllPosts,
  selectById: selectPostsById,
  selectIds: selectPostsIds,
} = postsAdapter.getSelectors((state) => state.posts);
