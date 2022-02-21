import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import Table from '@src/components/Table';
import { delimitNumber } from '@src/utils/number';
import { PACKAGE_DURATION, PACKAGE_LEVEL } from '@src/constants/package';
import { PAGINATION_LIMIT } from '@src/constants';
import apis from '@src/apis';

const CustomerList = () => {
  const { t } = useTranslation();

  const [paging, setPaging] = useState({ page: 1, total: 0 });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const renderPackageCode = (packageCode) => {
    if (!packageCode) return '';
    // eslint-disable-next-line no-unused-vars
    const [type, level, duration] = packageCode.split('-');
    const levelKey = PACKAGE_LEVEL[level];
    if (!duration) return t(levelKey);

    const durationKey = PACKAGE_DURATION[duration];
    return `${t(levelKey)} - ${t(durationKey)}`;
  };

  const fetchUsers = async () => {
    setLoading(true);
    const data = await apis.users.getUsers({
      limit: PAGINATION_LIMIT,
      offset: (paging.page - 1) * PAGINATION_LIMIT,
      sort: 'createdAt_desc',
    });
    setLoading(false);
    if (data?.status) {
      setUsers(data.result.users);
      setPaging({ ...paging, total: data.result.total });
    }
  };

  const columns = [
    {
      field: 'account',
      title: t('account'),
      sortable: false,
      align: 'left',
      render: (row) => row,
    },
    {
      field: 'name',
      title: t('fullName'),
      sortable: false,
      align: 'left',
      render: (row) => `${row.lastName || ''} ${row.firstName || ''}`,
    },
    {
      field: 'phoneNumber',
      title: t('phoneNumber'),
      sortable: false,
      align: 'left',
    },
    {
      field: 'email',
      title: 'Email',
      sortable: false,
      align: 'left',
    },
    {
      field: 'paidDuration',
      title: t('paidDuration'),
      sortable: false,
      align: 'left',
      render: (row) => delimitNumber(row.paidDuration),
    },
    {
      field: 'freeDuration',
      title: t('freeDuration'),
      sortable: false,
      align: 'left',
      render: (row) => delimitNumber(row.freeDuration),
    },
    {
      field: 'packageCode',
      title: t('package'),
      sortable: false,
      align: 'left',
      render: (row) => renderPackageCode(row.packageCode),
    },
    {
      field: 'packageExpiryDate',
      title: t('expiryDate'),
      sortable: false,
      align: 'left',
      render: (row) => moment(row.packageExpiryDate).format('DD-MM-YYYY'),
    },
  ];

  const handleChangePage = (page) => setPaging({ ...paging, page });

  useEffect(() => {
    fetchUsers();
  }, [paging.page]);

  return (
    <Table
      data={users}
      columns={columns}
      total={paging.total}
      page={paging.page}
      loading={loading}
      showNumber
      onChangePage={handleChangePage}
    />
  );
};

export default CustomerList;
