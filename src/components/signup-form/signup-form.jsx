import React, { useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import routes from '../../routes.js';
import { useAuth } from '../../hooks';
import getToken from '../../getToken.js';

const SignupForm = () => {
  const { t } = useTranslation();
  const inputRef = useRef();
  const auth = useAuth();
  const history = useHistory();
  const [signupFailed, setSignupFailed] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required(t('errors.required'))
        .min(3, t('errors.lengthLimits'))
        .max(20, t('errors.lengthLimits')),
      password: Yup.string().required(t('errors.required')).min(6, t('errors.noLessThan')),
      confirmPassword: Yup.string()
        .required(t('errors.required'))
        .oneOf([Yup.ref('password'), null], t('errors.mustMatch')),
    }),
    onSubmit: async ({ username, password }) => {
      setSignupFailed(false);
      try {
        await getToken(routes.signupPath(), { username, password });
        auth.logIn();
        history.push('/');
      } catch (err) {
        if (err.isAxiosError && err.response.status === 409) {
          setSignupFailed(true);
          return;
        }
        throw err;
      }
    },
  });

  return (
    <Form className="w-50" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">{t('registration')}</h1>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          type="text"
          name="username"
          autoComplete="username"
          id="username"
          placeholder={t('errors.lengthLimits')}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          isInvalid={(formik.errors.username && formik.touched.username) || signupFailed}
          ref={inputRef}
        />
        <Form.Label htmlFor="username">{t('username')}</Form.Label>
        {formik.errors.username ? <div className="invalid-tooltip">{formik.errors.username}</div> : null}
      </Form.Group>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          type="password"
          name="password"
          autoComplete="new-password"
          id="password"
          aria-describedby="passwordHelpBlock"
          placeholder={t('errors.noLessThan')}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          isInvalid={(formik.errors.password && formik.touched.password) || signupFailed}
        />
        <Form.Label htmlFor="password">{t('password')}</Form.Label>
        {formik.errors.password ? <div className="invalid-tooltip">{formik.errors.password}</div> : null}
      </Form.Group>
      <Form.Group className="form-floating mb-4">
        <Form.Control
          type="password"
          name="confirmPassword"
          autoComplete="new-password"
          id="confirmPassword"
          placeholder={t('errors.mustMatch')}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          isInvalid={
            (formik.errors.confirmPassword && formik.touched.confirmPassword) || signupFailed
          }
        />
        <Form.Label htmlFor="confirmPassword">{t('confirmPassword')}</Form.Label>
        {formik.errors.confirmPassword ? <div className="invalid-tooltip">{formik.errors.confirmPassword}</div> : null}
        {signupFailed ? <div className="invalid-tooltip">{t('errors.userExists')}</div> : null}
      </Form.Group>
      <Button className="w-100" type="submit" variant="outline-primary">
        {t('registrationButton')}
      </Button>
    </Form>
  );
};

export default SignupForm;
