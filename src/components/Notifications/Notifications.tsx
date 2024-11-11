import React from "react";
import { useAppSelector } from "../../hooks";
import {
  selectActiveOrders,
  selectNotificationOrders,
  selectRole,
  selectUserApprovedOrders,
  selectUserEndedOrders,
} from "../../redux/selectors";
import { CreateOrderResponse} from "../../redux/ordersSlice/ordersSliceType";
import NotificationCard from "../NotificationCard/NotificationCard";
import OrdersTable from "../OrdersTable/OrdersTable";

const Notifications: React.FC = () => {
  const notifications = useAppSelector(selectNotificationOrders) as CreateOrderResponse[];
  const activeOrders = useAppSelector(selectActiveOrders);
  const userApprovedOrders = useAppSelector(selectUserApprovedOrders);
  const userNotifications = useAppSelector(selectUserEndedOrders);
  const role = useAppSelector(selectRole);

  return (
    <div className={`flex-1 ${role === "user" && "md:flex justify-center md:gap-[50px]"} p-[20px] text-sm`}>
    {((role === "user" && userNotifications.length > 0) || (role === "admin" && notifications.length > 0)) && 
      <section className={`w-[100%] mb-[20px] ${role === "user" && "lg:w-[550px]"}  p-[20px] md:py-[40px] md:px-[60px] rounded-lg box-shadow primary-background border border-color`}>
        {role === "user" && 
          <h2 className="accent-text text-left font-bold mb-[20px] text-[16px]">
            You have orders whose duration ends today! Don't forget to return of
            the car to its place.
          </h2>
        }

        {role === "admin" && (
          <h2 className="accent-text text-left font-bold mb-[20px] text-[16px]">
            You have orders whose duration ends today! Don't forget to confirm
            the return of the car to its place.
          </h2>
        )}
        <ul className="">
          {userNotifications?.length > 0 &&
            userNotifications?.map((order:CreateOrderResponse, index:number) => {
              return (
                <NotificationCard key={index} type="notification" order={order}/>
              );
            })}

          {notifications?.length > 0 && <OrdersTable ordersList={notifications}/>}
        </ul>
      </section>}
      
      {( (role === "user" && userApprovedOrders.length > 0) || (role === "admin" && activeOrders.length > 0) ) && 
      <section className={`w-[100%] ${role === "user" && "lg:w-[550px]"}  p-[20px] md:py-[40px] md:px-[60px] rounded-lg box-shadow primary-background border border-color`}>
        {(role === "user") && (
          <h2 className="accent-text text-left font-bold mb-[20px] text-[16px]">
            Your order has been confirmed by the company manager. We are
            expecting you to pick up the car at the agreed time.
          </h2>
        )}
        {role === "admin" && (
          <h2 className="accent-text text-left font-bold mb-[20px] text-[16px]">
            You have new orders that require your urgent confirmation.
          </h2>
        )}
        <ul>
          {(role === "admin" &&
            activeOrders?.length > 0) && <OrdersTable ordersList={activeOrders}/>}
          {role === "admin" && activeOrders?.length === 0 && <div>0</div>}

          {role === "user" &&
            userApprovedOrders?.length > 0 &&
            userApprovedOrders.map((order:CreateOrderResponse, index:number) => {
              return <NotificationCard key={index} type="notification" order={order}/>
            })}
          {role === "user" && userApprovedOrders?.length === 0 && <div>0</div>}
        </ul>
      </section>}
      
    </div>
  );
};

export default Notifications;
