import React, { useState } from 'react';
import { Button, TextField, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import SuperTabs from '@src/components/Tabs';
import CustomerSearch from '@src/components/CustomerSearch';
import iconExcel from '@src/assets/icons/excel.png';
import { PACKAGE_DURATION, PACKAGE_LEVEL } from '@src/constants/package';
import {
  StyledCustomers,
  StyledMenuItem,
  StyleButtonsAction,
} from './index.style';
import StatsCardList from './StatsCardList';
import CustomerList from './CustomerList';

const Customers = () => {
  const { t } = useTranslation();

  const tabs = [{ label: t('customerList'), panel: <CustomerList /> }];
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [packages, setPackages] = useState([]);
  const renderPackageCode = (packageCode) => {
    // eslint-disable-next-line no-unused-vars
    const [type, level, duration] = packageCode.split('-');
    const levelKey = PACKAGE_LEVEL[level];
    if (!duration) return t(levelKey);

    const durationKey = PACKAGE_DURATION[duration];
    return `${t(levelKey)} - ${t(durationKey)}`;
  };
  const exportOrders = async () => {};

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

  const handleChangeCustomer = (customer) => {
    setSelectedCustomer(customer);
    setPackages([]);
  };

  return (
    <StyledCustomers>
      <Grid container spacing={2}>
        <Grid item xs={3} sm={3}>
          <CustomerSearch
            customer={selectedCustomer}
            onChange={handleChangeCustomer}
          />{' '}
        </Grid>
        <Grid item xs={3} sm={3}>
          <TextField
            name="package"
            // value=""
            placeholder={t('packagePlaceholder')}
            size="small"
            fullWidth
            select
          >
            {packages &&
              packages.map((item) => (
                <StyledMenuItem key={item.id} value={item.id}>
                  {renderPackageCode(item.code)}
                </StyledMenuItem>
              ))}
          </TextField>
        </Grid>
        <Grid item xs={3} sm={3}>
          <TextField
            name="package"
            value=""
            placeholder={t('packagePlaceholder')}
            size="small"
            fullWidth
            select
          >
            {packages &&
              packages.map((item) => (
                <StyledMenuItem key={item.id} value={item.id}>
                  {renderPackageCode(item.code)}
                </StyledMenuItem>
              ))}
          </TextField>
        </Grid>
        <Grid item xs={3} sm={3}>
          <TextField
            name="expiryDate"
            type="date"
            value=""
            placeholder="dd/mm/yy"
            size="small"
            fullWidth
          />
        </Grid>
      </Grid>
      <StatsCardList />
      <SuperTabs tabs={tabs} actionComponents={renderOrderAction} />
    </StyledCustomers>
  );
};

export default Customers;
