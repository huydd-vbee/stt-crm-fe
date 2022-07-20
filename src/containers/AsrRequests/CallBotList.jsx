import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Table from '@src/components/Table';
import { PACKAGE_DURATION, PACKAGE_LEVEL } from '@src/constants/package';
import { PAGINATION_LIMIT } from '@src/constants';
import apis from '@src/apis';
import { useHistory } from 'react-router-dom';

const CallBotList = ({ startDate, endDate }) => {
  const { t } = useTranslation();
  const history = useHistory();

  const [callBots, setCallBots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paging, setPaging] = useState({ page: 1, total: 0 });

  /* eslint-disable no-unused-vars */
  const renderPackageCode = (packageCode) => {
    if (!packageCode) return '';

    const [type, level, duration] = packageCode.split('-');
    const levelKey = PACKAGE_LEVEL[level];
    if (!duration) return t(levelKey);

    const durationKey = PACKAGE_DURATION[duration];
    return `${t(levelKey)} - ${t(durationKey)}`;
  };

  const fetchCallBotList = async () => {
    setLoading(true);
    // eslint-disable-next-line no-console
    console.log("fetch Call Bot List", paging);
    const data = await apis.statistics.getRequestStatsByApp({
      limit: PAGINATION_LIMIT,
      offset: (paging.page - 1) * PAGINATION_LIMIT,
      startDate,
      endDate,
      });
    // eslint-disable-next-line no-console
    console.log(data)
    setLoading(false);

    if (data.status) {
      setCallBots(data.result.items);
      setPaging({ ...paging, total: data.result.total});
    }

    // eslint-disable-next-line no-console
    console.log(callBots);
  };

  const columns = [
    {
      field: 'botName',
      title: t('botName'),
      sortable: true,
      align: 'left',
      render: (row) => `${row.botDetails.botName || ''}`,
    },
    {
      field: 'avgMessagePerCall',
      title: t('avgMessagePerCall'),
      sortable: false,
      align: 'left',
      render: (row) => `${Math.round(row.avgMessageEachCall * 100) / 100 || 0}`,
    },
    {
      field: 'noCall',
      title: t('noCall'),
      sortable: false,
      align: 'left',
      render: (row) => `${row.noCall || 0}`,
    }
  ];

  const handleRowClick = (appId) => {
    history.push(`/history/app/${appId}`, {startDate, endDate});
  };

  const handleChangePage = (newPage) => setPaging({ ...paging, page: newPage });

  useEffect(() => {
    // eslint-disable-next-line no-console
    fetchCallBotList().catch(err => console.error(err));
  }, [paging.page, startDate, endDate]);

  return (
    <Table
      data={callBots}
      columns={columns}
      total={paging.total}
      page={paging.page}
      loading={loading}
      showNumber
      onChangePage={handleChangePage}
      onRowClick={handleRowClick}
    />
  );
};

export default CallBotList;


// {
//   field: 'processingRequest',
//   title: t('processing'),
//   sortable: false,
//   align: 'left',
//   render: (row) => {
//     let found = Array.from(row.requestCounts).find(ele => !ele.status) || {count: 0};
//     return found.count;
//   },
// },
// {
//   field: 'phoneNumber',
//   title: t('phoneNumber'),
//   sortable: false,
//   align: 'left',
// },
// {
//   field: 'email',
//   title: 'Email',
//   sortable: false,
//   align: 'left',
// },
// {
//   field: 'paidDuration',
//   title: t('paidDuration'),
//   sortable: false,
//   align: 'left',
//   render: (row) => delimitNumber(row.paidDuration),
// },
// {
//   field: 'freeDuration',
//   title: t('freeDuration'),
//   sortable: false,
//   align: 'left',
//   render: (row) => delimitNumber(row.freeDuration),
// },
// {
//   field: 'packageCode',
//   title: t('package'),
//   sortable: false,
//   align: 'left',
//   render: (row) => renderPackageCode(row.packageCode),
// },
// {
//   field: 'packageExpiryDate',
//   title: t('expiryDate'),
//   sortable: false,
//   align: 'left',
//   render: (row) => moment(row.packageExpiryDate).format('DD-MM-YYYY'),
// },
