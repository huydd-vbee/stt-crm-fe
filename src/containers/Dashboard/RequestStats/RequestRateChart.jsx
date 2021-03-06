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
// eslint-disable-next-line no-unused-vars
import { COLOR, TRANSPARENT_COLOR } from '@src/styles/color';
import apis from '@src/apis';
import ProcessHandler from '@src/components/ProcessHandler';
import { StyledAppStatsCard } from './index.style';

ChartJS.register(...registerables);

// eslint-disable-next-line no-unused-vars
const RequestRateChart = ({ dateFilter, timeBucketType}) => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [chartLabels, setChartLabels] = useState([]);
  const [chartDatasets, setChartDatasets] = useState({})

  const fetchData = async () => {
    setLoading(true);
    // eslint-disable-next-line no-console
    console.log('fetch Response Time Data');
    const data = await apis.statistics.getRequestRateStats({
      startDate: dateFilter[0],
      endDate: dateFilter[1],
    });
    // eslint-disable-next-line no-console
    console.log(data);

    if (data.status) {
      setChartLabels(data.result.map((e) => e.id).reverse());
      setChartDatasets({
        countSessionDataset: data.result.map((e) => e.noSession).reverse(),
        countRequestDataset: data.result.map((e) => e.noMessage).reverse(),
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
        display: false,
        type: 'logarithmic',
        stacked: true,
        position: "right",
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
      y1: {
        type: 'linear',
        stacked: false,
        position: "left",
        // grid: {
        //   drawOnChartArea: false,
        // },
        title: {
          text: "Count",
          display: true,
        }
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

  const segmentConfig = {
    borderDash: ctx => skipped(ctx, [0, 6]),
    backgroundColor: ctx => skipped(ctx, TRANSPARENT_COLOR.transparent),
  };

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'No. Requests',
        data: chartDatasets.countRequestDataset,
        borderColor: COLOR.primary,
        backgroundColor: COLOR.primary,
        segment: segmentConfig,
        spanGaps: true,
        yAxisID: 'y1',
      },
      {
        label: 'No. Calls',
        data: chartDatasets.countSessionDataset,
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
          {`${t("Request Rate")} (${chartLabels[0]} ${t('to')} ${chartLabels[chartLabels.length - 1]})`}
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
