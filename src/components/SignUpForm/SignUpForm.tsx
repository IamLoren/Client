import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../Button/Button";
import { registerThunk } from "../../redux/authSlice/operations";
import { RegTypes } from "../../redux/authSlice/authSliceTypes";
import { useAppDispatch } from "../../hooks";
import { closeModal } from "../../redux/modalSlice/modalSlice";

const SignUpForm: React.FC = () => {
const dispatch = useAppDispatch();

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(2, "Must be at least 2 characters")
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    lastName: Yup.string()
      .min(2, "Must be at least 2 characters")
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Required"),
    terms: Yup.bool()
      .oneOf([true], "You must accept the terms and conditions")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      terms: false,
    },
    validationSchema,
    onSubmit: (values: RegTypes, { resetForm }) => {
      const registerData = {...values, role:"user"};
     dispatch(registerThunk(registerData));
     resetForm();
      dispatch(closeModal());
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label
        htmlFor="firstName"
        className="block mb-1 text-sm font-medium primary-text"
      >
        First Name
      </label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.firstName}
        placeholder="First Name"
        className={`block w-full p-[5px] mb-[20px] rounded-md border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'} shadow-sm outline-blue-200 focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500`}
      />
      {formik.touched.firstName && formik.errors.firstName ? (
        <div className="absolute top-[90px]  text-xs text-red-700">{formik.errors.firstName}</div>
      ) : null}

      <label
        htmlFor="lastName"
        className="block mb-1 text-sm font-medium primary-text"
      >
        Last Name
      </label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.lastName}
        placeholder="Last Name"
        className={`block w-full p-[5px] mb-[20px]  rounded-md outline-blue-200 border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500`}
      />
      {formik.touched.lastName && formik.errors.lastName ? (
        <div className="absolute top-[170px]  text-xs text-red-700">{formik.errors.lastName}</div>
      ) : null}

      <label
        htmlFor="email"
        className="block mb-1 text-sm font-medium primary-text"
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
        className={`block w-full p-[5px] mb-[20px] rounded-md outline-blue-200 border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500`}
      />
      {formik.touched.email && formik.errors.email ? (
        <div className="absolute top-[250px]  text-xs text-red-700">{formik.errors.email}</div>
      ) : null}

      <label
        htmlFor="password"
        className="block mb-1 text-sm font-medium primary-text"
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
        className={`block w-full p-[5px] mb-[20px]  rounded-md outline-blue-200 border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500`}
      />
      {formik.touched.password && formik.errors.password ? (
        <div className="absolute top-[330px]  text-xs text-red-700">{formik.errors.password}</div>
      ) : null}

      <div className="flex mb-[20px] items-center space-x-2">
        <input
          type="checkbox"
          name="terms"
          id="terms"
          onChange={formik.handleChange} 
          checked={formik.values.terms} 
          className="h-4 w-4 rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400"
        />
        <label
          htmlFor="terms"
          className=" block  text-sm font-medium primary-text"
        >
          I accept the terms and conditions
        </label>
      </div>
      {formik.touched.terms && formik.errors.terms ? (
        <div className="absolute top-[370px]  text-xs text-red-700">{formik.errors.terms}</div>
      ) : null}
      <Button type="submit" buttonName="Submit" style="block ml-auto"></Button>
    </form>
  );
};

export default SignUpForm;
