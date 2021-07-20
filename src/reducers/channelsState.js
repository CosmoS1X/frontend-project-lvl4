/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const generalChannelId = 1;

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
    createChannel: (state, { payload }) => {
      state.channels.push(payload);
    },
    renameChannel: (state, { payload }) => {
      const index = state.channels.findIndex((item) => item.id === payload.id);
      state.channels.splice(index, 1, payload);
    },
    removeChannel: (state, { payload: { id } }) => {
      state.channels = state.channels.filter((item) => item.id !== id);
      if (state.currentChannelId === id) {
        state.currentChannelId = generalChannelId;
      }
    },
  },
});

export const { actions: channelsActions } = slice;
export default slice.reducer;
