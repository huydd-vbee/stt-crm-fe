import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import { Button } from '@mui/material';

import apis from '@src/apis';
import ProcessHandler from '@src/components/ProcessHandler';
import SuperTabs from '@src/components/Tabs';
import { CUSTOMER_STATS_FEATURE } from '@src/constants/customer';
import { StyleButtonsAction } from '@src/containers/Order/index.style';
import iconExcel from '@src/assets/icons/excel.png';

import AsrRequestList from "./AsrRequestList";
import SessionCard from "./SessionCard";
import {StyledCustomerDetail, StyledCallBotDetailContainer} from './index.style';

const CallSessionDetail = () => {
  const { t } = useTranslation();
  // eslint-disable-next-line no-unused-vars
  const { enqueueSnackbar } = useSnackbar();

  // eslint-disable-next-line no-unused-vars
  const { appId, sessionId } = useParams();

  const [paging, setPaging] = useState({ page: 1, total: 0 });
  const [activeTab, setActiveTab] = useState(CUSTOMER_STATS_FEATURE.STATUS);
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

  const tabs = [
    {
      label: t('asrRequestList'),
      id: CUSTOMER_STATS_FEATURE.SESSION,
      panel: (
        <AsrRequestList
          appId={appId}
          sessionId={sessionId}
        />
      )
    }
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

      <ProcessHandler loading={loading}>
        <StyledCallBotDetailContainer>
          <SessionCard appId={appId} sessionId={sessionId} />
        </StyledCallBotDetailContainer>

        <SuperTabs
          tabs={tabs}
          onChangeTab={handleChangeTab}
          actionComponents={renderOrderAction}
        />
      </ProcessHandler>

    </StyledCustomerDetail>
  );
};

export default CallSessionDetail;
