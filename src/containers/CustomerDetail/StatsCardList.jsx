import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import StatsCard from '@src/components/StatsCard';
import ProcessHandler from '@src/components/ProcessHandler';
import requestIcon from '@src/assets/icons/detail-invoice.png';
import successIcon from '@src/assets/icons/success-icon.png';
import failedIcon from '@src/assets/icons/failed-icon.png';
import configIcon from '@src/assets/icons/config-icon.png';
import warningIcon from '@src/assets/icons/warning-icon.png';

import apis from '@src/apis';
import { fakeStats } from '@src/containers/AsrRequests/fakeData';
import { StyledStatsCardList } from './index.style';

const StatsCardList = (props) => {
  const { t } = useTranslation();
  const [loadingStats, setLoadingStats] = useState(false);
  const [stats, setStats] = useState(fakeStats);

  const fetchStatistics = async () => {
    setLoadingStats(true);
    const data = await apis.statistics.getRequestStatsByAppId({
      startDate: props.startDate,
      endDate: props.endDate,
      appId: props.appId
    });
    console.log(data);
    setLoadingStats(false);
    if (data.status) setStatCardList(data.result);
  };

  const setStatCardList = (result => {
    setStats([
      {
        title: t('totalRequest'),
        number: result.total || 0,
        icon: requestIcon,
      },
      {
        title: t('runningRequest'),
        number: result.processing || 0,
        icon: configIcon,
      },
      {
        title: t('succeededRequest'),
        number: result.succeeded || 0,
        icon: successIcon,
      },
      {
        title: t('emptyRequests'),
        number: result.unrecognized || 0,
        icon: warningIcon,
      },
      {
        title: t('failedRequest'),
        number: result.failed || 0,
        icon: failedIcon,
      },
      {
        title: t('abandonedRequests'),
        number: result.abandoned || 0,
        icon: failedIcon,
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
