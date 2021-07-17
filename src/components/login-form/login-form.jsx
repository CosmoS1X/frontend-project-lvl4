import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import routes from '../../routes.js';
import { useAuth } from '../../hooks';

const LoginForm = () => {
  const { t } = useTranslation();
  const inputRef = useRef();
  const auth = useAuth();
  const history = useHistory();
  const [authFailed, setAuthFailed] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        await auth.getToken(routes.loginPath(), values);
        auth.logIn();
        history.push(routes.mainPage());
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          return;
        }
        throw err;
      }
    },
  });

  return (
    <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">{t('login')}</h1>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          type="text"
          onChange={formik.handleChange}
          value={formik.values.username}
          placeholder={t('nickname')}
          name="username"
          id="username"
          autoComplete="username"
          required
          isInvalid={authFailed}
          ref={inputRef}
        />
        <Form.Label htmlFor="username">{t('nickname')}</Form.Label>
      </Form.Group>
      <Form.Group className="form-floating mb-4">
        <Form.Control
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder={t('password')}
          name="password"
          id="password"
          autoComplete="current-password"
          required
          isInvalid={authFailed}
        />
        <Form.Label htmlFor="password">{t('password')}</Form.Label>
        {authFailed ? <div className="invalid-tooltip">{t('errors.authFailed')}</div> : null}
      </Form.Group>
      <Button className="w-100 mb-3" type="submit" variant="outline-primary">{t('login')}</Button>
    </Form>
  );
};

export default LoginForm;
