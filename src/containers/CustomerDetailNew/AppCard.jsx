import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, Switch, Typography, Divider } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { APP_STATUS } from '@src/constants/app';
import { delimitNumber } from '@src/utils/number';
import { StyledAppCard } from './index.style';

const AppCard = ({
  name,
  admin,
  apiType,
  status,
  totalRequests,
  totalCharacters,
  successRate,
  totalMoney,
}) => {
  const { t } = useTranslation();

  const renderStatus = () => {
    switch (status) {
      case APP_STATUS.ACTIVE:
        return <Switch defaultChecked disabled />;
      case APP_STATUS.INACTIVE:
        return <Switch disabled />;
      default:
        return <Switch disabled />;
    }
  };

  return (
    <StyledAppCard>
      <div className="card-header">
        <Typography>{name}</Typography>
        <IconButton>
          <Edit />
        </IconButton>
      </div>
      <Divider />
      <div>
        <div className="card-row">
          <Typography>{t('account')}</Typography>
          <Typography>{admin}</Typography>
        </div>
        <div className="card-row">
          <Typography>{t('apiType')}</Typography>
          <Typography>{apiType}</Typography>
        </div>
        <div className="card-row">
          <Typography>{t('status')}</Typography>
          {renderStatus(status)}
        </div>
        <Divider />
      </div>
      <div>
        <div className="card-row">
          <Typography>{t('totalRequests')}</Typography>
          <Typography>{delimitNumber(totalRequests)}</Typography>
        </div>
        <div className="card-row">
          <Typography>{t('totalCharacters')}</Typography>
          <Typography>{delimitNumber(totalCharacters)}</Typography>
        </div>
        <div className="card-row">
          <Typography>{t('successRate')}</Typography>
          <Typography>{delimitNumber(successRate)} %</Typography>
        </div>
        <div className="card-row">
          <Typography>{t('totalMoney')}</Typography>
          <Typography>{delimitNumber(totalMoney)}</Typography>
        </div>
      </div>
    </StyledAppCard>
  );
};

export default AppCard;
