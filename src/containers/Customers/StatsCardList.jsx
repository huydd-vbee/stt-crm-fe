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

// import apis from '@src/apis';
import { StyledStatsCardList } from './index.style';

const StatsCardList = () => {
  const { t } = useTranslation();
  const [loadingStats, setLoadingStats] = useState(false);

  const fetchStatistics = async () => {
    // // setLoadingStats(true);
    // const data = await apis.statistics.numberUsers(
    //   STATS_USERS_BY.IDENTITY_PROVIDER,
    //   startDate,
    //   endDate,
    // );
    setLoadingStats(false);
    // if (data.status) setNumberUsersByProvider(data.result);
  };

  const statsCardList = [
    {
      title: 'totalCustomerTitle',
      number: 1000,
      icon: customerIcon,
    },
    {
      title: 'totalRequest',
      number: 1000,
      icon: requestIcon,
    },
    {
      title: 'totalSuccessRequest',
      number: 0,
      icon: successIcon,
    },
    {
      title: 'totalFailedRequest',
      number: 0,
      icon: failedIcon,
    },
    {
      title: 'totalRunningRequest',
      number: 0,
      icon: configIcon,
    },
    {
      title: 'paidDuration',
      number: 0,
      icon: shoppingIcon,
    },
    {
      title: 'freeDuration',
      number: 0,
      icon: freeIcon,
    },
    {
      title: 'totalRevenue',
      number: 0,
      icon: totalRevenueIcon,
    },
  ];

  useEffect(() => {
    fetchStatistics();
  }, []);

  return (
    <div>
      <ProcessHandler loading={loadingStats} size={30} align="center">
        <StyledStatsCardList>
          {statsCardList.map((item) => (
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
