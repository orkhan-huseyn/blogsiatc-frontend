import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/usersSlice';
import blogsReducer from './features/blogsSlice';
import dashboardSlice from './features/dashboardSlice';
import chatReducer from './features/chatSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    blogs: blogsReducer,
    dashboard: dashboardSlice,
    chat: chatReducer,
  },
});
