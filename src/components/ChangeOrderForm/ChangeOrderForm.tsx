import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../Button/Button";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  selectAllCars,
  selectAllUsers,
  selectEndRentalDate,
  selectOrderForChanging,
  selectStartRentalDate,
  userData,
} from "../../redux/selectors";
import { closeModal } from "../../redux/modalSlice/modalSlice";
import {
  getAllOrdersThunk,
  updateOrderThunk,
} from "../../redux/ordersSlice/operations";

interface ChangeOrderFormValues {
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
  startDate: Yup.date().required("Start date is required").nullable(),
  endDate: Yup.date()
    .required("End date is required")
    .nullable()
    .min(Yup.ref("startDate"), "End date cannot be earlier than start date"),
});

const ChangeOrderForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const order = useAppSelector(selectOrderForChanging);
  const allUsers = useAppSelector(selectAllUsers);
  const allCars = useAppSelector(selectAllCars);

  const contact = allUsers.find((user) => user._id === order?.clientId);
  const car = allCars.find((car) => car._id === order?.carId);
  console.log(car);
  const startDate = useAppSelector(selectStartRentalDate);
  const endDate = useAppSelector(selectEndRentalDate);

  const initialValues: ChangeOrderFormValues = {
    firstName: contact.firstName || "",
    lastName: contact.lastName || "",
    email: contact.email || "",
    phoneNumber: order.phoneNumber,
    carName: `${car?.make} ${car?.model} `,
    startDate: new Date(order?.time.startDate).toLocaleString(),
    endDate: new Date(order?.time.endDate).toLocaleString(),
    finalCost: order.cost,
    orderType: order.orderType,
    orderStatus: order.orderStatus,
  };

  const handleSubmit =  async (values: ChangeOrderFormValues) => {
    const startDate = new Date(values.startDate).toISOString();
    const endDate = new Date(values.endDate).toISOString();
    console.log("Submitted values:", values);
   await dispatch(
      updateOrderThunk({
        id: order._id,
        orderToUpdate: {
          phoneNumber: values.phoneNumber,
          time: { startDate, endDate},
          createdBy: "admin",
          carId: order.carId,
          clientId: order.clientId,
          clientEmail: values.email,
          orderType: values.orderType,
          cost: values.finalCost,
          orderStatus: values.orderStatus,
        },
      })
    );
    await dispatch(getAllOrdersThunk());
    dispatch(closeModal());
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {/* <h2 className="text-lg font-bold mb-2">Change Rental Order Form</h2> */}
      <Form
        className=" flex gap-[30px] max-w-lg mx-auto secondary-text text-sm"
        data-cy="rentalCarForm"
      >
        <div>
          <div className="mb-2">
            <label htmlFor="firstName" className="block font-medium">
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
        </div>

        <div>
          <div className="mb-2">
            <label htmlFor="startDate" className="block font-medium">
              Start date
            </label>
            <Field
              id="startDate"
              name="startDate"
              className="block w-full px-4 py-1 secondary-background border border-gray-300 rounded-md shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:ring-offset-0"
            />
            <ErrorMessage
              name="startDate"
              component="div"
              className="text-red-600 text-sm"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="endDate" className="block font-medium">
              End date
            </label>
            <Field
              id="endDate"
              name="endDate"
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
              <option value={order.orderType} label={order.orderType} />
              <option value="rent" label="Rent" />
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
              <option value={order.orderStatus} label={order.orderStatus} />
              <option value="active" label="Active" />
              <option value="inProgress" label="In Progress" />
              <option value="completed" label="Completed" />
            </Field>
            <ErrorMessage
              name="orderType"
              component="div"
              className="text-red-600 text-sm"
            />
          </div>

          <Button
            type="submit"
            buttonName="Change Order Data"
            style="ml-auto"
          />
        </div>
      </Form>
    </Formik>
  );
};

export default ChangeOrderForm;