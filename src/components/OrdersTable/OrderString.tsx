import React from "react";
import { CreateOrderResponse } from "../../redux/ordersSlice/ordersSliceType";

const OrderString: React.FC<{ order: CreateOrderResponse; index: number }> = ({
  order,
  index,
}) => {
  return (
    <tr>
      <td>{index + 1}</td>
      <td className="date">{order.time.startDate}</td>
      <td className="type">{order.orderType}</td>
      <td className="name">{order.orderStatus}</td>
      <td className="comment">{order?.phoneNumber}</td>
      <td>{order.cost}</td>
    </tr>
  );
};

export default OrderString;
