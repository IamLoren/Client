import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAppSelector } from '../../hooks';
import { selectExpensesOrders, selectIncomeOrders } from '../../redux/selectors';
import { CreateOrderResponse } from '../../redux/ordersSlice/ordersSliceType';

const ChartLines:React.FC = () => {
    const incomeOrders = useAppSelector(selectIncomeOrders);
    const expensesOrders = useAppSelector(selectExpensesOrders);
    const [dataForRender, setDataForRender] = useState<{ name: string; expences: number; income: number;}[]>([])
    
    function getMonthlyData(
        incomeOrders: CreateOrderResponse[], 
        expensesOrders: CreateOrderResponse[]
      ): { name: string; expences: number; income: number }[] {

        const data = [
          { name: "1 day", expences: 0, income: 0 },
          { name: "Week 1", expences: 0, income: 0 },
          { name: "Week 2", expences: 0, income: 0 },
          { name: "Week 3", expences: 0, income: 0 },
          { name: "Week 4", expences: 0, income: 0 },
          { name: "last", expences: 0, income: 0 },
        ];

        const getWeekIndex = (dayOfMonth: number): number => {
          if (dayOfMonth === 1) return 0; 
          if (dayOfMonth <= 7) return 1;
          if (dayOfMonth <= 14) return 2; 
          if (dayOfMonth <= 21) return 3;
          if (dayOfMonth <= 28) return 4; 
          return 5; 
        };

        incomeOrders.forEach((order) => {
          if (order.updatedAt) {
            const orderDate = new Date(order.updatedAt);
            const dayOfMonth = orderDate.getDate();
            const weekIndex = getWeekIndex(dayOfMonth);
            data[weekIndex].income += order.cost;
          }
        });

        expensesOrders.forEach((order) => {
          if (order.updatedAt) {
            const orderDate = new Date(order.updatedAt);
            const dayOfMonth = orderDate.getDate();
            const weekIndex = getWeekIndex(dayOfMonth);
            data[weekIndex].expences += order.cost;
          }
        });
      
        return data;
      }

      useEffect(() => {
        const data = getMonthlyData(incomeOrders, expensesOrders)
        setDataForRender(data)
      },[expensesOrders, incomeOrders])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={dataForRender}
        margin={{
          top: 5,
          right: 30,
          left: 10,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="income" stroke="green" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="expences" stroke="red" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default ChartLines