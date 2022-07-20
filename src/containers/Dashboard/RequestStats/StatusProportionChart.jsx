import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import apis from '@src/apis';
import { Typography } from '@mui/material';
import {
  Chart as ChartJS,
  registerables
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import faker from 'faker';
import { delimitNumber } from '@src/utils/number';
import { COLOR } from '@src/styles/color';
import { StyledAppStatsCard } from './index.style';

ChartJS.register(...registerables);

const labels = ['Succeeded', 'Failed', 'Empty Text', 'Timeout'];
const colors = [COLOR.primary, COLOR.secondary, COLOR.red[600], COLOR.yellow[600]]
const chartData = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Status',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: COLOR.white,
      backgroundColor: colors,
    },
  ],
};

// eslint-disable-next-line no-unused-vars
const ResponseTimeChart = ({ startDate, endDate }) => {
  const { t } = useTranslation();

  // eslint-disable-next-line no-unused-vars
  const [responseTimeRangeCount, setResponseTimeRangeCount] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [centerStatusStat, setCenterStatusStat] = useState({status: "Succeeded", percentage: 25});

  const fetchChartData = async () => {
    // eslint-disable-next-line no-console
    console.log("fetch Response Time Chart Data");
    const data = await apis.statistics.getRequestResponseTimeStats({
      startDate,
      endDate,
    });
    // eslint-disable-next-line no-console
    console.log(data)

    if (data.status) {
      setResponseTimeRangeCount(data.result
          .filter((statusCount) => labels.includes(statusCount.status))
          .map((statusCount) => statusCount.percentage)
        );
    }
  }

  useEffect(() => {
    // eslint-disable-next-line no-console
    fetchChartData().then(err => console.error(err))
  }, [ startDate, endDate ]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "right"
      },
    },
    elements: {
      center: {
        text: '60',
        color: COLOR.secondary,
        fontStyle: 'Arial',
        sidePadding: 20,
        minFontSize: 25,
      }
    }
  };

  return (
    <StyledAppStatsCard>
      <Typography className="title">{t("Status Proportion")}</Typography>
      <Typography className="title-detail">
        {t("Status Proportion")} ({delimitNumber(10000)})
      </Typography>
      <div className="chart-wrapper">
        <Doughnut
          data={chartData}
          options={options}
          plugins={[
          {
            beforeDraw(chart) {
              const { width } = chart;
              const { height } = chart;
              const { ctx } = chart;
              ctx.restore();
              const fontSize = (height / 160).toFixed(2);
              ctx.font = `${fontSize}em Arial Black`;
              ctx.textBaseline = 'middle';
              const text = `${centerStatusStat.percentage}%`;
              const textX = Math.round((width - ctx.measureText(text).width) / 2) - 65;
              const textY = height / 2;
              ctx.fillText(text, textX, textY);
              ctx.save();
            },
          },
        ]}/>
      </div>
    </StyledAppStatsCard>
  );
}

export default ResponseTimeChart;
