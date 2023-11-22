import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';

import { http, httpImage } from '../axios/http_common.axios.js';

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
  async (formData) => {
    const title = formData.get('title');
    const content = formData.get('content');
    const token = formData.get('token');
    const data = formData.get('data');
    formData.delete('title');
    formData.delete('content');

    const payload = {};
    payload.title = title;
    payload.content = content;

    if (data) {
      const {
        data: { response, imageEncodedName },
      } = await httpImage.post('/postsimage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      payload.imageEncodedName = imageEncodedName;
      payload.response = response;
    }

    const postResponse = await http.post('/posts', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
