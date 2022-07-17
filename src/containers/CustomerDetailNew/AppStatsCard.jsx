import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { COLOR } from '@src/styles/color';
import { delimitNumber } from '@src/utils/number';
import { StyledAppStatsCard } from './index.style';

ChartJS.register(...registerables);

const AppStatsCard = ({ title, type, total, data }) => {
  const { t } = useTranslation();

  // convert too long labels to array
  const labels = Object.keys(data).map((item) => {
    const label = t(item);
    let spaceIndex = label.indexOf(' ');
    if (spaceIndex === -1) return label;
    if (spaceIndex < 7) spaceIndex = label.indexOf(' ', spaceIndex + 1);
    return [label.substring(0, spaceIndex), label.substring(spaceIndex + 1)];
  });

  const chartData = {
    labels,
    datasets: [
      {
        label: '',
        data: Object.values(data),
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

  return (
    <StyledAppStatsCard>
      <Typography className="title">{t(title)}</Typography>
      <Typography className="title-detail">
        {t(type)} ({delimitNumber(total)})
      </Typography>
      <div className="chart-wrapper">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </StyledAppStatsCard>
  );
};

export default AppStatsCard;
