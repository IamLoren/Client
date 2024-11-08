import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../Button/Button";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  getSelectedCar,
  selectEndRentalDate,
  selectStartRentalDate,
  userData,
} from "../../redux/selectors";
import { closeModal } from "../../redux/modalSlice/modalSlice";
import { createOrderThunk } from "../../redux/ordersSlice/operations";
import { calculateRentalCost } from "../../services";

interface RentalFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  carName: string;
  startDate: string;
  endDate: string;
  finalCost: number;
  orderType: "oil change" | "maintenance" | "repair" | "insurance";
  orderStatus: "active" | "inProgress" | "completed";
  additionally: string;
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
  startDate: Yup.date().required("Start date is required").nullable(),
  endDate: Yup.date()
    .required("End date is required")
    .nullable()
    .min(Yup.ref("startDate"), "End date cannot be earlier than start date"),
    finalCost: Yup.number().required("Cost is required"),
    orderType: Yup.string().required("Order type is required"),
    orderStatus: Yup.string().required("Order status is required"),
    additionally: Yup.string().required("Indicate who the executor is and the means of communication with him"),
});

const AdminOrderForm: React.FC = () => {
  const user = useAppSelector(userData);
  const selectedCar = useAppSelector(getSelectedCar);
  const startDate = useAppSelector(selectStartRentalDate);
  const endDate = useAppSelector(selectEndRentalDate);
  const dispatch = useAppDispatch();

  const initialValues: RentalFormValues = {
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    phoneNumber: "",
    carName: `${selectedCar?.make} ${selectedCar?.model} `,
    startDate: new Date(startDate).toLocaleString(),
    endDate: new Date(endDate).toLocaleString(),
    finalCost: 0,
    orderType: "oil change",
    orderStatus: "active",
    additionally: ""
  };

  const handleSubmit = (values: RentalFormValues) => {
    if (!selectedCar || !user) {
      console.error("Car or user is not selected");
      return;
    }
    const rentalCost = calculateRentalCost(
      startDate,
      endDate,
      selectedCar.price
    );
    dispatch(
      createOrderThunk({
        clientEmail: values.email,
        phoneNumber: values.phoneNumber,
        carId: selectedCar?._id,
        clientId: user.userId,
        orderType: "rent",
        time: { startDate: values.startDate, endDate: values.endDate },
        cost: rentalCost,
        createdBy: user.role,
        adminApprove: true,
      })
    );
    console.log("Submitted values:", {
      ...values,
      carId: selectedCar?._id,
      userId: user.userId,
      orderType: "rent",
    });
    dispatch(closeModal());
  };

  return (
    <>
      <h2 className="text-lg font-bold mb-2">Create new order</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        <Form
          className="flex gap-[20px] max-w-lg mx-auto secondary-text"
          data-cy="rentalCarForm"
        >
          <div className="w-[300px]">
            <div className="mb-2">
              <label htmlFor="firstName" className="block font-medium ">
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
              <label htmlFor="lastName" className="block font-medium">
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
              <label htmlFor="email" className="block font-medium">
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
              <label htmlFor="phoneNumber" className="block font-medium">
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
              <label htmlFor="carName" className="block font-medium">
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
              <label htmlFor="startDate" className="block font-medium">
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
          </div>

          <div className="w-[300px]">
            <div className="mb-2">
              <label htmlFor="endDate" className="block font-medium">
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

            <div className="mb-2">
              <label htmlFor="finalCost" className="block font-medium">
                Final cost, $
              </label>
              <Field
                id="finalCost"
                name="finalCost"
                className="block w-full px-4 py-1 secondary-background border border-gray-300 rounded-md shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:ring-offset-0"
              />
              <ErrorMessage
                name="finalCost"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            <div className="mb-2">
              <label htmlFor="orderType" className="block font-medium">
                Order Type
              </label>
              <Field
                as="select"
                id="orderType"
                name="orderType"
                className="block w-full px-4 py-1 secondary-background border border-gray-300 rounded-md shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:ring-offset-0"
              >
                <option value="oil change" label="Oil Change" />
                <option value="repair" label="Repair" />
                <option value="maintenance" label="Maintenance" />
                <option value="insurance" label="Insurance" />
              </Field>
              <ErrorMessage
                name="orderType"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="orderStatus" className="block font-medium">
                Order Status
              </label>
              <Field
                as="select"
                id="orderStatus"
                name="orderStatus"
                className="block w-full px-4 py-1 secondary-background border border-gray-300 rounded-md shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:ring-offset-0"
              >
                <option value="active" label="Active" />
                <option value="inProgress" label="In Progress" />
                <option value="completed" label="Completed" />
              </Field>
              <ErrorMessage
                name="orderStatus"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="additionally" className="block font-medium">
                Additionally
              </label>
              <Field
                as="textarea"
                id="additionally"
                name="additionally"
                placeholder="Indicate who the executor is and the means of communication with him"
                className="block w-full h-[98px] px-4 py-1 secondary-background border border-gray-300 rounded-md shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:ring-offset-0"
              /> 
              <ErrorMessage
                name="additionally"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            <Button type="submit" buttonName="Place Order" style="block ml-auto" />
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default AdminOrderForm;
