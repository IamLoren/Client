import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getClientHistory } from "../../redux/ordersSlice/operations";
import { selectUserId, selectUserOrdersHistory } from "../../redux/selectors";

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
          {history.map((order, index) => {
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
                  return <div key={`${index}-${k}`}>{`${k}: ${order[k]}`}</div>;
                })}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default ClientsHistory;
