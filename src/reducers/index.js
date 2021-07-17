/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';
import * as actions from '../actions/index.js';

const initialState = {
  currentUser: null,
  channels: [],
  currentChannelId: 1,
  messages: [],
  modalShown: { modalName: null, id: null },
  loading: true,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.addData, (state, { payload: { channels, messages } }) => {
      state.channels = channels;
      state.messages = messages;
    })
    .addCase(actions.addUser, (state, { payload }) => {
      state.currentUser = payload;
    })
    .addCase(actions.updateMessages, (state, { payload }) => {
      state.messages.push(payload);
    })
    .addCase(actions.changeChannel, (state, { payload }) => {
      state.currentChannelId = payload;
    })
    .addCase(actions.showModal, (state, { payload }) => {
      state.modalShown = payload;
    })
    .addCase(actions.closeModal, (state, { payload: { id } }) => {
      state.modalShown = { modalName: null, id };
    })
    .addCase(actions.addChannel, (state, { payload }) => {
      state.channels.push(payload);
      state.currentChannelId = payload.id;
    })
    .addCase(actions.renameChannel, (state, { payload }) => {
      const index = state.channels.findIndex((item) => item.id === payload.id);
      state.channels.splice(index, 1, payload);
    })
    .addCase(actions.removeChannel, (state, { payload: { id } }) => {
      state.channels = state.channels.filter((item) => item.id !== id);
      state.messages = state.messages.filter((item) => item.channelId !== id);
      state.currentChannelId = 1;
    })
    .addCase(actions.setLoading, (state, { payload }) => {
      state.loading = payload;
    });
});

export default reducer;
