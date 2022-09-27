import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'lib/axios';

export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', (params) => {
  return axios.get('blogs/my', { params }).then((response) => response.data);
});

const initialState = {
  list: [],
  currentPage: 1,
  total: 0,
  loading: true,
  error: null,
};

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    toggleBlogLike(state, action) {
      const { userId, blogId } = action.payload;
      const blog = state.list.find((blog) => blog._id === blogId);
      if (blog.likes.includes(userId)) {
        blog.likes = blog.likes.filter((uid) => uid !== userId);
      } else {
        blog.likes.push(userId);
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

export const { setCurrentPage, toggleBlogLike } = blogsSlice.actions;

export default blogsSlice.reducer;
