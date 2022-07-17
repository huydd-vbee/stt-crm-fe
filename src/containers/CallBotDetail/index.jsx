import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import { Button } from '@mui/material';

import apis from '@src/apis';
import ProcessHandler from '@src/components/ProcessHandler';
import SuperTabs from '@src/components/Tabs';
import { CUSTOMER_STATS_FEATURE } from '@src/constants/customer';
import { StyleButtonsAction } from '@src/containers/Order/index.style';
import iconExcel from '@src/assets/icons/excel.png';

import BotCard from '@src/containers/CallBotDetail/BotCard';
import StatsCardList from '@src/containers/CallBotDetail/StatsCardList';
import BotCallSessionList from '@src/containers/CallBotDetail/BotCallSessionList';
import CustomDatePickerRangeNew from "@src/components/CustomDatePickerRangeNew";
import {StyledCustomerDetail, StyledCallBotDetailContainer} from './index.style';

const CallBotDetail = () => {
  const { t } = useTranslation();
  // eslint-disable-next-line no-unused-vars
  const { enqueueSnackbar } = useSnackbar();

  const location = useLocation();

  const initialTimeRangeFilter = [
    location.state?.startDate || null,
    location.state?.endDate || null
  ];

  const initialFilter = {
    search: '',
    createdAt: initialTimeRangeFilter,
  };

  const { appId } = useParams();

  const [paging, setPaging] = useState({ page: 1, total: 0 });
  const [activeTab, setActiveTab] = useState(CUSTOMER_STATS_FEATURE.STATUS);
  const [filter, setFilter] = useState(initialFilter);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);

  const exportOrders = async () => {
    const data = await apis.statistics.exportExcelFile({
      status: activeTab,
    });

    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `APP-REQUESTS-${activeTab}.xlsx`);
    document.body.appendChild(link);
    link.click();
  };

  const handleChangeTab = (value) => {
    setActiveTab(value);
    setPaging({ ...paging, page: 1 });
  };

  /* eslint-disable-next-line no-unused-vars */
  const handleChangePaging = ({ page, total }) => {
    setPaging({ page: page ?? 1, total: total ?? 0 });
  };

  const handleChangeDatePickerRange = (value) => {
    setFilter({ ...filter, createdAt: value });
  };

  const handleResetFilter = () =>
    setFilter({ ...filter, createdAt: initialTimeRangeFilter });


  const tabs = [
    {
      label: t('callSessionList'),
      id: CUSTOMER_STATS_FEATURE.SESSION,
      panel: (
        <BotCallSessionList
          startDate={filter.createdAt[0]}
          endDate={filter.createdAt[1]}
          appId={appId}
        />
      )
    },
    {
      label: t('STATUS'),
      id: CUSTOMER_STATS_FEATURE.STATUS,
      // TODO
    },
  ];

  const renderOrderAction = (
    <StyleButtonsAction>
      <Button
        variant='outlined'
        startIcon={<img src={iconExcel} alt='icon' />}
        color='secondary'
        onClick={exportOrders}
      >
        {t('exportExcel')}
      </Button>
    </StyleButtonsAction>
  );

  return (
    <StyledCustomerDetail>
      <div className="date-filter">
        <CustomDatePickerRangeNew
          value={filter.createdAt}
          isRefresh
          onChange={handleChangeDatePickerRange}
          handleRefresh={handleResetFilter}
        />
      </div>

      <ProcessHandler loading={loading}>
        <StyledCallBotDetailContainer>
          <StatsCardList
            startDate={filter.createdAt[0]}
            endDate={filter.createdAt[1]}
            appId={appId}
          />
          <BotCard appId={appId} />
        </StyledCallBotDetailContainer>

        {/* <Grid container spacing={2}> */}
        {/*  <Grid item xs={6} sm={6}> */}
        {/*    /!*<StyledStatsCardList>*!/ */}

          {/*  /!*</StyledStatsCardList>*!/ */}
          {/* </Grid> */}
          {/* <Grid item xs={6} sm={6}> */}

        {/*  </Grid> */}
        {/* </Grid> */}

        <SuperTabs
          tabs={tabs}
          onChangeTab={handleChangeTab}
          actionComponents={renderOrderAction}
        />
      </ProcessHandler>

    </StyledCustomerDetail>
  );
};

export default CallBotDetail;
