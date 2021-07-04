const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_DATA':
      return { ...state, ...action.payload };
    case 'UPDATE_MESSAGES':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'CHANGE_CHANNEL':
      return { ...state, currentChannelId: action.payload };
    case 'ADD_USER':
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
};

export default reducer;
