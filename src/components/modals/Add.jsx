import React, { useEffect, useRef } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Add = (props) => {
  // console.log('ADD MODAL PROPS', props);
  const { show, onHide, socket } = props;

  // const [invalid, setInvalid] = useState(false);

  const inputRef = useRef();

  useEffect(() => {
    console.log('show');
    // inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: Yup.object({
      name: Yup.string().required(),
    }),
    onSubmit: async (values) => {
      socket.volatile.emit('newChannel', values, (res) => {
        console.log(res.status);
      });

      formik.resetForm();
      onHide();
    },
  });

  // console.log('invalid', formik.errors.name);

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
              Обязательное поле
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

export default Add;
