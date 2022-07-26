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
const StatusRateChart = ({ dateFilter, timeBucketType}) => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [chartLabels, setChartLabels] = useState([]);
  const [chartDatasets, setChartDatasets] = useState({})

  const fetchData = async () => {
    setLoading(true);
    // eslint-disable-next-line no-console
    console.log('fetch Response Time Data');
    const data = await apis.statistics.getRequestStatusRateStats({
      startDate: dateFilter[0],
      endDate: dateFilter[1],
    });
    // eslint-disable-next-line no-console
    console.log(data);

    if (data.status) {
      setChartLabels(data.result.map((e) => e.id).reverse());
      setChartDatasets({
        countFailRequestDataset: data.result.map((e) => e.statusCount.filter((sc) => sc.status === "Failed")[0]?.count || 0.1).reverse(),
        countTimeoutRequestDataset: data.result.map((e) => e.statusCount.filter((sc) => !sc.status)[0]?.count || 0.1).reverse(),
        countSucceedRequestDataset: data.result.map((e) => e.statusCount.filter((sc) => sc.status === "Succeeded")[0]?.count || 0.1).reverse(),
      });
    }
    // eslint-disable-next-line no-console
    console.log(chartDatasets);
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line no-console
    fetchData().catch(err => console.error(err))
  }, [dateFilter]);

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
      tooltip: {
        callbacks: {
          label: (context) => {
            let label = context.dataset.label || '';

            if (label) {
              label += ': ';
            }
            if (context.parsed.y === 0.1) {
              label += "0";
            } else {
              label += `${delimitNumber(context.parsed.y)}`;
            }
            return label;
          }
        }
      }
    },
    borderRadius: 5,
    barThickness: 30,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        type: 'logarithmic',
        stacked: true,
        position: "left",
        ticks: {
          min: 0.1,
          callback: (value, index) => {
            if (value === 1000000) return "1M";
            if (value === 100000) return "100K";
            if (value === 10000) return "10K";
            if (value === 1000) return "1K";
            if (value === 100) return "100";
            if (value === 10) return "10";
            if (index === 0) return "0";
            return null;
          }
        },
        title: {
          text: "No. Requests",
          display: true,
        },
      },
    }
  };

  // eslint-disable-next-line no-unused-vars
  const skipped = (ctx, value) => {
    const currentPointDate = new Date(chartLabels[ctx.p0DataIndex]);
    const nextPointDate = new Date(chartLabels[ctx.p1DataIndex]);
    const todayPointDate = new Date();
    const diffDays = (date2, date1) => Math.ceil(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
    const rs = diffDays(currentPointDate, nextPointDate) > 1
    || (ctx.p1DataIndex === chartLabels.length-1 && diffDays(nextPointDate, todayPointDate) < 1)
      ? value : undefined;
    // eslint-disable-next-line no-console
    console.log(rs, value);
    return rs;
  }

  const segmentConfig = {
    borderDash: ctx => skipped(ctx, [0, 6]),
    backgroundColor: ctx => skipped(ctx, TRANSPARENT_COLOR.transparent),
  };

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        fill: true,
        label: 'No. Failed Requests',
        data: chartDatasets.countFailRequestDataset,
        borderColor: COLOR.secondary,
        backgroundColor: TRANSPARENT_COLOR.secondary,
        segment: segmentConfig,
        spanGaps: true,
        yAxisID: 'y',
      },
      {
        fill: true,
        label: 'No. Timeout Requests',
        data: chartDatasets.countTimeoutRequestDataset,
        borderColor: COLOR.yellow[600],
        backgroundColor: TRANSPARENT_COLOR.warning,
        segment: segmentConfig,
        spanGaps: true,
        yAxisID: 'y',
      },
      {
        fill: true,
        label: 'No. Succeeded Requests',
        data: chartDatasets.countSucceedRequestDataset,
        borderColor: COLOR.primary,
        backgroundColor: TRANSPARENT_COLOR.primary,
        segment: segmentConfig,
        spanGaps: true,
        yAxisID: 'y',
      }
    ],
  };

  return (
    <StyledAppStatsCard>
      <Typography className="title">{t("Status Rate")}</Typography>
      <ProcessHandler loading={loading}>
        <Typography className="title-detail">
          {`${t("Status Rate")} (${chartLabels[0]} ${t('to')} ${chartLabels[chartLabels.length - 1]})`}
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

export default StatusRateChart;
