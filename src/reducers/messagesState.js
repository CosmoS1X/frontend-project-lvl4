/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { channelsActions } from './channelsState.js';

const slice = createSlice({
  name: 'messages',
  initialState: {
    currentUser: null,
    messages: [],
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.currentUser = payload;
    },
    getMessages: (state, { payload }) => {
      state.messages = payload;
    },
    updateMessages: (state, { payload }) => {
      state.messages.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(channelsActions.removeChannel, (state, { payload: { id } }) => {
      state.messages = state.messages.filter((item) => item.channelId !== id);
    });
  },
});

export const { actions: messagesActions } = slice;
export default slice.reducer;
