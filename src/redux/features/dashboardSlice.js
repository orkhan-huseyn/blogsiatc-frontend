import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'lib/axios';

export const fetchBlogs = createAsyncThunk('dashboard/fetchBlogs', (params) => {
  return axios.get('blogs', { params }).then((response) => response.data);
});

export const likeOrDislikeBlog = createAsyncThunk(
  'dashboard/likeOrDislikeBlog',
  async (blogId, { dispatch, getState }) => {
    await axios.put(`/blogs/${blogId}/like`);
    dispatch(toggleBlogLike({ blogId }));
  }
);

const initialState = {
  list: [],
  currentPage: 1,
  total: 0,
  loading: true,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    toggleBlogLike(state, action) {
      const { blogId } = action.payload;
      const blog = state.list.find((blog) => blog.id === blogId);
      if (blog.liked) {
        blog.liked = false;
        blog.likes--;
      } else {
        blog.liked = true;
        blog.likes++;
      }
    },
  },
  extraReducers: {
    [fetchBlogs.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchBlogs.fulfilled]: (state, action) => {
      state.list = action.payload.blogs;
      state.total = action.payload.total;
      state.error = null;
      state.loading = false;
    },
    [fetchBlogs.rejected]: (state, action) => {
      state.list = [];
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { setCurrentPage, toggleBlogLike } = dashboardSlice.actions;

export default dashboardSlice.reducer;
