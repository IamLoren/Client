import React from "react";
import { CreateOrderResponse } from "../../redux/ordersSlice/ordersSliceType";
import { useAppSelector } from "../../hooks";
import { selectAllCars, selectRole } from "../../redux/selectors";
import { CarInterface } from "../../redux/carRentalSlice/carRentalSliceTypes";

const NotificationCard: React.FC<{
  order: CreateOrderResponse;
  type: "history" | "notification";
}> = ({ order, type }) => {
  const role = useAppSelector(selectRole);
  const AllCars = useAppSelector(selectAllCars) as CarInterface[];
  const car = AllCars.find((car) => car._id === order.carId);

  return (
    <li className={`notification-card mb-4 p-4 border rounded-lg shadow-lg box-shadow ${type === "notification" ? "secondary-background shadow-lg" : "primary-background" } primary-background primary-text`}>
    {role === "user" && type === "history" && (
      <div className="order-header text-xl font-semibold mb-2 ">
        You made an order for a car rental
      </div>
    )}
    <div className="car-info text-lg font-medium mb-2 accent-text">
      {car?.make} {car?.model}
    </div>
    <div className="order-dates text-sm mb-2">
      <span className="font-semibold accent-text">From:</span> {new Date(order.time.startDate).toLocaleString()} <br />
      <span className="font-semibold accent-text">To:</span> {new Date(order.time.endDate).toLocaleString()}
    </div>
    {role === "user" && type === "history" && (
      <div className="order-status text-sm secondary-text">
        The status of this order: <span className="font-bold accent-text">{order.orderStatus}</span>
      </div>
    )}
  </li>
    
  );
};

export default NotificationCard;
