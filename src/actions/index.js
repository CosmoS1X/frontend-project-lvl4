import { createAction } from 'redux-actions';

export const addData = createAction('ADD_DATA');

export const updateMessages = createAction('UPDATE_MESSAGES');

export const changeChannel = createAction('CHANGE_CHANNEL');

export const addChannel = createAction('ADD_CHANNEL');

export const addUser = createAction('ADD_USER');

export const showModal = createAction('SHOW_ADD_MODAL');

export const closeModal = createAction('CLOSE_MODAL');
