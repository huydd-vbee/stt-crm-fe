import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import { Button, Grid, TextField } from '@mui/material';
import moment from 'moment';

import apis from '@src/apis';
import ProcessHandler from '@src/components/ProcessHandler';
import { CUSTOMER_STATS_FEATURE } from '@src/constants/customer';
import SuperTabs from '@src/components/Tabs';
import OrderTable from '@src/containers/Order/OrderTable';
import { StyleButtonsAction } from '@src/containers/Order/index.style';
import iconExcel from '@src/assets/icons/excel.png';
import BotCard
  from '@src/containers/CustomerDetail/BotCard';

import { fakePartnerAppInformation } from '@src/containers/CustomerDetail/fakeData';
import StatsCardList from '@src/containers/CustomerDetail/StatsCardList';
import BotCallSessionTable from '@src/containers/CustomerDetail/BotCallSessionTable';
import CustomDatePickerRangeNew from "@src/components/CustomDatePickerRangeNew";
import {StyledCustomerDetail, StyledStatsCardList} from './index.style';

const initialTimeRangeFilter = [
  moment().subtract(90, 'd').toString(),
  moment.toString()
];

const initialFilter = {
  search: '',
  createdAt: initialTimeRangeFilter,
};


const DetailCustomer = () => {
  const { t } = useTranslation();

  const { customerId: appId } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const [paging, setPaging] = useState({ page: 1, total: 0 });
  const [activeTab, setActiveTab] = useState(CUSTOMER_STATS_FEATURE.STATUS);
  const [filter, setFilter] = useState(initialFilter);
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
      label: t('SESSION'),
      id: CUSTOMER_STATS_FEATURE.SESSION,
      panel: (
        <BotCallSessionTable
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
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6}>
            {/*<StyledStatsCardList>*/}
              <StatsCardList
                startDate={filter.createdAt[0]}
                endDate={filter.createdAt[1]}
                appId={appId}
              />
            {/*</StyledStatsCardList>*/}
          </Grid>
          <Grid item xs={6} sm={6}>
            <BotCard appId={appId} />
          </Grid>
        </Grid>

        <SuperTabs
          tabs={tabs}
          onChangeTab={handleChangeTab}
          actionComponents={renderOrderAction}
        />
      </ProcessHandler>

    </StyledCustomerDetail>
  );
};

export default DetailCustomer;
