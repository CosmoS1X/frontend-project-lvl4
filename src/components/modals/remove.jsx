import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSocket } from '../../hooks';

const removeChannel = async (socketApi, id, onHide) => {
  await socketApi.removeChannel(id);
  onHide();
};

const Remove = ({ modalShown: { id }, onHide }) => {
  const socketApi = useSocket();
  const { t } = useTranslation();

  return (
    <Modal show onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.delete')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">{t('confirmDeletion')}</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={onHide}>{t('buttons.cancel')}</Button>
          <Button variant="danger" onClick={() => removeChannel(socketApi, { id }, onHide)}>{t('buttons.delete')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
