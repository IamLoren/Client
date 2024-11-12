import React from "react";
import { CreateOrderResponse } from "../../redux/ordersSlice/ordersSliceType";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectAllCars, selectAllUsers } from "../../redux/selectors";
import {
  openAdminApproveForm,
  openChangeOrderForm,
  openModal,
} from "../../redux/modalSlice/modalSlice";
import { selectOrderForChanging } from "../../redux/ordersSlice/ordersSlice";

const OrderString: React.FC<{ order: CreateOrderResponse; index: number }> = ({
  order,
  index,
}) => {
  const dispatch = useAppDispatch();
  const allUsers = useAppSelector(selectAllUsers);
  const allCars = useAppSelector(selectAllCars);

  const contact = allUsers.find((user) => user._id === order.clientId);
  const car = allCars.find((car) => car._id === order.carId);

  const handleOrderClick = () => {
    dispatch(openModal());
    if (order.adminApprove === false) {
      dispatch(openAdminApproveForm());
    } else {
      dispatch(openChangeOrderForm());
    }
    dispatch(selectOrderForChanging(order));
  };

  return (
    <tr
      tabIndex={0}
      onClick={handleOrderClick}
      className="bg-white even:bg-gray-50 text-sm hover:bg-gray-100 transition-colors"
    >
      <td className="p-2 border-b border-gray-200 text-center">{index + 1}</td>
      <td className="p-2 border-b border-gray-200 text-center">
        {" "}
        {car ? `${car.make} ${car.model}` : "Unknown"}
      </td>
      <td className="w-[200px] text-sm p-2 border-b border-gray-200 text-center">
        {" "}
        {new Date(order?.time?.startDate).toLocaleString("en-GB", {
          timeZone: "UTC",
        })}{" "}
        -{" "}
        {new Date(order?.time?.endDate).toLocaleString("en-GB", {
          timeZone: "UTC",
        })}
      </td>
      <td
        className={`p-2 border-b border-gray-200 text-center font-medium ${
          order.orderType === "rent" ? "text-green-600" : "text-red-600"
        }`}
      >
        <span
          className={`inline-flex items-center rounded-md ${
            order.orderType === "rent"
              ? "bg-green-50 text-green-700 ring-green-600/20"
              : "text-red-600 bg-red-50 ring-red-600/20"
          } px-2 py-1 text-xs font-medium ring-1 ring-inset`}
        >
          {order.orderType}
        </span>
      </td>
      <td className="p-2 border-b border-gray-200 text-center text-sm font-semibold">
        {order.orderStatus}
      </td>
      <td className="p-2 border-b border-gray-200 text-center text-sm font-semibold">
        {contact?.firstName} {contact?.lastName}
      </td>
      <td className="p-2 border-b border-gray-200 text-center">
        {order?.phoneNumber}
      </td>
      <td
        className={`p-2 border-b border-gray-200 text-center font-medium ${
          order.orderType === "rent" ? "text-green-600" : "text-red-600"
        }`}
      >
        {order.cost}
      </td>
    </tr>
  );
};

export default OrderString;
