import React from 'react';
import { useTranslation } from 'react-i18next';
import SuperTabs from '@src/components/Tabs';
import { StyledCustomers } from './index.style';
import StatsCardList from './StatsCardList';
import CustomerList from './CustomerList';

const Customers = () => {
  const { t } = useTranslation();

  const tabs = [{ label: t('customerList'), panel: <CustomerList /> }];

  return (
    <StyledCustomers>
      <StatsCardList />
      <SuperTabs tabs={tabs} />
    </StyledCustomers>
  );
};

export default Customers;
