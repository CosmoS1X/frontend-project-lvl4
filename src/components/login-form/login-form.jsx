/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Formik, Form, useField } from 'formik';

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="form-control" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const LoginForm = () => (
  <Formik
    initialValues={{
      username: '',
      password: '',
    }}
    onSubmit={() => console.log('Submited')}
  >
    <Form className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 className="text-center mb-4">Войти</h1>
      <div className="form-floating mb-3 form-group">
        <MyTextInput
          label="Ваш ник"
          name="username"
          required
          id="username"
          type="text"
        />
      </div>
      <div className="form-floating mb-4 form-group">
        <MyTextInput
          label="Пароль"
          name="password"
          required
          id="password"
          type="password"
        />
      </div>
      <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
    </Form>
  </Formik>
);

export default LoginForm;
