import update from 'immutability-helper';
import { handleActions } from 'redux-actions';
import * as actions from '../actions/index.js';

const renameChannel = ({ channels }, payload) => {
  const index = channels.findIndex((item) => item.id === payload.id);
  return update(channels, { [index]: { $set: payload } });
};

const deleteChannel = ({ channels }, { id }) => channels.filter((item) => item.id !== id);

const deleteMessages = ({ messages }, { id }) => messages.filter((item) => item.channelId !== id);

const reducer = handleActions({
  [actions.addData](state, { payload }) {
    return { ...state, ...payload };
  },
  [actions.addUser](state, { payload }) {
    return { ...state, currentUser: payload };
  },
  [actions.updateMessages](state, { payload }) {
    return { ...state, messages: [...state.messages, payload] };
  },
  [actions.changeChannel](state, { payload }) {
    return { ...state, currentChannelId: payload };
  },
  [actions.showModal](state, { payload }) {
    return { ...state, modalShown: payload };
  },
  [actions.closeModal](state) {
    return { ...state, modalShown: { modalName: null, id: null } };
  },
  [actions.addChannel](state, { payload }) {
    return {
      ...state,
      channels: [...state.channels, payload],
      currentChannelId: payload.id,
    };
  },
  [actions.renameChannel](state, { payload }) {
    return {
      ...state,
      channels: renameChannel(state, payload),
    };
  },
  [actions.removeChannel](state, { payload }) {
    return {
      ...state,
      channels: deleteChannel(state, payload),
      messages: deleteMessages(state, payload),
      currentChannelId: 1,
    };
  },
  [actions.setLoading](state, { payload }) {
    return { ...state, loading: payload };
  },
}, {
  currentUser: null,
  channels: [],
  currentChannelId: 1,
  messages: [],
  modalShown: { modalName: null, id: null },
  loading: true,
});

export default reducer;
