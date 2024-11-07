import React from "react";
import { useAppSelector } from "../../hooks";
import {
  selectActiveOrders,
  selectNotificationOrders,
  selectRole,
  selectUserApprovedOrders,
  selectUserEndedOrders,
} from "../../redux/selectors";

const Notifications: React.FC = () => {
  const notifications = useAppSelector(selectNotificationOrders);
  const activeOrders = useAppSelector(selectActiveOrders);
  const userApprovedOrders = useAppSelector(selectUserApprovedOrders);
  const userNotifications = useAppSelector(selectUserEndedOrders);
  const role = useAppSelector(selectRole);

  return (
    <div className="flex-1 md:flex md:gap-[30px] p-[20px] text-sm">
      <section className="w-[100%] md:w-[350px]">
        {role === "user" && (
          <h2 className="text-red-700 text-center mb-[10px]">
            You have orders whose duration ends today! Don't forget to return of
            the car to its place.
          </h2>
        )}

        {role === "admin" && (
          <h2 className="text-red-700 text-center mb-[10px]">
            You have orders whose duration ends today! Don't forget to confirm
            the return of the car to its place.
          </h2>
        )}
        <ul className="">
          {userNotifications?.length > 0 &&
            userNotifications?.map((order, index) => {
              return (
                <li key={order._id} className="mb-[10px] p-[10px] border rounded-lg border-color box-shadow">
                  {Object.keys(order).map((k) => {
                    if (k === "time") {
                      return (
                        <div className="w-[300px]" key={`${index}-${k}`}>
                          {`${k}: start: ${new Date(
                            order[k]?.startDate
                          ).toLocaleString()}
                       returning: ${new Date(
                         order[k]?.endDate
                       ).toLocaleString()}`}
                        </div>
                      );
                    }
                    return (
                      <div key={`${index}-${k}`}>{`${k}: ${order[k]}`}</div>
                    );
                  })}
                </li>
              );
            })}

          {notifications?.length > 0 &&
            notifications?.map((order, index) => {
              return (<li key={order._id} className="mb-[10px] p-[10px] border rounded-lg border-color box-shadow">
                {Object.keys(order).map((k) => {
                  if (k === "time") {
                    return (
                      <div className="w-[300px]" key={`${index}-${k}`}>
                        {`${k}: start: ${new Date(
                          order[k]?.startDate
                        ).toLocaleString()}
                     returning: ${new Date(
                       order[k]?.endDate
                     ).toLocaleString()}`}
                      </div>
                    );
                  }
                  return (
                    <div key={`${index}-${k}`}>{`${k}: ${order[k]}`}</div>
                  );
                })}
              </li>)
            })}
        </ul>
      </section>
      <section className="w-[100%] md:w-[350px]">
        {role === "user" && (
          <h2 className="text-red-700 text-center mb-[10px]">
            Your order has been confirmed by the company manager. We are
            expecting you to pick up the car at the agreed time.
          </h2>
        )}
        {role === "admin" && (
          <h2 className="text-red-700 text-center mb-[10px]">
            You have new orders that require your urgent confirmation.
          </h2>
        )}
        <ul>
          {role === "admin" &&
            activeOrders?.length > 0 &&
            activeOrders?.map((order, index) => {
              return (<li key={order._id} className="mb-[10px] p-[10px] border rounded-lg border-color box-shadow">
                {Object.keys(order).map((k) => {
                  if (k === "time") {
                    return (
                      <div className="w-[300px]" key={`${index}-${k}`}>
                        {`${k}: start: ${new Date(
                          order[k]?.startDate
                        ).toLocaleString()}
                     returning: ${new Date(
                       order[k]?.endDate
                     ).toLocaleString()}`}
                      </div>
                    );
                  }
                  return (
                    <div key={`${index}-${k}`}>{`${k}: ${order[k]}`}</div>
                  );
                })}
              </li>)
            })}
          {role === "admin" && activeOrders?.length === 0 && <div>0</div>}

          {role === "user" &&
            userApprovedOrders?.length > 0 &&
            userApprovedOrders.map((order, index) => {
              return (<li key={order._id} className="mb-[10px] p-[10px] border rounded-lg border-color box-shadow">
                {Object.keys(order).map((k) => {
                  if (k === "time") {
                    return (
                      <div className="w-[300px]" key={`${index}-${k}`}>
                        {`${k}: start: ${new Date(
                          order[k]?.startDate
                        ).toLocaleString()}
                     returning: ${new Date(
                       order[k]?.endDate
                     ).toLocaleString()}`}
                      </div>
                    );
                  }
                  return (
                    <div key={`${index}-${k}`}>{`${k}: ${order[k]}`}</div>
                  );
                })}
              </li>)
            })}
          {role === "user" && userApprovedOrders?.length === 0 && <div>0</div>}
        </ul>
      </section>
    </div>
  );
};

export default Notifications;
