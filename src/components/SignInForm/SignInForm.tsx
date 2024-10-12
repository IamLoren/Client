import React from 'react';
import { useFormik } from "formik";
import * as Yup from 'yup';
import Button from '../Button/Button';

const SignInForm: React.FC = () => {

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
    password: Yup.string()
      .min(8, 'Must be at least 8 characters')
      .required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
    <label htmlFor="email">Email Address</label>
    <input
      id="email"
      name="email"
      type="email"
      onChange={formik.handleChange}
      value={formik.values.email}
    />
    {formik.touched.email && formik.errors.email ? (
        <div>{formik.errors.email}</div>
      ) : null}

    <label htmlFor="password">Password</label>
    <input
      id="password"
      name="password"
      type="password"
      onChange={formik.handleChange}
      value={formik.values.password}
    />
    {formik.touched.password && formik.errors.password ? (
        <div>{formik.errors.password}</div>
      ) : null}

    <Button type="submit"  buttonName="Submit"></Button>
  </form>
  )
}

export default SignInForm