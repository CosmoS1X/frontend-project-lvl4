import update from 'immutability-helper';

const renameChannel = ({ channels }, payload) => {
  const index = channels.findIndex((item) => item.id === payload.id);
  return update(channels, { [index]: { $set: payload } });
};

const deleteChannel = ({ channels }, { id }) => channels.filter((item) => item.id !== id);

const deleteMessages = ({ messages }, { id }) => messages.filter((item) => item.channelId !== id);

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'ADD_DATA':
      return { ...state, ...payload };
    case 'UPDATE_MESSAGES':
      return { ...state, messages: [...state.messages, payload] };
    case 'CHANGE_CHANNEL':
      return { ...state, currentChannelId: payload };
    case 'ADD_CHANNEL':
      return { ...state, channels: [...state.channels, payload], currentChannelId: payload.id };
    case 'RENAME_CHANNEL':
      return { ...state, channels: renameChannel(state, payload) };
    case 'REMOVE_CHANNEL':
      return {
        ...state,
        channels: deleteChannel(state, payload),
        messages: deleteMessages(state, payload),
        currentChannelId: 1,
      };
    case 'ADD_USER':
      return { ...state, currentUser: payload };
    case 'SHOW_MODAL':
      return { ...state, modalShown: payload };
    case 'CLOSE_MODAL':
      return { ...state, modalShown: { modalName: null, id: null } };
    default:
      return state;
  }
};

export default reducer;
