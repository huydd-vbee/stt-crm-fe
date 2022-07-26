import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Table from '@src/components/Table';
import { PACKAGE_DURATION, PACKAGE_LEVEL } from '@src/constants/package';
import { PAGINATION_LIMIT } from '@src/constants';
import apis from '@src/apis';
import { useHistory } from 'react-router-dom';
import {Typography} from "@mui/material";
import moment from "moment";

const CallSessionList = ({ startDate, endDate }) => {
  const { t } = useTranslation();
  const history = useHistory();

  const [callSessions, setCallSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paging, setPaging] = useState({ page: 1, total: 0 });

  // eslint-disable-next-line no-unused-vars
  const renderPackageCode = (packageCode) => {
    if (!packageCode) return '';
    // eslint-disable-next-line no-unused-vars
    const [type, level, duration] = packageCode.split('-');
    const levelKey = PACKAGE_LEVEL[level];
    if (!duration) return t(levelKey);

    const durationKey = PACKAGE_DURATION[duration];
    return `${t(levelKey)} - ${t(durationKey)}`;
  };

  const handleChangePage = (newPage) => setPaging({ ...paging, page: newPage });

  const fetchCallSessionList = async () => {
    setLoading(true);
    // eslint-disable-next-line no-console
    console.log("fetch Call Session List", paging);
    const data = await apis.session.getCallSessions({
      limit: PAGINATION_LIMIT,
      offset: (paging.page - 1) * PAGINATION_LIMIT,
      startDate,
      endDate,
    });
    // eslint-disable-next-line no-console
    console.log(data)
    setLoading(false);

    if (data.status) {
      setCallSessions(data.result.items);
      setPaging({ ...paging, total: data.result.total });
    }
    // eslint-disable-next-line no-console
    console.log(callSessions);
  };

  const columns = [
    {
      field: 'sessionId',
      title: t('sessionId'),
      sortable: true,
      align: 'left',
      render: (rowData) => (
        <Typography variant="subtitle2">
          {rowData.id || '--'}
        </Typography>
      ),
    },
    {
      field: 'botName',
      title: t('botName'),
      sortable: true,
      align: 'left',
      render: (rowData) => (
        <Typography variant="subtitle2">
          {rowData.app.botName || '--'}
        </Typography>
      ),
    },
    {
      field: 'noMsgs',
      title: t('noMessages'),
      sortable: false,
      align: 'right',
      render: (rowData) => `${rowData.noMessages || ''}`,
    },
    {
      field: 'startedAt',
      title: t('startTime'),
      sortable: false,
      align: 'center',
      render: (rowData) =>
        `${moment(rowData.start).format('HH:mm:ss-DD/MM/YYYY')}`,
    },
    {
      field: 'endedAt',
      title: t('endTime'),
      sortable: false,
      align: 'center',
      render: (rowData) =>
        `${moment(rowData.end).format('HH:mm:ss-DD/MM/YYYY')}`,
    },
  ];

  const handleRowClick = (sessionId, sessionData) => {
    // eslint-disable-next-line no-console
    console.info(sessionData);
    const {botId: appId} = sessionData.app;
    history.push(`/history/app/${appId}/session/${sessionId}`);
  };

  useEffect(() => {
    // eslint-disable-next-line no-console
    fetchCallSessionList().catch(err => console.error(err));
  }, [paging.page, startDate, endDate]);

  return (
    <Table
      data={callSessions}
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

export default CallSessionList;


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
