import React, { useEffect, useRef, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSocket } from '../../hooks';
import { actions } from '../../reducers';

const Add = ({ onHide }) => {
  const inputRef = useRef();
  const [submitting, setSubmitting] = useState(false);
  const socketApi = useSocket();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const channels = useSelector(({ channelsState }) => channelsState.channels);

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
      setSubmitting(true);
      const response = await socketApi.createChannel(values);
      dispatch(actions.changeChannel(response.id));
      onHide();
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal show onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.add')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              className="mb-2"
              name="name"
              data-testid="add-channel"
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
              <Button disabled={submitting} type="submit" variant="primary">{t('buttons.send')}</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
