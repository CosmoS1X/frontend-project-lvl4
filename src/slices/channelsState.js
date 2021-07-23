/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const generalChannelId = 1;

const slice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    currentChannelId: generalChannelId,
  },
  reducers: {
    initChannels: (state, { payload }) => {
      state.channels = payload;
    },
    setActiveChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    createChannel: (state, { payload }) => {
      state.channels.push(payload);
    },
    renameChannel: (state, { payload }) => {
      const channelToRename = state.channels.find((item) => item.id === payload.id);
      channelToRename.name = payload.name;
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
