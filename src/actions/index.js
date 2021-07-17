import { createAction } from '@reduxjs/toolkit';

export const addData = createAction('ADD_DATA');

export const updateMessages = createAction('UPDATE_MESSAGES');

export const changeChannel = createAction('CHANGE_CHANNEL');

export const addChannel = createAction('ADD_CHANNEL');

export const renameChannel = createAction('RENAME_CHANNEL');

export const removeChannel = createAction('REMOVE_CHANNEL');

export const addUser = createAction('ADD_USER');

export const showModal = createAction('SHOW_MODAL');

export const closeModal = createAction('CLOSE_MODAL');

export const setLoading = createAction('SET_LOADING');
