/* eslint-disable arrow-body-style */
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const Remove = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={onHide}>Отменить</Button>
          <Button variant="danger">Удалить</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
