import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SuperTabs from '@src/components/Tabs';
import { InputAdornment, Button, TextField} from '@mui/material';
import { Search } from '@mui/icons-material';
import iconExcel from '@src/assets/icons/excel.png';
import CustomDatePickerRangeNew from '@src/components/CustomDatePickerRangeNew';
import { StyledCustomers, StyleButtonsAction } from './index.style';
import StatsCardList from './StatsCardList';
import BotList from './BotList';
import {CUSTOMER_STATS_FEATURE} from "@src/constants/customer";
import apis from "@src/apis";
import moment from "moment";

const INITIAL_PAGING = { page: 1, total: 0 };

const initialTimeRangeFilter = [
  moment().subtract(90, 'd').toString(),
  moment.toString()
];

const initialFilter = () => ({
  createdAt: initialTimeRangeFilter,
  provider: '',
  usagePackage: '',
});

const AsrRequests = () => {
  const { t } = useTranslation();

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState(initialFilter);
  const [paging, setPaging] = useState(INITIAL_PAGING);
  const [activeTab, setActiveTab] = useState(CUSTOMER_STATS_FEATURE.STATUS);

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

  const handleChangeUser = (value) => {
    setSearch(value);
    setPaging(INITIAL_PAGING);
  };

  const handleChangePaging = ({ page, total }) => {
    setPaging({ page: page ?? 1, total: total ?? 0 });
  };

  const handleChangeDatePickerRange = (value) => {
    setFilter({ ...filter, createdAt: value });
  };

  const handleResetFilter = () => setFilter(initialFilter);

  const tabs = [
    {
      id: 'botList',
      label: t('botList'),
      panel: (
        <BotList
          startDate={filter.createdAt[0]}
          endDate={filter.createdAt[1]}
          onChangePage={handleChangePaging}
        />
      ),
    },
    {
      id: 'callSessionList',
      label: t('callSessionList'),
      // TODO: panel
    }
  ];

  const renderOrderAction = (
    <StyleButtonsAction>
      <Button
        variant="outlined"
        startIcon={<img src={iconExcel} alt="icon" />}
        color="secondary"
        onClick={exportOrders}

      >
        {t('exportExcel')}
      </Button>
    </StyleButtonsAction>
  );

  return (
    <StyledCustomers>
      <div className="date-filter">
        <CustomDatePickerRangeNew
          value={filter.createdAt}
          isRefresh
          onChange={handleChangeDatePickerRange}
          handleRefresh={handleResetFilter}
        />
      </div>

      <StatsCardList
        startDate={filter.createdAt[0]}
        endDate={filter.createdAt[1]}
      />

      <div className="search-box">
        <div className="input-search-user">
          <TextField
            id="input-with-icon-textfield"
            label={t('')}
            className="text-field"
            value={search}
            size="small"
            placeholder={t('searchUserPlaceholder')}
            onChange={(e) => handleChangeUser(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </div>
        {/*<div className="filter-box">*/}
        {/*  <SelectComponent*/}
        {/*    name="provider"*/}
        {/*    label={t('provider')}*/}
        {/*    data={providers}*/}
        {/*    value={filter.provider}*/}
        {/*    handleChangeFilter={handleChangeFilter}*/}
        {/*  />*/}
        {/*  <SelectComponent*/}
        {/*    label={t('usagePackage')}*/}
        {/*    name="usagePackage"*/}
        {/*    data={usagePackages}*/}
        {/*    value={filter.usagePackage}*/}
        {/*    handleChangeFilter={handleChangeFilter}*/}
        {/*  />*/}
        {/*</div>*/}
      </div>

      <SuperTabs
        tabs={tabs}
        actionComponents={renderOrderAction}
        onChangeTab={handleChangeTab}
      />
    </StyledCustomers>
  );
};

export default AsrRequests;
