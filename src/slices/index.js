import { combineReducers } from 'redux';
import modalState, { modalActions } from './modalState.js';
import channelsState, { channelsActions } from './channelsState.js';
import messagesState, { messagesActions } from './messagesState.js';

export const actions = {
  ...channelsActions,
  ...messagesActions,
  ...modalActions,
};

export default combineReducers({
  modalState,
  channelsState,
  messagesState,
});
