import React, {useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from "notistack";
import moment from 'moment';
import apis from "@src/apis";
import IconHeader from '@src/assets/icons/config-icon.png';
import CardComponent from '@src/components/CardComponent';

const SessionCard = ({appId, sessionId}) => {
  const { t } = useTranslation();

  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [callSessionDetail, setCallSessionDetail] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const fetchCardData = (callSessionDetailData) => {
    setCallSessionDetail([
      {
        name: t('appName'),
        content: `${callSessionDetailData?.app.botName || '--'} `,
      },{
      name: t('clientPhoneNumber'),
      content: `${callSessionDetailData?.metadata.clientPhoneNumber || '--'}`,
    },
      {
        name: t('noMessages'),
        content: `${callSessionDetailData.noMessages || '--'}`,
      },
      {
        name: t('startTime'),
        content: `${moment(callSessionDetailData.start).format('HH:mm:ss-DD/MM/YYYY')}`,
      },
      {
        name: t('endTime'),
        content: `${moment(callSessionDetailData.end).format('HH:mm:ss-DD/MM/YYYY')}`,
      },
    ]);
  }

  const fetchCallSessionDetail = async () => {
    setLoading(true);
    const data = await apis.session.getCallSessionDetail({ appId, sessionId });
    if (data.status) {
      // eslint-disable-next-line no-console
      console.info(data.result);
      fetchCardData(data.result);
    } else {
      enqueueSnackbar(t('getCallSessionDetailFailed'), { variant: 'error' });
    }
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line no-console
    fetchCallSessionDetail().catch(err => console.error(err));
  }, [sessionId]);

  return (
    <CardComponent
      rows={callSessionDetail}
      title={`${t('callSessionDetails')}`}
      iconHeader={IconHeader}
    />
  );
};

export default SessionCard;
