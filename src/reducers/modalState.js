/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'modal',
  initialState: { modalName: null, id: null },
  reducers: {
    showModal: (state, { payload: { modalName, id } }) => {
      state.modalName = modalName;
      state.id = id;
    },
    closeModal: (state, { payload: { id } }) => {
      state.modalName = null;
      state.id = id;
    },
  },
});

export const { actions: modalActions } = slice;
export default slice.reducer;
