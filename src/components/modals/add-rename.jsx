import React, { useEffect, useRef } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSocket } from '../../hooks';

const AddRename = ({ modalShown: { modalName, id }, onHide }) => {
  const inputRef = useRef();
  const socketApi = useSocket();
  const { t } = useTranslation();
  const channels = useSelector(({ channelsState }) => channelsState.channels);
  const currentChannel = channels.find((channel) => channel.id === id);

  const modalActions = {
    add: socketApi.createChannel,
    rename: socketApi.renameChannel,
  };

  const formik = useFormik({
    initialValues: { name: currentChannel?.name || '' },
    validationSchema: Yup.object({
      name: Yup.string()
        .required(t('errors.required'))
        .notOneOf(channels.map((i) => i.name), t('errors.alreadyExists')),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      await modalActions[modalName]({ ...values, id });
      onHide();
    },
  });

  useEffect(() => {
    inputRef.current.select();
  }, []);

  return (
    <Modal show onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t(`modals.${modalName}`)}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              className="mb-2"
              name="name"
              data-testid={`${modalName}-channel`}
              onChange={formik.handleChange}
              value={formik.values.name}
              ref={inputRef}
              isInvalid={formik.errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button type="button" className="me-2" variant="secondary" onClick={onHide}>{t('buttons.cancel')}</Button>
              <Button type="submit" variant="primary">{t('buttons.send')}</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddRename;
