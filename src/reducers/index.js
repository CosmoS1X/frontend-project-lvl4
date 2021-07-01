const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_DATA':
      return { ...state, ...action.payload };
    case 'CHANGE_CHANNEL':
      return { ...state, currentChannelId: action.payload };
    default:
      return state;
  }
};

export default reducer;
