import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getClientHistory } from "../../redux/ordersSlice/operations";
import { selectUserId, selectUserOrdersHistory } from "../../redux/selectors";
import NotificationCard from "../NotificationCard/NotificationCard";

const ClientsHistory: React.FC = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);
  const history = useAppSelector(selectUserOrdersHistory);

  useEffect(() => {
    dispatch(getClientHistory(userId));
  }, [dispatch, userId]);

  return (
    <>
      {history?.length === 0 && <p>You have not created orders yet</p>}
      {history?.length > 0 && (
        <ul className="flex flex-wrap gap-[10px] p-[20px]">
          {history.map((order, index:number) => {
            return <NotificationCard key={index} type="history" order={order}/>
          })}
        </ul>
      )}
    </>
  );
};

export default ClientsHistory;
