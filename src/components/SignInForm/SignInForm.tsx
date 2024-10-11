import React from 'react';
import { useFormik } from "formik";
import Button from '../Button/Button';

const SignInForm: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
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

    <label htmlFor="password">Password</label>
    <input
      id="password"
      name="password"
      type="password"
      onChange={formik.handleChange}
      value={formik.values.password}
    />

    <Button type="submit"  buttonName="Submit"></Button>
  </form>
  )
}

export default SignInForm