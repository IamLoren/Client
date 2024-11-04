import React from "react";
import OrderString from "./OrderString";
import { CreateOrderResponse } from "../../redux/ordersSlice/ordersSliceType";

const OrdersTable: React.FC<{ ordersList: CreateOrderResponse[] }> = ({
  ordersList,
}) => {
  return (
    <div>
      <table className="">
        <thead>
          <tr>
            <th>Number</th>
            <th>Date</th>
            <th>Type</th>
            <th>Status</th>
            <th>Phone number</th>
            <th>Sum</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {ordersList?.map((order, index) => (
            <OrderString key={order._id} order={order} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
