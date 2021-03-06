/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

// eslint-disable-next-line no-unused-vars
import SelectComponent from '@src/components/Select';
import CustomDatePickerRangeNew from '@src/components/CustomDatePickerRangeNew';
import SuperTabs from '@src/components/Tabs';

import { IDENTITY_PROVIDER } from '@src/constants/customer';
// eslint-disable-next-line no-unused-vars
import iconExcel from '@src/assets/icons/excel.png';

// eslint-disable-next-line no-unused-vars
import AppStats from '@src/containers/Dashboard/AppStats';
import { StyledCustomers, ExcelButton } from './index.style';
// eslint-disable-next-line no-unused-vars

import RequestStats from './RequestStats';

const Dashboard = () => {

  const { t } = useTranslation();

  const initialTimeRangeFilter = [
    moment().subtract(180, 'd').toString(),
    moment().toString(),
  ];

  const initialFilter = () => ({
    createdAt: initialTimeRangeFilter,
    provider: '',
    usagePackage: '',
  });

  // eslint-disable-next-line no-unused-vars
  const providers = Object.keys(IDENTITY_PROVIDER).map((item) => ({
    value: IDENTITY_PROVIDER[item],
    label:
      IDENTITY_PROVIDER[item] === IDENTITY_PROVIDER.ALL
        ? t('all')
        : IDENTITY_PROVIDER[item],
  }));

  const [filter, setFilter] = useState(initialFilter);

  const handleChangeFilter = ({ value, name }) => {
    setFilter({ ...filter, [name]: value });
  };

  const handleChangeDatePickerRange = (value) => {
    setFilter({ ...filter, createdAt: value });
  };

  const handleResetFilter = () => setFilter(initialFilter);

  const handleChangeTab = () => {
  };

  const tabs = [
    {
      id: 'overview',
      label: t('overview'),
      panel: (
        <RequestStats
          dateFilter={filter.createdAt}
        />
      ),
    },
    {
      id: 'byApp',
      label: t('byApp'),
      panel: (
        <AppStats
          dateFilter={filter.createdAt}
        />
      ),
    },
  ];

  const renderDashboardAction = (
    <div className='styled-action-row'>
      {/* <ExcelButton */}
      {/*  variant='outlined' */}
      {/*  startIcon={<img src={iconExcel} alt='icon' />} */}
      {/*  color='secondary' */}
      {/* > */}
      {/*  {t('exportExcel')} */}
      {/* </ExcelButton> */}
      {/* <SelectComponent */}
      {/*  name='provider' */}
      {/*  label={t('provider')} */}
      {/*  data={providers} */}
      {/*  value={filter.provider} */}
      {/*  handleChangeFilter={handleChangeFilter} */}
      {/* /> */}
      {/* <CustomDatePickerRangeNew */}
      {/*  value={filter.createdAt} */}
      {/*  isRefresh */}
      {/*  onChange={handleChangeDatePickerRange} */}
      {/*  handleRefresh={handleResetFilter} */}
      {/* /> */}
    </div>
  );

  return (
    <StyledCustomers>
      <SuperTabs
        tabs={tabs}
        actionComponents={renderDashboardAction}
        onChangeTab={handleChangeTab}
      />
    </StyledCustomers>
  );
};

export default Dashboard;
