import React from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../../slices';
import Add from './add.jsx';
import Remove from './remove.jsx';
import Rename from './rename.jsx';

const modals = {
  add: Add,
  remove: Remove,
  rename: Rename,
};

const Modal = ({ modalState }) => {
  const { shown, type } = modalState;
  const dispatch = useDispatch();

  if (!shown) {
    return null;
  }

  const Component = modals[type];
  return (
    <Component
      modalState={modalState}
      onHide={() => dispatch(actions.closeModal())}
    />
  );
};

export default Modal;
