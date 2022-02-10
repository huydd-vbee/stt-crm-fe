import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import StatsCard from '@src/components/StatsCard';
import ProcessHandler from '@src/components/ProcessHandler';
import customerIcon from '@src/assets/icons/customer-circle.png';
import facebookIcon from '@src/assets/icons/facebook-circle.png';
import googleIcon from '@src/assets/icons/google-circle.png';
import shoppingIcon from '@src/assets/icons/shopping-circle.png';
import vbeeIcon from '@src/assets/icons/vbee-circle.png';
import { STATS_USERS_BY } from '@src/constants';
import { IDENTITY_PROVIDER } from '@src/constants/customer';
import apis from '@src/apis';
import { StyledStatsCardList } from './index.style';
import { numberOfPaidUsers } from './fakeData';

const StatsCardList = ({ startDate, endDate }) => {
  const { t } = useTranslation();
  const [numberUsersByProvider, setNumberUsersByProvider] = useState({
    total: 0,
    provider: {},
  });
  const [loadingStats, setLoadingStats] = useState(false);

  const fetchStatistics = async () => {
    setLoadingStats(true);
    const data = await apis.statistics.numberUsers(
      STATS_USERS_BY.IDENTITY_PROVIDER,
      startDate,
      endDate,
    );
    setLoadingStats(false);
    if (data.status) setNumberUsersByProvider(data.result);
  };

  const statsCardList = [
    {
      title: 'totalCustomerTitle',
      number: numberUsersByProvider.total,
      icon: customerIcon,
    },
    {
      title: 'facebookCustomer',
      number: numberUsersByProvider.provider[IDENTITY_PROVIDER.FACEBOOK] || 0,
      icon: facebookIcon,
    },
    {
      title: 'googleCustomer',
      number: numberUsersByProvider.provider[IDENTITY_PROVIDER.GOOGLE] || 0,
      icon: googleIcon,
    },
    {
      title: 'vbeeCustomer',
      number: numberUsersByProvider.provider[IDENTITY_PROVIDER.EMAIL] || 0,
      icon: vbeeIcon,
    },
    {
      title: 'paidCustomer',
      number: numberOfPaidUsers,
      icon: shoppingIcon,
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
