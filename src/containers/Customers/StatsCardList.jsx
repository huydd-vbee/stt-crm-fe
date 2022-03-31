import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import StatsCard from '@src/components/StatsCard';
import ProcessHandler from '@src/components/ProcessHandler';
import customerIcon from '@src/assets/icons/customer-circle.png';
import requestIcon from '@src/assets/icons/detail-invoice.png';
import successIcon from '@src/assets/icons/success-icon.png';
import failedIcon from '@src/assets/icons/failed-icon.png';
import configIcon from '@src/assets/icons/config-icon.png';
import shoppingIcon from '@src/assets/icons/shopping-circle.png';
import freeIcon from '@src/assets/icons/no-shopping-circle.png';
import totalRevenueIcon from '@src/assets/icons/icon-total-revenue.png';

import apis from '@src/apis';
import {fakeStats} from '@src/containers/Customers/fakeData';
import { StyledStatsCardList } from './index.style';

const StatsCardList = (props) => {
  const { t } = useTranslation();
  const [loadingStats, setLoadingStats] = useState(false);
  const [stats, setStats] = useState(fakeStats);

  const fetchStatistics = async () => {
    setLoadingStats(true);
    const data = await apis.statistics.getOverviewRequestStats(
      props.startDate,
      props.endDate,
    );
    console.log(data);
    setLoadingStats(false);
    if (data.status) setStatCardList(data.result);
  };

  const setStatCardList = (result => {
    setStats([
      {
        title: 'totalRequest',
        number: result.total || 0,
        icon: requestIcon,
      },
      {
        title: 'totalSuccessRequest',
        number: result.succeeded || 0,
        icon: successIcon,
      },
      {
        title: 'totalFailedRequest',
        number: result.failed || 0,
        icon: failedIcon,
      },
      {
        title: 'totalRunningRequest',
        number: result.processing || 0,
        icon: configIcon,
      },
    ])
  });

  useEffect(() => {
    fetchStatistics();
  }, [props.startDate, props.endDate]);

  return (
    <div>
      <ProcessHandler loading={loadingStats} size={30} align="center">
        <StyledStatsCardList>
          {stats.map((item) => (
            <StatsCard
              key={item.title}
              title={t(item.title)}
              number={item.number}
              icon={item.icon}
              minWidth="156px"
            />
          ))}
        </StyledStatsCardList>
      </ProcessHandler>
    </div>
  );
};

export default StatsCardList;
