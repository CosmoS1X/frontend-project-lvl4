import React from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../../reducers';
import Add from './add.jsx';
import Remove from './remove.jsx';
import Rename from './rename.jsx';

const modals = {
  add: Add,
  remove: Remove,
  rename: Rename,
};

const Modal = ({ modalShown }) => {
  const { modalName } = modalShown;
  const dispatch = useDispatch();

  if (!modalName) {
    return null;
  }

  const Component = modals[modalName];
  return (
    <Component
      modalShown={modalShown}
      onHide={() => dispatch(actions.closeModal({ modalName: 'remove', id: null }))}
    />
  );
};

export default Modal;
