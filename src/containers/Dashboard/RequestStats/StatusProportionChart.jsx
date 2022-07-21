/* eslint-disable no-console */

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import apis from '@src/apis';
import { Typography } from '@mui/material';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import DataLabelPlugin from 'chartjs-plugin-datalabels'
import ProcessHandler from '@src/components/ProcessHandler';
// eslint-disable-next-line no-unused-vars
import { delimitNumber } from '@src/utils/number';
import { COLOR } from '@src/styles/color';
import { StyledAppStatsCard } from './index.style';


ChartJS.register(...registerables);

const DrawMiddleTextInDoughnutChartPlugin = {
  beforeDraw: (chart) => {
    if (chart.config.options.elements.center) {
      // Get ctx from string
      const {ctx} = chart;

      // Get options from the center object in options
      const centerConfig = chart.config.options.elements.center;
      const fontStyle = centerConfig.fontStyle || 'Arial';
      const txt = centerConfig.text;
      const color = centerConfig.color || '#000';
      const maxFontSize = centerConfig.maxFontSize || 75;
      const sidePadding = centerConfig.sidePadding || 20;
      const sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
      // Start with a base font of 30px
      ctx.font = `30px ${  fontStyle}`;

      // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
      const stringWidth = ctx.measureText(txt).width;
      const elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

      // Find out how much the font can grow in width.
      const widthRatio = elementWidth / stringWidth;
      const newFontSize = Math.floor(30 * widthRatio);
      const elementHeight = (chart.innerRadius * 2);

      // Pick a new font size so it will not be larger than the height of label.
      let fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
      let {minFontSize} = centerConfig;
      const lineHeight = centerConfig.lineHeight || 25;
      let wrapText = false;

      if (minFontSize === undefined) {
        minFontSize = 20;
      }

      if (minFontSize && fontSizeToUse < minFontSize) {
        fontSizeToUse = minFontSize;
        wrapText = true;
      }

      // Set font settings to draw it correctly.
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
      let centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
      ctx.font = `${fontSizeToUse  }px ${  fontStyle}`;
      ctx.fillStyle = color;

      if (!wrapText) {
        ctx.fillText(txt, centerX, centerY);
        return;
      }

      const words = txt.split(' ');
      let line = '';
      const lines = [];

      // Break words up into multiple lines if necessary
      // eslint-disable-next-line no-plusplus
      for (let n = 0; n < words.length; n++) {
        const testLine = `${line + words[n]  } `;
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > elementWidth && n > 0) {
          lines.push(line);
          line = `${words[n]  } `;
        } else {
          line = testLine;
        }
      }

      // Move the center up depending on line height and number of lines
      centerY -= (lines.length / 2) * lineHeight;

      // eslint-disable-next-line no-plusplus
      for (let n = 0; n < lines.length; n++) {
        ctx.fillText(lines[n], centerX, centerY);
        centerY += lineHeight;
      }
      // Draw text in center
      ctx.fillText(line, centerX, centerY);
    }
  }
}

// eslint-disable-next-line no-unused-vars
const StatusProportionChart = ({ startDate, endDate }) => {
  const { t } = useTranslation();

  const labels = ['succeeded', 'failed', 'emptyText', 'timeout'];
  const colors = [COLOR.primary, COLOR.secondary, COLOR.warning, COLOR.yellow[600]]

  const [loading, setLoading] = useState(true);
  const [responseTimeRangeCount, setResponseTimeRangeCount] = useState([]);
  const [centerStatusStat, setCenterStatusStat] = useState({status: "Succeeded", percentage: 25});

  const fetchChartData = async () => {
    setLoading(true)
    console.log("fetch Status Proportion Chart Data");
    const data = await apis.statistics.getRequestStatusStats({
      startDate,
      endDate,
    });
    console.log(data)

    if (data.status) {
      const stats = labels.map((label) => data.result[label] || 0);
      setCenterStatusStat(data.result[labels[0]]);
      setResponseTimeRangeCount(stats);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchChartData().catch(err => console.error(err))
  }, [ startDate, endDate ]);

  const chartLabels = labels.map((label) => t(label));
  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Status',
        data: responseTimeRangeCount,
        borderColor: COLOR.white,
        backgroundColor: colors,
      },
    ],
  };

  const options = () => ({
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        enabled: false
      },
      plugins: {
        legend: {
          display: true,
          position: "right"
        },
        datalabels: {
          formatter: (value, ctx) => {
            let sum = 0;
            ctx.chart.data.datasets[0].data.forEach(data => {
              sum += data;
            });
            return `${(value * 100 / sum).toFixed(3)}%`;
          },
          color: COLOR.black,
          backgroundColor: COLOR.white
        }
      },
      elements: {
        center: {
          text: `${(centerStatusStat * 100 /responseTimeRangeCount.reduce((partialSum, a) => partialSum + a, 0)).toFixed(2)}`,
          color: COLOR.secondary,
          fontStyle: 'Arial Black',
          sidePadding: 20,
          minFontSize: 20,
        }
      }
    })

  return (
    <StyledAppStatsCard>
      <Typography className="title">{t("Status Proportion")}</Typography>
      <ProcessHandler loading={loading}>
        <Typography className="title-detail">
          {`${t("Status Proportion")} (${delimitNumber(responseTimeRangeCount.reduce((partialSum, a) => partialSum + a, 0))} requests)`}
        </Typography>
        {responseTimeRangeCount.length && (<div className="chart-wrapper">
          <Doughnut
            data={chartData}
            options={options()}
            plugins={[
              DataLabelPlugin,
              DrawMiddleTextInDoughnutChartPlugin
            ]}
          />
        </div>)}
      </ProcessHandler>
    </StyledAppStatsCard>
  );
}

export default StatusProportionChart;
