import React, {useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
import IconHeader from '@src/assets/icons/config-icon.png';
import CardComponent from './CardComponent';
import apis from "@src/apis";
import {useSnackbar} from "notistack";

const BotCard = ({appId}) => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [botConfig, setBotConfig] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const fetchBotConfig = async () => {
    setLoading(true);
    const data = await apis.bot.getBotConfigDetails(appId);
    if (data.status) {
      setBotConfigRows(data.result);
    } else {
      enqueueSnackbar(t('getCustomerDetailFailed'), { variant: 'error' });
    }
    setLoading(false);
  };

  const setBotConfigRows = (botConfigInfo) => {
    setBotConfig([
      {
        name: t('botName'),
        content: `${botConfigInfo?.botName || '--'} `,
      },{
      name: t('botMaxDepth'),
      content: `${botConfigInfo?.botBranchMax || '--'} actions`,
    },
      {
        name: t('botAvgDepth'),
        content: `${Math.round(botConfigInfo?.botDepthAvgTheory * 100) / 100 || '--'} actions`,
      },
      {
        name: t('botAvgDuration'),
        content: `${Math.round(botConfigInfo?.botDurationAvg * 100) / 100 || '--'} seconds`,
      },
    ]);
  }



  useEffect(() => {
    fetchBotConfig()
      .catch(err => console.error(err));
  }, [appId]);

  return (
    <CardComponent
      rows={botConfig}
      title={`${t('botComplexity')}`}
      iconHeader={IconHeader}
    />
  );
};

export default BotCard;
