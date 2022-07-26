import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import apis from '@src/apis';
import ProcessHandler from '@src/components/ProcessHandler';
import {
  Chart as ChartJS,
  registerables,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import DataLabelPlugin from 'chartjs-plugin-datalabels';
// eslint-disable-next-line no-unused-vars
import faker from 'faker';
import { delimitNumber } from '@src/utils/number';
// eslint-disable-next-line no-unused-vars
import { COLOR, TRANSPARENT_COLOR } from '@src/styles/color';

import { StyledAppStatsCard } from '../RequestStats/index.style';

ChartJS.register(...registerables);

// eslint-disable-next-line no-unused-vars
const labels = ['CallBot 1', 'CallBot 2', 'CallBot 3', 'CallBot 4', 'Other CallBots'];

const CallBotPopularityChart = ({ dateFilter }) => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [chartLabels, setChartLabels] = useState([]);
  const [chartDatasets, setChartDatasets] = useState({})

  const fetchData = async () => {
    setLoading(true);
    // eslint-disable-next-line no-console
    console.log('fetch Call Bot Popularity Data');
    const data = await apis.statistics.getRequestStatsForTopListApps({
      startDate: dateFilter[0],
      endDate: dateFilter[1],
    });
    // eslint-disable-next-line no-console
    console.log(data);

    if (data.status) {
      setChartLabels(data.result.items.map((d) => d.id));
      setChartDatasets({
        countSessionDataset: data.result.items.map((d) => d.noCall),
        countMessageDataset: data.result.items.map((d) => d.totalMessage),
        avgDepthTheoryDataset: data.result.items.map((d) => d.avgDepthTheory),
        avgDepthRealityDataset: data.result.items.map((d) => d.avgDepthReality),
      })
    }
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line no-console
    fetchData().catch(err => console.error(err));
  }, [dateFilter]);

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'No. Sessions',
        data: chartDatasets.countSessionDataset,
        borderColor: COLOR.primary,
        backgroundColor: COLOR.primary,
        yAxisID: 'y1',
        stack: 'sessionCount',
        datalabels: {
          align: 'end',
          anchor: 'end'
        },
        borderRadius: 8,
      },
      // {
      //   label: 'No. Messages',
      //   data: chartDatasets.countMessageDataset,
      //   borderColor: COLOR.warning,
      //   backgroundColor: COLOR.warning,
      //   yAxisID: 'y1',
      //   stack: 'messageCount',
      //   borderRadius: 2,
      // },
      // {
      //   label: '',
      //   data: chartLabels.map(() => faker.datatype.number({ min: 0, max: 0 })),
      //   // barThickness: 10,
      //   // maxBarThickness: 10,
      //   borderColor: 'rgba(0,0,0,0)',
      //   backgroundColor: 'rgba(0,0,0,0)',
      //   yAxisID: 'y',
      //   stack: 'gap',
      // },
      {
        label: 'Avg. Depth Reality',
        data: chartDatasets.avgDepthRealityDataset,
        borderColor: COLOR.secondary,
        backgroundColor: COLOR.secondary,
        yAxisID: 'y',
        stack: 'depth',
        datalabels: {
          formatter: (value, ctx) => {
            const idx = ctx.dataIndex;
            return `${(chartDatasets.avgDepthRealityDataset[idx] / chartDatasets.avgDepthTheoryDataset[idx] * 100).toFixed(0)}%`;
          },
          align: 'center',
          anchor: 'center',
          color: COLOR.white
        },
        borderWidth: 2,
        borderRadius: 8,
      },
      {
        label: 'Avg. Depth Theory',
        data: chartDatasets.avgDepthTheoryDataset,
        borderColor: COLOR.secondary,
        // backgroundColor: TRANSPARENT_COLOR.secondary,
        yAxisID: 'y',
        stack: 'depth',
        datalabels: {
          display: false
        },
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const options = {
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
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
        title: {
          text: "Call Depth",
          display: true,
        }
      },
      y1: {
        stacked: false,
        position: 'left',
        title: {
          text: "No. Calls",
          display: true,
        }
      },
    },
  };

  return (
    <StyledAppStatsCard>
      <Typography className='title'>{t('Call Bot Popularity')}</Typography>
      <ProcessHandler loading={loading}>
        <Typography className='title-detail'>
          {`${t('Call Bot Popularity')} (${delimitNumber(32)} callbots)`}
        </Typography>
        {chartLabels.length && (
          <div className='chart-wrapper'>
            <Bar
              data={chartData}
              options={options}
              plugins={[
                DataLabelPlugin
              ]}
            />
          </div>
        )}
      </ProcessHandler>
    </StyledAppStatsCard>
  );
};

export default CallBotPopularityChart;
