import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import {
  Chart as ChartJS,
  registerables
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';
import { delimitNumber } from '@src/utils/number';
import { COLOR, TRANSPARENT_COLOR } from '@src/styles/color';
import { StyledAppStatsCard } from './index.style';

ChartJS.register(...registerables);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    intersect: false,
  },
  elements: {
    bar: {
      borderWidth: 1,
    },
  },
  plugins: {
    legend: {
      display: true,
    },
  },
  scales: {
    y: {
      stacked: false,
      position: "right",
      grid: {
        drawOnChartArea: false,
      },
    },
    y1: {
      stacked: false,
      position: "left",
    },
  },
};

const labels = ['CallBot 1', 'CallBot 2', 'CallBot 3', 'CallBot 4', 'Other CallBots'];

export const data = {
  labels,
  datasets: [
    {
      label: 'No. Sessions',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: COLOR.warning,
      backgroundColor: COLOR.warning,
      yAxisID: 'y1',
      stack: "sessionCount",
      borderRadius: 8,
      barThickness: 40,
    },
    {
      label: '',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 0 })),
      barThickness: 10,
      maxBarThickness: 10,
      borderColor: "rgba(0,0,0,0)",
      backgroundColor: "rgba(0,0,0,0)",
      yAxisID: 'y',
      stack: "gap",
    },
    {
      label: 'Avg. Depth Theory',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
      borderWidth: 2,
      borderColor: COLOR.secondary,
      backgroundColor: TRANSPARENT_COLOR.secondary,
      yAxisID: 'y',
      stack: "depth",
      borderRadius: 8,
      barThickness: 40,
    },
    {
      label: 'Avg. Depth Reality',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 15 })),
      borderColor: COLOR.primary,
      backgroundColor: TRANSPARENT_COLOR.primary,
      yAxisID: 'y',
      stack: "depth",
      borderRadius: 8,
      barThickness: 40,
    }
  ],
};

// eslint-disable-next-line no-unused-vars
const ResponseTimeChart = ({ startDate, endDate}) => {
  const { t } = useTranslation();

  const fetchData = async () => {
  }

  useEffect(() => {
    // eslint-disable-next-line no-console
    fetchData().then(err => console.error(err))
  }, [startDate, endDate]);

  return (
    <StyledAppStatsCard>
      <Typography className="title">{t("Call Bot Popularity")}</Typography>
      <Typography className="title-detail">
        {t("Call Bot Popularity")} ({delimitNumber(10000)})
      </Typography>
      <div className="chart-wrapper">
        <Bar data={data} options={options} />
      </div>
    </StyledAppStatsCard>
  );
}

export default ResponseTimeChart;
