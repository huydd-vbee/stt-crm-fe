import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { COLOR } from '@src/styles/color';
import { delimitNumber } from '@src/utils/number';

ChartJS.register(...registerables);

const BarChart = ({ labels, data }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: '',
        data,
        backgroundColor: COLOR.primary,
        borderColor: COLOR.primary,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.parsed.y || '';
            return delimitNumber(label);
          },
          title: (contexts) => {
            const titleText = contexts[0].label.split(',').join(' ');
            return titleText;
          },
        },
      },
    },
    borderRadius: 10,
    barThickness: 20,
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default BarChart;
