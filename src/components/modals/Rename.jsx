import React, { useEffect, useRef } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSocket } from '../../hooks';

const Rename = ({ modalShown: { modalName, id }, onHide, channels }) => {
  const inputRef = useRef();
  const socket = useSocket();
  const { t } = useTranslation();

  const currentChannel = channels.find((channel) => channel.id === id);

  const formik = useFormik({
    initialValues: { name: currentChannel.name },
    validationSchema: Yup.object({
      name: Yup.string()
        .required(t('errors.required'))
        .notOneOf(channels.map((i) => i.name), t('errors.alreadyExists')),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      socket.volatile.emit('renameChannel', { ...values, id }, (res) => {
        console.log(res.status);
      });

      onHide();
    },
  });

  useEffect(() => {
    inputRef.current.select();
  }, []);

  return (
    <Modal show={modalName === 'renaming'} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              className="mb-2"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              ref={inputRef}
              isInvalid={formik.errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button type="button" className="me-2" variant="secondary" onClick={onHide}>Отменить</Button>
              <Button type="submit" variant="primary">Отправить</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const mapStateToProps = ({ channels }) => ({ channels });

export default connect(mapStateToProps)(Rename);
