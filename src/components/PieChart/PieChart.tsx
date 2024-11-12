import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useAppSelector } from '../../hooks';
import { selectExpensesOrders } from '../../redux/selectors';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart: React.FC<{totalIncome:number}> = ({totalIncome}) => {
    const expensesOrders = useAppSelector(selectExpensesOrders);
    const oilExpenses = expensesOrders.filter(order => order.orderType === 'oil change').reduce(
        (total, order) => total + order.cost,
        0
      );
      const maintenanceExpenses = expensesOrders.filter(order => order.orderType === 'maintenance').reduce(
        (total, order) => total + order.cost,
        0
      );
      const repairExpenses = expensesOrders.filter(order => order.orderType === 'repair').reduce(
        (total, order) => total + order.cost,
        0
      );
      const insuranceExpenses = expensesOrders.filter(order => order.orderType === 'insurance').reduce(
        (total, order) => total + order.cost,
        0
      );
      
    const pieData = [totalIncome, oilExpenses, repairExpenses, maintenanceExpenses, insuranceExpenses];

  const data = {
    labels: ['Income from rent', 'oil change', 'repair', 'maintenance', "insurance"], 
    datasets: [
      {
        data: pieData, 
        backgroundColor: ['green','#FF6384', '#800080', '#FFCE56', '#FF0000'], 
        borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF','#FFFFFF'], 
        borderWidth: 1, 
      },
    ],
  };

  return (
    <div style={{ width: '300px', height: '300px', margin: '0 auto' }}>
      <Doughnut data={data} />
    </div>
  );
};

export default PieChart;