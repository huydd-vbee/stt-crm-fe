import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Table from '@src/components/Table';
import moment from 'moment';
import { LANGUAGE } from '@src/constants';

const PackageTable = ({ orders, paging, onChangePage }) => {
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
      field: 'packageName',
      title: t('packageName'),
      sortable: false,
      align: 'center',
      render: (rowData) => getPackageName(rowData),
    },
    {
      field: 'serviceType',
      title: t('serviceType'),
      sortable: true,
      align: 'center',
      render: (rowData) => rowData.serviceType,
    },
    {
      field: 'usedTime',
      title: t('usedTime'),
      sortable: false,
      align: 'center',
      render: (rowData) => rowData.useTime,
    },
    {
      field: 'price',
      title: t('price'),
      sortable: false,
      align: 'center',
      render: (rowData) => `${rowData.price.toLocaleString() || '--'}`,
    },
    {
      field: 'keyService',
      title: t('keyService'),
      sortable: false,
      align: 'center',
      render: (rowData) => getPaymentMethod(rowData),
    },
    {
      field: 'usableTime',
      title: t('usableTime'),
      sortable: false,
      align: 'center',
      render: (rowData) => rowData.usableTime,
    },
    {
      field: 'status',
      title: t('status'),
      sortable: false,
      align: 'center',
      render: (rowData) => rowData.status,
    },
    {
      field: 'createdAt',
      title: t('orderCreateTime'),
      sortable: false,
      align: 'center',
      render: (rowData) =>
        `${moment(rowData.createdAt).format('HH:mm:ss-DD/MM/YYYY')}`,
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

export default PackageTable;
