import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import ProcessHandler from '@src/components/ProcessHandler';

import RequestRateChart from './RequestRateChart';
import ResponseTimeChart from './ResponseTimeChart';
import StatusProportionChart from './StatusProportionChart';
import CallBotPopularityChart from './CallBotPopularityChart';

import { fakeData } from './fakeData';
import {
  StyledRequestStatsContainer,
  StyledRequestStatsChartContainer,
} from './index.style';


// eslint-disable-next-line no-unused-vars
const RequestStats = ({ startDate, endDate }) => {
  const { appId } = useParams();
  // eslint-disable-next-line no-unused-vars
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const fetchApp = async () => {
    setLoading(true);
    // eslint-disable-next-line no-unused-vars
    const data = await new Promise((resolve) =>
      setTimeout(() => {
        resolve(fakeData);
      }, 1000),
    );
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line no-console
    fetchApp().then(err => console.error(err));
  }, [appId]);

  return (
    <StyledRequestStatsContainer>
      <ProcessHandler loading={loading}>
        <StyledRequestStatsChartContainer>
          <StatusProportionChart />
          <RequestRateChart />
        </StyledRequestStatsChartContainer>
        <StyledRequestStatsChartContainer>
          <ResponseTimeChart />
          <CallBotPopularityChart />
        </StyledRequestStatsChartContainer>
      </ProcessHandler>
    </StyledRequestStatsContainer>
  );
};

export default RequestStats;
