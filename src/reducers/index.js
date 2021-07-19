import { combineReducers } from 'redux';
import loadingState, { loadingActions } from './loadingState.js';
import modalState, { modalActions } from './modalState.js';
import channelsState, { channelsActions } from './channelsState.js';
import messagesState, { messagesActions } from './messagesState.js';

export const actions = {
  ...loadingActions,
  ...channelsActions,
  ...messagesActions,
  ...modalActions,
};

export default combineReducers({
  loadingState,
  modalState,
  channelsState,
  messagesState,
});
