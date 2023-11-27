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
  page: 1,
  totalPages: 1,
  createPostImageStatus: 'idle',
  readPostsStatus: 'idle',

  createPostImageError: null,
  readPostsError: null,
});

// Create Post
export const createPostImage = createAsyncThunk(
  'posts/createPostImage',
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

// Read All The Posts
export const readPosts = createAsyncThunk(
  'posts/readPosts',
  async ({ page = 1, pageSize = 10 }) => {
    console.log('readPosts');
    console.log(page);
    const params = {
      page: page,
      pageSize: pageSize,
    };
    const { data } = await http.get(`/posts?page=${page}&pageSize=10`);
    console.log(data);
    return data;
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createPostImage.pending, (state, action) => {
        state.createPostImageStatus = 'loading';
      })
      .addCase(createPostImage.fulfilled, (state, action) => {
        state.createPostImageStatus = 'succeeded';
      })
      .addCase(createPostImage.rejected, (state, action) => {
        if (state.createPostImageStatus !== 'succeede') {
          state.createPostImageStatus = 'error';
          state.createPostImageError = `Error ${action.error.message}`;
        }
      })
      .addCase(readPosts.pending, (state, action) => {
        state.readPostsStatus = 'loading';
      })
      .addCase(readPosts.fulfilled, (state, action) => {
        postsAdapter.upsertMany(state, action.payload.posts);
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
        state.readPostsStatus = 'succeeded';
      })
      .addCase(readPosts.rejected, (state, action) => {
        state.readPostsStatus = 'error';
        state.readPostsError = `Error ${action.error.message}`;
      });
  },
});

// export const {these are the reducer actions} = postsSlice.actions

export default postsSlice.reducer;

export const {
  selectAll: selectAllPosts,
  selectById: selectPostsById,
  selectIds: selectPostsIds,
} = postsAdapter.getSelectors((state) => state.posts);

export const selectPage = (state) => state.posts.page;
export const selectTotalPages = (state) => state.posts.totalPages;
