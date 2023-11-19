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
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const data = formData.get('data');
    formData.delete('firstName');
    formData.delete('lastName');

    const payload = {};
    payload.firstName = firstName;
    payload.lastName = lastName;

    if (data) {
      const {
        data: { response, imageNameEncoded },
      } = await httpImage.post('/postsimage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      console.log(imageNameEncoded);
    }

    const postResponse = await http.post('');
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
