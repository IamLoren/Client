import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { CiCirclePlus } from "react-icons/ci";
import { selectActiveOrders, selectAllOrders } from "../../redux/selectors";
import OrdersTable from "../OrdersTable/OrdersTable";
import { openAdminOrderForm, openModal } from "../../redux/modalSlice/modalSlice";

const OrdersList: React.FC = () => {
    const dispatch = useAppDispatch();
  const allOrders = useAppSelector(selectAllOrders);
  const activeOrders = useAppSelector(selectActiveOrders);
  const repairingCar = allOrders.filter(
    (order) =>
      order.orderStatus === "inProgress" &&
      (order.orderType === "oil change" ||
        order.orderType === "repair" ||
        order.orderType === "maintenance")
  );
  const overTimedOrders = allOrders.filter(
    (order) =>
      order.orderStatus === "inProgress" &&
      new Date(order.time.endDate) < new Date()
  );

  const handleButtonClick = () => {
    dispatch(openModal());
    dispatch(openAdminOrderForm());
  };

  return (
    <section className="p-[10px] md:p-[20px] flex-1">
      <h2 className="font-bold text-[20px] mb-1 sm:mb-2 md:mb-3 primary-text">
        Orders
      </h2>
      <ul className="flex flex-wrap gap-[10px] mb-[10px] md:mb-[20px] ">
        <li className="w-[145px] h-[50px] border border-color rounded-md p-[5px] shadow-lg">
          <p className="text-center secondary-text text-[12px] font-medium">
            Total orders
          </p>
          <span className=" block text-center">{allOrders.length}</span>
        </li>
        <li className="w-[145px] h-[50px] border border-color rounded-md p-[5px] shadow-lg">
          <p className="text-center secondary-text text-[12px] font-medium">
            Unapproved orders
          </p>
          <span className=" block text-center">{activeOrders.length}</span>
        </li>
        <li className="w-[145px] h-[50px] border border-color rounded-md p-[5px] shadow-lg">
          <p className="text-center secondary-text text-[12px] font-medium">
            Cars under repair
          </p>
          <span className=" block text-center">{repairingCar.length}</span>
        </li>
        <li className="w-[145px] h-[50px] border border-color rounded-md p-[5px] shadow-lg">
          <p className="text-center secondary-text text-[12px] font-medium">
            Orders over time
          </p>
          <span className=" block text-center">{overTimedOrders.length}</span>
        </li>
        <li className="flex justify-center self-center">
          <button onClick={handleButtonClick} type="button">
            <CiCirclePlus
              className="icon-plus"
              style={{ height: "45px", width: "45px" }}
            />
          </button>
        </li>
      </ul>

      <OrdersTable ordersList={allOrders} />
    </section>
  );
};

export default OrdersList;
