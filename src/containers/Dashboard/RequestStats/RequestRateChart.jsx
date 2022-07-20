import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import {
  Chart as ChartJS,
  registerables
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';
import { delimitNumber } from '@src/utils/number';
import { COLOR, TRANSPARENT_COLOR } from '@src/styles/color';
import { StyledAppStatsCard } from './index.style';

ChartJS.register(...registerables);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    intersect: false
  },
  plugins: {
    legend: {
      display: true,
      reverse: true,
    },
  },
  borderRadius: 10,
  barThickness: 30,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      position: "left"
    },
    y1: {
      stacked: false,
      position: "right",
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const skipped = (ctx, value) => ctx.p1DataIndex === labels.length-1 ? value : undefined;

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Fail',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 50 })),
      borderColor: COLOR.secondary,
      backgroundColor: TRANSPARENT_COLOR.secondary,
      segment: {
        borderDash: ctx => skipped(ctx, [6, 6]),
      },
      spanGaps: true,
      yAxisID: 'y',
    },
    {
      fill: true,
      label: 'Timeout',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 200 })),
      borderColor: COLOR.yellow[600],
      backgroundColor: TRANSPARENT_COLOR.warning,
      segment: {
        borderDash: ctx => skipped(ctx, [6, 6]),
      },
      spanGaps: true,
      yAxisID: 'y',
    },
    {
      fill: true,
      label: 'Success',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: COLOR.primary,
      backgroundColor: TRANSPARENT_COLOR.primary,
      segment: {
        borderDash: ctx => skipped(ctx, [6, 6]),
      },
      spanGaps: true,
      yAxisID: 'y',
    },
    {
      fill: true,
      label: 'Session',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 200 })),
      borderColor: COLOR.blue,
      backgroundColor: COLOR.warning,
      yAxisID: 'y1',
      type: 'bar'
    },
  ],
};

// eslint-disable-next-line no-unused-vars
const ResponseTimeChart = ({ startDate, endDate, timeBucketType}) => {
  const { t } = useTranslation();

  const fetchData = async () => {
  }

  useEffect(() => {
    // eslint-disable-next-line no-console
    fetchData().then(err => console.error(err))
  }, [startDate, endDate]);

  return (
    <StyledAppStatsCard>
      <Typography className="title">{t("Request Rate")}</Typography>
      <Typography className="title-detail">
        {t("Request Rate")} ({delimitNumber(10000)})
      </Typography>
      <div className="chart-wrapper">
        <Line data={data} options={options} />
      </div>
    </StyledAppStatsCard>
  );
}

export default ResponseTimeChart;
