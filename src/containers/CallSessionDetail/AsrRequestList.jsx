import React, { useEffect, useState } from 'react';
import {useSnackbar} from "notistack";
import { Typography, IconButton } from '@mui/material';
import { ReadMore } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import apis from '@src/apis';
import Table from '@src/components/Table';
import moment from 'moment';
import {PAGINATION_LIMIT} from '@src/constants';
import AsrRequestDetailDrawer from "./AsrRequestDetailDrawer";

const AsrRequestList = ({ appId, sessionId}) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const [asrRequests, setAsrRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paging, setPaging] = useState({ page: 1, total: 0 });
  const [selectedAsrRequest, setSelectedAsrRequest] = useState(null);
  const [openAsrRequestDetailDrawer, setOpenAsrRequestDetailDrawer] = useState(false);

  const handleChangePage = (newPage) => setPaging({ ...paging, page: newPage });

  const handleCloseAsrRequestDrawer = () => {
    setOpenAsrRequestDetailDrawer(false);
  };

  const handleOpenAsrRequestDetailDrawer = (row) => {
    setOpenAsrRequestDetailDrawer(true);
    setSelectedAsrRequest(row);
  };

  const fetchAsrRequestList = async () => {
    setLoading(true);
    const data = await apis.requests.getCallRequestsBySessionAndApp({
      appId,
      sessionId,
      limit: PAGINATION_LIMIT,
      offset: (paging.page - 1) * PAGINATION_LIMIT,
    });
    if (data.status) {
      // eslint-disable-next-line no-console
      console.info(data.result);
      setAsrRequests(data.result.items);
      setPaging({ ...paging, total: data.result.total});
    } else {
      enqueueSnackbar(t('getSessionsFailed'), { variant: 'error' });
    }
    setLoading(false);
  };

  const columns = [
    {
      field: 'messageId',
      title: t('messageId'),
      sortable: false,
      align: 'left',
      render: (rowData) => (
        <Typography variant="subtitle2">
          {rowData.message.messageId || '--'}
        </Typography>
      ),
    },
    {
      field: 'status',
      title: t('status'),
      sortable: false,
      align: 'left',
      render: (rowData) => (
        <Typography variant="subtitle2">
          {rowData.message.status.status || '--'}
        </Typography>
      ),
    },
    {
      field: 'transcript',
      title: t('transcript'),
      sortable: false,
      align: 'left',
      render: (rowData) => (
        <Typography variant="subtitle2">
          {/* eslint-disable-next-line no-nested-ternary */}
          { rowData.message.text
            ? (rowData.message.text !== ""
              ? rowData.message.text
              : t('silence'))
            : '--'
          }
        </Typography>
      ),
    },
    {
      field: 'processingTime',
      title: t('processingTime'),
      sortable: false,
      align: 'center',
      render: (rowData) =>
        `${ new Date(rowData.finishAsrAt).getTime() - new Date(rowData.startAsrAt).getTime() || ''}`,
    },
    {
      field: 'startedAt',
      title: t('startTime'),
      sortable: false,
      align: 'center',
      render: (rowData) =>
        `${moment(rowData.sendAsrAt).format('HH:mm:ss-DD/MM/YYYY')}`,
    },
    {
      field: 'endedAt',
      title: t('endTime'),
      sortable: false,
      align: 'center',
      render: (rowData) =>
        `${moment(rowData.endAsrAt).format('HH:mm:ss-DD/MM/YYYY')}`,
    },
    {
      field: 'action',
      title: t('action'),
      sortable: false,
      align: 'center',
      render: (rowData) => (
        <IconButton onClick={() => handleOpenAsrRequestDetailDrawer(rowData)}>
          <ReadMore />
        </IconButton>
      ),
    },
  ];

  useEffect(() => {
    // eslint-disable-next-line no-console
    fetchAsrRequestList().catch((err) => console.error(err));
  }, [paging.page]);


return (
  <div>
    <Table
      columns={columns}
      data={asrRequests}
      total={paging.total}
      page={paging.page}
      loading={loading}
      showNumber
      onChangePage={handleChangePage}
    />
    {selectedAsrRequest && (
      <AsrRequestDetailDrawer
        open={openAsrRequestDetailDrawer}
        appId={appId}
        sessionId={sessionId}
        requestId={selectedAsrRequest.message.messageId}
        onClose={handleCloseAsrRequestDrawer}
      />
    )}
  </div>
)
};

export default AsrRequestList;
