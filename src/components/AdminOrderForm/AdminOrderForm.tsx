import React, {ChangeEvent, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../Button/Button";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getSelectedCar, selectAllCars, selectEndRentalDate, selectStartRentalDate, userData } from "../../redux/selectors";
import { closeModal } from "../../redux/modalSlice/modalSlice";
import { createOrderThunk } from "../../redux/ordersSlice/operations";
import { CarInterface } from "../../redux/carRentalSlice/carRentalSliceTypes";
import DateTime from "../DateTime/DateTime";
import { changeSelectedCar } from "../../redux/carRentalSlice/carRentalSlice";
import { updateCarThunk } from "../../redux/carRentalSlice/operations";
import { CreateOrderResponse } from "../../redux/ordersSlice/ordersSliceType";

interface RentalFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  carName: string;
  carId?: string;
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
  finalCost: Yup.number().required("Cost is required").positive("Cost must be a positive number"),
  orderType: Yup.string().required("Order type is required"),
  orderStatus: Yup.string().required("Order status is required"),
  additionally: Yup.string().required(
    "Indicate who the executor is and the means of communication with him"
  ),
});

const AdminOrderForm: React.FC = () => {
  const dispatch = useAppDispatch(); 
  const user = useAppSelector(userData);
  const cars = useAppSelector(selectAllCars);
  const startDate = useAppSelector(selectStartRentalDate);
  const endDate = useAppSelector(selectEndRentalDate);
  const selectedCarObject = useAppSelector(getSelectedCar) as CarInterface;
 
  const [selectedCar, setSelectedCar] = useState("");
  const [filteredCars, setFilteredCars] = useState<CarInterface[]>([]);

  const selectCar = (event:ChangeEvent<HTMLInputElement>) => {
    const param = event.target.value;
    const inputCar = cars.filter(
      (car) =>
        car.make.toLowerCase().includes(param.toLowerCase()) ||
        car.model.toLowerCase().includes(param.toLowerCase())
    );
    if(inputCar.length=== 1) {
      dispatch(changeSelectedCar(inputCar[0]))
    }
    setSelectedCar(param)
    setFilteredCars(inputCar)
  };
  const handleCarClick = (car:CarInterface) => {
    dispatch(changeSelectedCar(car))
    setSelectedCar(`${car.make} ${car.model}`);
    setFilteredCars([]);
  };

  const initialValues: RentalFormValues = {
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    phoneNumber: "",
    carId: selectedCarObject?._id,
    carName: selectedCar,
    startDate: startDate,
    endDate: endDate,
    finalCost: 0,
    orderType: "oil change",
    orderStatus: "active",
    additionally: "",
  };

  const handleSubmit = async (values: RentalFormValues) => {
    try {
      const newOrder = await dispatch(
      createOrderThunk({
        clientEmail: values.email,
        phoneNumber: values.phoneNumber,
        carId: selectedCarObject?._id,
        clientId: user.userId,
        orderType: values.orderType,
        orderStatus: values.orderStatus,
        time: { startDate, endDate},
        cost: values.finalCost,
        createdBy: user.role,
        adminApprove: true,
        additionally: values.additionally
      })
    );
    if(!newOrder) {
      throw new Error("Order was not created")
    }
    const orderId = (newOrder.payload as CreateOrderResponse)?._id;
    dispatch(updateCarThunk({id:selectedCarObject._id, carToUpdate:{orderId,  startDate, endDate}}))
    dispatch(closeModal());
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  
  };

  return (
    <>
      <h2 className="text-lg font-bold mb-2">Create new order</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={handleSubmit}
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
                disabled={true}
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
                disabled={true}
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

            <div className="mb-2 relative">
              <label htmlFor="carName" className="block font-medium">
                Car name
              </label>
              <Field
                onChange={selectCar}
                id="carName"
                name="carName"
                type="text"
                value={selectedCar}
                autoComplete="off"
                className="block w-full px-4 py-1 secondary-background border border-gray-300 rounded-md shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:ring-offset-0"
              />
              {(filteredCars.length > 0) && (
                <ul className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1">
                  {filteredCars.map((car) => (
                    <li
                      key={car._id}
                      onClick={() => handleCarClick(car)}
                      className="px-4 py-2 cursor-pointer hover:bg-primary-100"
                    >
                      {car.make} {car.model}
                    </li>
                  ))}
                </ul>
              )}
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
              <DateTime name="Pick-Up"/>
            </div>
          </div>

          <div className="w-[300px]">
            <div className="mb-2">
              <label htmlFor="endDate" className="block font-medium">
                End date
              </label>
              <DateTime name="Drop-Off"/>
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

            <Button
              type="submit"
              buttonName="Place Order"
              style="block ml-auto"
            />
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default AdminOrderForm;
