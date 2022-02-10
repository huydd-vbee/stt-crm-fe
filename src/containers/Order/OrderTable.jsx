import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Table from '@src/components/Table';
import moment from 'moment';
import { LANGUAGE } from '@src/constants';

const OrderTable = ({ orders, paging, onChangePage }) => {
  const { t, i18n } = useTranslation();
  const history = useHistory();

  const langVi = i18n.language === LANGUAGE.VI;
  const getPaymentMethod = (rowData) => {
    if (rowData.paymentMethod)
      return langVi
        ? rowData.paymentMethod?.name.vi
        : rowData.paymentMethod?.name.en;
    return '--';
  };

  const getPackageName = (rowData) => {
    if (rowData.package) {
      return langVi ? rowData.package?.name.vi : rowData.package?.name.en;
    }
    return '';
  };

  const handleRowClick = (orderId) => {
    history.push(`/orders/${orderId}`);
  };

  const columns = [
    {
      field: 'firstName',
      title: t('fullName'),
      sortable: false,
      align: 'left',
      render: (rowData) =>
        `${rowData.user?.lastName || ''} ${rowData.user?.firstName || ''}`,
    },
    {
      field: 'transactionId',
      title: t('transactionId'),
      sortable: true,
      align: 'left',
      render: (rowData) => (
        <Typography variant="subtitle2">
          {rowData.transactionId || '--'}
        </Typography>
      ),
    },
    {
      field: 'packageName',
      title: t('packageName'),
      sortable: false,
      align: 'center',
      render: (rowData) => getPackageName(rowData),
    },
    {
      field: 'price',
      title: t('price'),
      sortable: false,
      align: 'center',
      render: (rowData) => `${rowData.price.toLocaleString() || '--'}`,
    },
    {
      field: 'paymentMethod',
      title: t('paymentMethod'),
      sortable: false,
      align: 'center',
      render: (rowData) => getPaymentMethod(rowData),
    },
    {
      field: 'invoice',
      title: t('invoice'),
      sortable: false,
      align: 'center',
      render: (rowData) =>
        `${rowData.invoice?.companyName ? t('yes') : t('no')}`,
    },
    {
      field: 'createdAt',
      title: t('orderCreateTime'),
      sortable: false,
      align: 'center',
      render: (rowData) =>
        `${moment(rowData.createdAt).format('HH:mm:ss-DD/MM/YYYY')}`,
    },
    {
      field: 'confirmedAt',
      title: t('activeTime'),
      sortable: false,
      align: 'center',
      render: (rowData) =>
        `${moment(rowData.confirmedAt).format('HH:mm:ss-DD/MM/YYYY')}`,
    },
  ];
  return (
    <Table
      columns={columns}
      data={orders}
      total={paging.total}
      page={paging.page}
      showNumber
      onChangePage={onChangePage}
      onRowClick={handleRowClick}
    />
  );
};

export default OrderTable;
