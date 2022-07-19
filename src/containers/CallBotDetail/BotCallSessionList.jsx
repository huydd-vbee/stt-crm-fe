import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import apis from '@src/apis';
import Table from '@src/components/Table';
import moment from 'moment';
import {LANGUAGE, PAGINATION_LIMIT} from '@src/constants';
import {useSnackbar} from "notistack";

const BotCallSessionList = ({startDate, endDate, appId}) => {
  const { t, i18n } = useTranslation();
  // eslint-disable-next-line no-unused-vars
  const history = useHistory();
  // eslint-disable-next-line no-unused-vars
  const langVi = i18n.language === LANGUAGE.VI;
  const { enqueueSnackbar } = useSnackbar();

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paging, setPaging] = useState({ page: 1, total: 0 });

  const handleChangePage = (newPage) => setPaging({ ...paging, page: newPage });

  const handleRowClick = (sessionId) => {
    history.push(`/history/app/${appId}/session/${sessionId}`);
  };

  const fetchSession = async () => {
    setLoading(true);
    const data = await apis.requests.getCallSessionsByApp({
      appId,
      limit: PAGINATION_LIMIT,
      offset: (paging.page - 1) * PAGINATION_LIMIT,
      startDate,
      endDate,

    });
    if (data.status) {
      setSessions(data.result.items);
      setPaging({ ...paging, total: data.result.total});
    } else {
      enqueueSnackbar(t('getSessionsFailed'), { variant: 'error' });
    }
    setLoading(false);
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
    }, {
      field: 'noMsgs',
      title: t('noMessages'),
      sortable: false,
      align: 'left',
      render: (rowData) =>
        `${rowData.noMessages || ''}`,
    }, {
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

  useEffect(() => {
    // eslint-disable-next-line no-console
    fetchSession().catch((err) => console.error(err));
  }, [paging.page, startDate, endDate]);


return (
    <Table
      columns={columns}
      data={sessions}
      total={paging.total}
      page={paging.page}
      loading={loading}
      showNumber
      onChangePage={handleChangePage}
      onRowClick={handleRowClick}
    />
  );
};

export default BotCallSessionList;
