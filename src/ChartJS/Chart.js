import React, { useEffect, useRef } from 'react';
import '../App.scss';
import axios from 'axios';
import Chart from 'chart.js/auto';

function PieChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    const dataSource = {
      datasets: [
        {
          data: [],
          backgroundColor: [
            '#ffcd56',
            '#ff6384',
            '#36a2eb',
            '#fd6b19',
          ]
        }
      ],
      labels: []
    };

    const fetchBudgetData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/budget');
        const budgetData = response.data.myBudget;

        dataSource.datasets[0].data = budgetData.map(item => item.budget);
        dataSource.labels = budgetData.map(item => item.title);

        createChart(dataSource);
      } catch (error) {
        console.error('Error fetching budget data:', error);
      }
    };

    const createChart = (data) => {
      const ctx = chartRef.current.getContext('2d');
      new Chart(ctx, {
        type: 'pie',
        data: data
      });
    };

    fetchBudgetData();
  }, []);

  return (
    <div>
      <canvas id="myChart" ref={chartRef}></canvas>
    </div>
  );
}

export default PieChart;