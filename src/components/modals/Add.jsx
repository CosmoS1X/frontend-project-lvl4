import React, { useEffect, useRef } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSocket } from '../../hooks';

const Add = ({
  show, onHide, channels,
}) => {
  const inputRef = useRef();
  const socket = useSocket();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: Yup.object({
      name: Yup.string()
        .required(t('errors.required'))
        .notOneOf(channels.map((i) => i.name), t('errors.alreadyExists')),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      socket.volatile.emit('newChannel', values, (res) => {
        console.log(res.status);
      });

      formik.resetForm();
      onHide();
    },
  });

  useEffect(() => {
    inputRef.current.focus();

    return () => {
      formik.resetForm();
      formik.errors = {};
    };
  }, [show]);

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              className="mb-2"
              name="name"
              data-testid="add-channel"
              onChange={formik.handleChange}
              value={formik.values.body}
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

export default connect(mapStateToProps)(Add);
