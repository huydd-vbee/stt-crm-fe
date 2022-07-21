import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import {
  Chart as ChartJS,
  registerables
} from 'chart.js';
import { Line } from 'react-chartjs-2';
// eslint-disable-next-line no-unused-vars
import faker from 'faker';
// eslint-disable-next-line no-unused-vars
import { delimitNumber } from '@src/utils/number';
import { COLOR, TRANSPARENT_COLOR } from '@src/styles/color';
import apis from '@src/apis';
import ProcessHandler from '@src/components/ProcessHandler';
import { StyledAppStatsCard } from './index.style';

ChartJS.register(...registerables);

// eslint-disable-next-line no-unused-vars
const RequestRateChart = ({ startDate, endDate, timeBucketType}) => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [chartLabels, setChartLabels] = useState([]);
  const [chartDatasets, setChartDatasets] = useState({})

  const fetchData = async () => {
    setLoading(true);
    // eslint-disable-next-line no-console
    console.log('fetch Response Time Data');
    const data = await apis.statistics.getRequestRateStats({
      startDate,
      endDate,
    });
    // eslint-disable-next-line no-console
    console.log(data);

    if (data.status) {
      setChartLabels(data.result.map((e) => e.id).reverse());
      setChartDatasets({
        countSessionDataset: data.result.map((e) => e.noSession).reverse(),
        countFailRequestDataset: data.result.map((e) => e.statusCount.filter((sc) => sc.status === "Failed")[0]?.count || 0).reverse(),
        countTimeoutRequestDataset: data.result.map((e) => e.statusCount.filter((sc) => !sc.status)[0]?.count || 0).reverse(),
        countSucceedRequestDataset: data.result.map((e) => e.statusCount.filter((sc) => sc.status === "Succeeded")[0]?.count || 0).reverse(),
      });
    }
    console.log(chartDatasets);
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line no-console
    fetchData().catch(err => console.error(err))
  }, [startDate, endDate]);

  const options = {
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

  const skipped = (ctx, value) => {
    const currentPointDate = new Date(chartLabels[ctx.p0DataIndex]);
    const nextPointDate = new Date(chartLabels[ctx.p1DataIndex]);
    const todayPointDate = new Date();
    const diffDays = (date2, date1) => Math.ceil(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
    return diffDays(currentPointDate, nextPointDate) > 1
    || (ctx.p1DataIndex === chartLabels.length-1 && diffDays(nextPointDate, todayPointDate) < 1)
      ? value : undefined;
  }

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        fill: true,
        label: 'Timeout',
        data: chartDatasets.countTimeoutRequestDataset,
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
        label: 'Fail',
        data: chartDatasets.countFailRequestDataset,
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
        label: 'Success',
        data: chartDatasets.countSucceedRequestDataset,
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
        data: chartDatasets.countSessionDataset,
        borderColor: COLOR.blue,
        backgroundColor: COLOR.warning,
        yAxisID: 'y1',
        type: 'bar'
      },
    ],
  };

  return (
    <StyledAppStatsCard>
      <Typography className="title">{t("Request Rate")}</Typography>
      <ProcessHandler loading={loading}>
        <Typography className="title-detail">
          {`${t("Request Rate")} (${chartLabels[0]} - ${chartLabels[chartLabels.length - 1]})`}
        </Typography>
        {chartLabels.length &&(
          <div className="chart-wrapper">
            <Line data={chartData} options={options} />
          </div>
        )}
      </ProcessHandler>
    </StyledAppStatsCard>
  );
}

export default RequestRateChart;
