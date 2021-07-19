import React from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../../reducers';
import Remove from './remove.jsx';
import AddRename from './add-rename.jsx';

const modals = {
  add: AddRename,
  remove: Remove,
  rename: AddRename,
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
