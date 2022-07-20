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
import { COLOR } from '@src/styles/color';
import { StyledAppStatsCard } from './index.style';

ChartJS.register(...registerables);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 1,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  borderRadius: 8,
  barThickness: 40,
};

const labels = ['< 500ms', '500 - 1500ms', '> 1500ms'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Counts in Response Time Interval',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: COLOR.primary,
      backgroundColor: COLOR.primary,
    },
  ],
};

// eslint-disable-next-line no-unused-vars
const ResponseTimeChart = ({ startDate, endDate }) => {
  const { t } = useTranslation();

  const fetchData = async () => {
  }

  useEffect(() => {
    // eslint-disable-next-line no-console
    fetchData().then(err => console.error(err))
  }, [startDate, endDate]);

  return (
    <StyledAppStatsCard>
      <Typography className="title">{t("Response Time")}</Typography>
      <Typography className="title-detail">
        {t("Response Time")} ({delimitNumber(10000)})
      </Typography>
      <div className="chart-wrapper">
        <Bar data={data} options={options} />
      </div>
    </StyledAppStatsCard>
  );
}

export default ResponseTimeChart;
