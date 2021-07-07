const reducer = (state = {}, { type, payload }) => {
  switch (type) {
    case 'ADD_DATA':
      return { ...state, ...payload };
    case 'UPDATE_MESSAGES':
      return { ...state, messages: [...state.messages, payload] };
    case 'CHANGE_CHANNEL':
      return { ...state, currentChannelId: payload };
    case 'ADD_CHANNEL':
      return { ...state, channels: [...state.channels, payload] };
    case 'ADD_USER':
      return { ...state, currentUser: payload };
    case 'SHOW_ADD_MODAL':
      return { ...state, modalShown: payload };
    case 'CLOSE_MODAL':
      return { ...state, modalShown: null };
    default:
      return state;
  }
};

export default reducer;
