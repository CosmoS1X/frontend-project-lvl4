import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSocket } from '../../hooks';

const removeChannel = async (socket, id, onHide) => {
  await socket.removeChannel(id);
  onHide();
};

const Remove = ({ modalShown: { modalName, id }, onHide }) => {
  const socket = useSocket();
  const { t } = useTranslation();

  return (
    <Modal show={modalName === 'removing'} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.delete')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">{t('confirmDeletion')}</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={onHide}>{t('buttons.cancel')}</Button>
          <Button variant="danger" onClick={() => removeChannel(socket, { id }, onHide)}>{t('buttons.delete')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
