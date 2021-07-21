/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'modal',
  initialState: {
    shown: false,
    type: null,
    extraData: null,
  },
  reducers: {
    showModal: (state, { payload: { type, extraData } }) => {
      state.shown = true;
      state.type = type;
      state.extraData = extraData;
    },
    closeModal: (state) => {
      state.shown = false;
      state.type = null;
      state.extraData = null;
    },
  },
});

export const { actions: modalActions } = slice;
export default slice.reducer;
