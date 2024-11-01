import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../Button/Button";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getSelectedCar, selectEndRentalDate, selectStartRentalDate, userData } from "../../redux/selectors";
import { closeModal } from "../../redux/modalSlice/modalSlice";

interface RentalFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  carName: string;
  startDate: string;
  endDate: string;
}

const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^\+1\s\d{3}\s\d{3}\s\d{4}$/, "Invalid phone format"),
  carName: Yup.string().required("Car name is required"),
  startDate: Yup.date()
    .required("Start date is required")
    .nullable(),
  endDate: Yup.date()
    .required("End date is required")
    .nullable()
    .min(
      Yup.ref("startDate"),
      "End date cannot be earlier than start date"
    ),
});

const RentalCarForm: React.FC = () => {
  const user = useAppSelector(userData);
  const selectedCar = useAppSelector(getSelectedCar);
  const startDate = useAppSelector(selectStartRentalDate);
  const endDate = useAppSelector(selectEndRentalDate);
  const dispatch = useAppDispatch()

  const initialValues: RentalFormValues = {
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    phoneNumber: "",
    carName: `${selectedCar?.make} ${selectedCar?.model} `,
    startDate: new Date(startDate).toLocaleString(),
    endDate: new Date(endDate).toLocaleString(),
  };

  const handleSubmit = (values: RentalFormValues) => {
    console.log("Submitted values:", {...values, carId: selectedCar?._id, userId: user.userId});
    dispatch(closeModal());

  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      <Form className="max-w-lg mx-auto secondary-text" data-cy="rentalCarForm">
        <h2 className="text-lg font-bold mb-2">Car Rental Order Form</h2>

        <div className="mb-2">
          <label htmlFor="firstName" className="block font-medium mb-2">
            First Name
          </label>
          <Field
            id="firstName"
            name="firstName"
            type="text"
            className="block w-full px-4 py-1 secondary-background border border-gray-300 rounded-md shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:ring-offset-0"
          />
          <ErrorMessage
            name="firstName"
            component="div"
            className="text-red-600 text-sm"
          />
        </div>

        <div className="mb-2">
          <label htmlFor="lastName" className="block font-medium mb-2">
            Last Name
          </label>
          <Field
            id="lastName"
            name="lastName"
            type="text"
            className="block w-full px-4 py-1 secondary-background border border-gray-300 rounded-md shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:ring-offset-0"
          />
          <ErrorMessage
            name="lastName"
            component="div"
            className="text-red-600 text-sm"
          />
        </div>

        <div className="mb-2">
          <label htmlFor="email" className="block font-medium mb-2">
            Email
          </label>
          <Field
            id="email"
            name="email"
            type="email"
            className="block w-full px-4 py-1 secondary-background border border-gray-300 rounded-md shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:ring-offset-0"
          />
          <ErrorMessage
            name="email"
            component="div"
            className="text-red-600 text-sm"
          />
        </div>

        <div className="mb-2">
          <label htmlFor="phoneNumber" className="block font-medium mb-2">
            Phone number
          </label>
          <Field
            id="phoneNumber"
            name="phoneNumber"
            type="text"
            pattern="^\+1\s\d{3}\s\d{3}\s\d{4}$"
            placeholder="+1 000 000 0000"
            className="block w-full px-4 py-1 secondary-background border border-gray-300 rounded-md shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:ring-offset-0"
          />
          <ErrorMessage
            name="phoneNumber"
            component="div"
            className="text-red-600 text-sm"
          />
        </div>

        <div className="mb-2">
          <label htmlFor="carName" className="block font-medium mb-2">
            Car name
          </label>
          <Field
            id="carName"
            name="carName"
            type="text"
            className="block w-full px-4 py-1 secondary-background border border-gray-300 rounded-md shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:ring-offset-0"
            disabled={true}
          />
          <ErrorMessage
            name="carName"
            component="div"
            className="text-red-600 text-sm"
          />
        </div>

        <div className="mb-2">
          <label htmlFor="startDate" className="block font-medium mb-2">
            Start date
          </label>
          <Field
            id="startDate"
            name="startDate"
            readOnly
            className="block w-full px-4 py-1 secondary-background border border-gray-300 rounded-md shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:ring-offset-0"
          />
          <ErrorMessage
            name="startDate"
            component="div"
            className="text-red-600 text-sm"
          />
        </div>

        <div className="mb-2">
          <label htmlFor="endDate" className="block font-medium mb-2">
            End date
          </label>
          <Field
            id="endDate"
            name="endDate"
            readOnly
            className="block w-full px-4 py-1 secondary-background border border-gray-300 rounded-md shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:ring-offset-0"
          />
          <ErrorMessage
            name="endDate"
            component="div"
            className="text-red-600 text-sm"
          />
        </div>

        <Button type="submit" buttonName="Place Rental Order" />
      </Form>
    </Formik>
  );
};

export default RentalCarForm;
