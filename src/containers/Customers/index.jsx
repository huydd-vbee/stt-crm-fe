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
  const [startDate, setStartDate] = useState(new Date('2022-01-01'));
  const [endDate, setEndDate] = useState(new Date());

  const tabs = [{ label: t('customerList'), panel: <CustomerList startDate={startDate} endDate={endDate}/> }];
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

  const exportOrders = async () => {
    // TODO: download Excel file here
  };

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
  const handleChangeEndDate = (e) => {
    console.log(e.target.value)
    setEndDate(e.target.value);
  }

  const handleChangeStartDate = (e) => {
    console.log(e.target.value)
    setStartDate(e.target.value);
  }
  return (
    <StyledCustomers>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={6}>
          <CustomerSearch
            customer={selectedCustomer}
            onChange={handleChangeCustomer}
          />{' '}
        </Grid>
        <Grid item xs={3} sm={3}>
          <TextField
            name="startDate"
            type="date"
            //value={startDate}
            placeholder="dd/mm/yy"
            onChange={handleChangeStartDate}
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={3} sm={3}>
          <TextField
            name="endDate"
            //value={endDate}
            type="date"
            placeholder="dd/mm/yy"
            size="small"
            onChange={handleChangeEndDate}
            fullWidth
          />
        </Grid>
      </Grid>
      <StatsCardList startDate={startDate} endDate={endDate}/>
      <SuperTabs tabs={tabs} actionComponents={renderOrderAction} />
    </StyledCustomers>
  );
};

export default Customers;
