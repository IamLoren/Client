import React from "react";
import OrderString from "./OrderString";
import { CreateOrderResponse } from "../../redux/ordersSlice/ordersSliceType";

const OrdersTable: React.FC<{ ordersList: CreateOrderResponse[] }> = ({
  ordersList,
}) => {
  return (
    <div>
      <table className="w-full border-collapse rounded-lg overflow-hidden box-shadow">
        <thead className="secondary-background">
          <tr className="">
            <th className="p-[10px]">Number</th>
            <th className="p-[10px]">Date</th>
            <th className="p-[10px]">Type</th>
            <th className="p-[10px]">Status</th>
            <th className="p-[10px]">Phone number</th>
            <th className="p-[10px]">Sum, $</th>
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
