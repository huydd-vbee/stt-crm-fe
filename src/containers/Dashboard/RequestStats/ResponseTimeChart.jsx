import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import {
  Chart as ChartJS,
  registerables
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
// eslint-disable-next-line no-unused-vars
import faker from 'faker';
import { delimitNumber } from '@src/utils/number';
import { COLOR } from '@src/styles/color';
import apis from '@src/apis';
import ProcessHandler from '@src/components/ProcessHandler';
import { StyledAppStatsCard } from './index.style';

ChartJS.register(...registerables);

// eslint-disable-next-line no-unused-vars
const ResponseTimeChart = ({ startDate, endDate }) => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [avgResponseTime, setAvgResponseTime] = useState(0);
  const [chartLabels, setChartLabels] = useState([]);
  const [chartDatasets, setChartDatasets] = useState({})

  const fetchData = async () => {
    setLoading(true);
    // eslint-disable-next-line no-console
    console.log('fetch Response Time Data');
    const data = await apis.statistics.getRequestResponseTimeStats({
      startDate,
      endDate,
    });
    // eslint-disable-next-line no-console
    console.log(data);

    if (data.status) {
      setChartLabels(data.result.slice(0, -1).map((element, index, array) => {
        if (index < array.length - 1) {
          return `${element.id} - ${data.result[index+1].id}`;
        }
        return `> ${data.result[index].id}`;

      }));
      setChartDatasets({
        responseTimeDataset: data.result.slice(0, -1).map((element) => element.count),
      });
      let sum = 0;
      let count = 0;
      data.result.forEach((rangeStat) => {
        sum += rangeStat.count * rangeStat.avg;
        count += rangeStat.count;
      })
      setAvgResponseTime(sum/count);
    }
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line no-console
    fetchData().catch(err => console.error(err))
  }, [startDate, endDate]);

  const options = {
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

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Counts in Response Time Interval',
        data: chartDatasets.responseTimeDataset,
        borderColor: COLOR.primary,
        backgroundColor: COLOR.primary,
      },
    ],
  };


  return (
    <StyledAppStatsCard>
      <Typography className="title">{t("Response Time")}</Typography>
      <ProcessHandler loading={loading}>
        <Typography className="title-detail">
          {`${t("Response Time")} (Average ${delimitNumber(avgResponseTime.toFixed(2))} ms)`}
        </Typography>
        {chartLabels.length && (
          <div className="chart-wrapper">
            <Bar data={chartData} options={options} />
          </div>
        )}
      </ProcessHandler>


    </StyledAppStatsCard>
  );
}

export default ResponseTimeChart;
