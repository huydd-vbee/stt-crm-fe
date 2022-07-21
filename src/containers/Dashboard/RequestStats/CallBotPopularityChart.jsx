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
import DataLabelPlugin from 'chartjs-plugin-datalabels'
// eslint-disable-next-line no-unused-vars
import faker from 'faker';
import { delimitNumber } from '@src/utils/number';
import { COLOR, TRANSPARENT_COLOR } from '@src/styles/color';

import { StyledAppStatsCard } from './index.style';

ChartJS.register(...registerables);

// eslint-disable-next-line no-unused-vars
const labels = ['CallBot 1', 'CallBot 2', 'CallBot 3', 'CallBot 4', 'Other CallBots'];

const CallBotPopularityChart = ({ startDate, endDate }) => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [chartLabels, setChartLabels] = useState([]);
  const [chartDatasets, setChartDatasets] = useState({})

  const fetchData = async () => {
    setLoading(true);
    // eslint-disable-next-line no-console
    console.log('fetch Call Bot Popularity Data');
    const data = await apis.statistics.getRequestStatsForTopListApps({
      startDate,
      endDate,
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
  }, [startDate, endDate]);

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
        borderRadius: 2,
        datalabels: {
          align: 'end',
          anchor: 'end'
        }
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
        backgroundColor: TRANSPARENT_COLOR.secondary,
        yAxisID: 'y',
        stack: 'depth',
        borderRadius: 2,
        datalabels: {
          display: false
        }
      },
      {
        label: 'Avg. Depth Theory',
        data: chartDatasets.avgDepthTheoryDataset,
        borderWidth: 2,
        borderColor: COLOR.primary,
        backgroundColor: TRANSPARENT_COLOR.primary,
        yAxisID: 'y',
        stack: 'depth',
        borderRadius: 2,
        datalabels: {
          display: false
        }
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
      },
      y1: {
        stacked: false,
        position: 'left',
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
