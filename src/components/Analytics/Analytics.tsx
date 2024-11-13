import React, { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  selectAllOrders,
  selectExpensesOrders,
  selectIncomeOrders,
  selectMonthForChart,
} from "../../redux/selectors";
import { monthNameToNumber } from "../../services";
import { CreateOrderResponse } from "../../redux/ordersSlice/ordersSliceType";
import {
  changeSelectedMonth,
  splitOrders,
} from "../../redux/analyticSlice/analyticSlice";
import ChartLines from "../ChartLines/ChartLines";
import PieChart from "../PieChart/PieChart";

const Analytics: React.FC = () => {
  const dispatch = useAppDispatch();
  const allOrders = useAppSelector(selectAllOrders) as CreateOrderResponse[];
  const selectedMonth = useAppSelector(selectMonthForChart);
  const incomeOrders = useAppSelector(selectIncomeOrders);
  const expensesOrders = useAppSelector(selectExpensesOrders);

  const monthToNumber = useMemo(
    () => monthNameToNumber(selectedMonth),
    [selectedMonth]
  );

  const monthOrders = useMemo(
    () =>
      allOrders.filter((order) => {
        if (order.updatedAt) {
          const updatedDate = new Date(order.updatedAt);
          return (
            updatedDate.getMonth() === monthToNumber &&
            updatedDate.getFullYear() === 2024
          );
        }
        return false;
      }),
    [allOrders, monthToNumber]
  );

  useEffect(() => {
    const incomeOrders = monthOrders.filter(
      (order) => order.orderStatus === "completed" && order.orderType === "rent"
    );
    const expensesOrders = monthOrders.filter(
      (order) => order.orderStatus === "completed" && order.orderType !== "rent"
    );
    dispatch(splitOrders({ incomeOrders, expensesOrders }));
  }, [dispatch, monthOrders,]);

  useEffect(() => {
    return () => {
      dispatch(changeSelectedMonth(""));
    };
  }, [dispatch]); 

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeSelectedMonth(event.target.value));
  };

  const totalIncome = incomeOrders.reduce(
    (total, order) => total + order.cost,
    0
  );
  const totalExpenses = expensesOrders.reduce(
    (total, order) => total + order.cost,
    0
  );

  return (
    <section className="w-[100%] h-[100%] flex-1 flex flex-col gap-[30px] p-[30px]">
      <h2 className="accent-text text-lg font-bold">
        Incomes and expenses from completed orders
      </h2>{" "}
      <div className="flex justify-center">
        <select
        value={selectedMonth ? selectedMonth : "select"}
          onChange={handleChange}
          id="month"
          className="block w-[100%] sm:w-[150px] rounded-md outline-blue-200 border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 accent-text text-lg font-bold"
        >
          <option disabled value="select" className="block max-w-full">
            Select month
          </option>
          <option value="october" className="block max-w-full">
            October
          </option>
          <option value="november" className=" block max-w-full">
            November
          </option>
        </select>
      </div>

      <div className="flex flex-col sm:flex-row">
        <div className="flex gap-[50px] w-[400px] h-[300px] lg:w-[800px] lg:h-[500px] m-auto">
        <ChartLines />
      </div>
      <div>
        <PieChart totalIncome={totalIncome}/>
      </div>
      </div>

      <div>
        <p className="text-green-600">
          Total income for the period: {totalIncome}
        </p>
        <p className="text-red-600">
          Total expenses for the period: {totalExpenses}
        </p>
      </div>
    </section>
  );
};

export default Analytics;
