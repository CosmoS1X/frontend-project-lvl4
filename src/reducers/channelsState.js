/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    currentChannelId: 1,
  },
  reducers: {
    getChannels: (state, { payload }) => {
      state.channels = payload;
    },
    changeChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    addChannel: (state, { payload }) => {
      state.channels.push(payload);
      state.currentChannelId = payload.id;
    },
    renameChannel: (state, { payload }) => {
      const index = state.channels.findIndex((item) => item.id === payload.id);
      state.channels.splice(index, 1, payload);
    },
    removeChannel: (state, { payload: { id } }) => {
      state.channels = state.channels.filter((item) => item.id !== id);
      state.currentChannelId = 1;
    },
  },
});

export const { actions: channelsActions } = slice;
export default slice.reducer;