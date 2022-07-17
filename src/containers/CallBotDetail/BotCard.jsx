import React, {useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from "notistack";
import apis from "@src/apis";
import IconHeader from '@src/assets/icons/config-icon.png';
import CardComponent from './CardComponent';

const BotCard = ({appId}) => {
  const { t } = useTranslation();

  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [botConfig, setBotConfig] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

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

  useEffect(() => {
    // eslint-disable-next-line no-console
    fetchBotConfig().catch(err => console.error(err));
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
