import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSocket } from '../../hooks';

const removeChannel = async (socket, id, onHide) => {
  socket.volatile.emit('removeChannel', { id }, (res) => {
    console.log(res.status);
  });
  onHide();
};

const Remove = ({ modalShown: { modalName, id }, onHide }) => {
  const socket = useSocket();

  return (
    <Modal show={modalName === 'removing'} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={onHide}>Отменить</Button>
          <Button variant="danger" onClick={() => removeChannel(socket, id, onHide)}>Удалить</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
