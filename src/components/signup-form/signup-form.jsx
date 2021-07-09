import React, { useEffect, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

const SignupForm = () => {
  const { t } = useTranslation();
  const inputRef = useRef();

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
      password: Yup.string()
        .required(t('errors.required'))
        .min(6, t('errors.noLessThan')),
      confirmPassword: Yup.string()
        .required(t('errors.required'))
        .oneOf([Yup.ref('password'), null], t('errors.mustMatch')),
    }),
    onSubmit: (values) => console.log(values),
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
          placeholder="От 3 до 20 символов"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          isInvalid={formik.errors.username && formik.touched.username}
          ref={inputRef}
        />
        <Form.Label htmlFor="username">{t('username')}</Form.Label>
        <Form.Control.Feedback type="invalid">
          {formik.errors.username}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          type="password"
          name="password"
          autoComplete="new-password"
          id="password"
          aria-describedby="passwordHelpBlock"
          placeholder="Не менее 6 символов"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          isInvalid={formik.errors.password && formik.touched.password}
        />
        <Form.Label htmlFor="password">{t('password')}</Form.Label>
        <Form.Control.Feedback type="invalid">
          {formik.errors.password}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="form-floating mb-4">
        <Form.Control
          type="password"
          name="confirmPassword"
          autoComplete="new-password"
          id="confirmPassword"
          placeholder="Пароли должны совпадать"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          isInvalid={formik.errors.confirmPassword && formik.touched.confirmPassword}
        />
        <Form.Label htmlFor="password">{t('confirmPassword')}</Form.Label>
        <Form.Control.Feedback type="invalid">
          {formik.errors.confirmPassword}
        </Form.Control.Feedback>
      </Form.Group>
      <Button className="w-100" type="submit" variant="outline-primary">{t('registrationButton')}</Button>
    </Form>
  );
};

export default SignupForm;
