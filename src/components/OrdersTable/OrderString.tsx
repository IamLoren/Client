import React from "react";
import { CreateOrderResponse } from "../../redux/ordersSlice/ordersSliceType";

const OrderString: React.FC<{ order: CreateOrderResponse; index: number }> = ({
  order,
  index,
}) => {
  return (
    <tr className="bg-white even:bg-gray-50 hover:bg-gray-100 transition-colors">
      <td className="p-2 border-b border-gray-200 text-center">{index + 1}</td>
      <td className="p-2 border-b border-gray-200 text-center">{order.time.startDate}</td>
      <td className={`p-2 border-b border-gray-200 text-center font-medium ${
          order.orderType === "rent" ? "text-green-600" : "text-red-600"
        }`}>{order.orderType}</td>
      <td className="p-2 border-b border-gray-200 text-center text-sm font-semibold">
        {order.orderStatus}
      </td>
      <td className="p-2 border-b border-gray-200 text-center">{order?.phoneNumber}</td>
      <td  className={`p-2 border-b border-gray-200 text-center font-medium ${
          order.orderType === "rent" ? "text-green-600" : "text-red-600"
        }`}>
        {order.cost}
      </td>
    </tr>
  );
};

export default OrderString;
