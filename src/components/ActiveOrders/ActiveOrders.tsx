import React from "react";
import { useAppSelector } from "../../hooks";
import { selectActiveOrders } from "../../redux/selectors";
import OrdersTable from "../OrdersTable/OrdersTable";

const ActiveOrders: React.FC = () => {
  const activeOrders = useAppSelector(selectActiveOrders);

  return (
    <section>
        <h2 className='font-bold text-[20px] mb-1 sm:mb-2 md:mb-3 primary-text'>Active orders</h2>
      <OrdersTable ordersList={activeOrders} />
    </section>
  );
};

export default ActiveOrders;
