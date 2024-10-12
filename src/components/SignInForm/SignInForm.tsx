import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../Button/Button";

const SignInForm: React.FC = () => {
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string()
      .min(8, "Must be at least 8 characters")
      .required("Password is required"),
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
    <form onSubmit={formik.handleSubmit} >
      <label
        htmlFor="email"
        className="mb-1 block text-sm font-medium primary-text"
      >
        Email Address
      </label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
        placeholder="your@email.com"
        className={`block w-full rounded-md p-[5px] mb-[20px] border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'} outline-blue-200 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500`}
      />
      {formik.touched.email && formik.errors.email ? (
        <div className="absolute top-[90px]  text-xs text-red-700">{formik.errors.email}</div>
      ) : null}

      <label
        htmlFor="password"
        className="mb-1 block text-sm font-medium primary-text"
      >
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
        placeholder="Password"
        className={`block w-full rounded-md p-[5px] mb-[20px] outline-blue-200 border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500`}
      />
      {formik.touched.password && formik.errors.password ? (
        <div className="absolute top-[170px]  text-xs text-red-700">{formik.errors.password}</div>
      ) : null}

      <Button type="submit" buttonName="Submit" style="block ml-auto"></Button>
    </form>
  );
};

export default SignInForm;
