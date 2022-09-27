import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'lib/axios';

export const fetchUsers = createAsyncThunk('chat/fetchUsers', () => {
  return axios.get('/users').then((response) => response.data);
});

export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  (userId) => {
    return axios.get(`/messages/${userId}`).then((response) => response.data);
  }
);

export const markAllAsRead = createAsyncThunk(
  'chat/markAllAsRead',
  (userId) => {
    return axios
      .put(`/messages/${userId}/read/all`)
      .then((response) => response.data);
  }
);

const initialState = {
  users: {
    list: [],
    total: 0,
    error: null,
    loading: true,
  },
  messages: {},
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setUserOnline(state, action) {
      const { userId, isOnline } = action.payload;
      const user = state.users.list.find((u) => u.id === userId);
      user.online = isOnline;
    },
    incrementUnreadMessages(state, action) {
      const userId = action.payload;
      const user = state.users.list.find((u) => u.id === userId);
      user.unreadMessages++;
    },
    resetUnreadMessages(state, action) {
      const userId = action.payload;
      const user = state.users.list.find((u) => u.id === userId);
      user.unreadMessages = 0;
    },
    newMessage(state, action) {
      const { userId, message } = action.payload;
      const messages = state.messages[userId] || [];
      messages.push(message);
      state.messages[userId] = messages;
    },
  },
  extraReducers: {
    [fetchUsers.pending]: (state, action) => {},
    [fetchUsers.fulfilled]: (state, action) => {
      state.users.list = action.payload.users;
      state.users.total = action.payload.total;
      state.users.loading = false;
      state.users.error = null;
    },
    [fetchUsers.rejected]: (state, action) => {
      state.users.loading = false;
      state.users.error = action.error;
    },

    [fetchMessages.pending]: (state, action) => {},
    [fetchMessages.fulfilled]: (state, action) => {
      const userId = action.meta.arg;
      const messages = action.payload;
      state.messages[userId] = messages;
    },
    [fetchMessages.rejected]: (state, action) => {},

    [markAllAsRead.pending]: () => {},
    [markAllAsRead.fulfilled]: (state, action) => {
      const userId = action.meta.arg;
      const user = state.users.list.find((u) => u.id === userId);
      user.unreadMessages = 0;
    },
    [markAllAsRead.rejected]: () => {},
  },
});

export const {
  setUserOnline,
  newMessage,
  resetUnreadMessages,
  incrementUnreadMessages,
} = chatSlice.actions;

export default chatSlice.reducer;
