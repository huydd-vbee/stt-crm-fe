import React from 'react';
import { useTranslation } from 'react-i18next';
import IconHeader from '@src/assets/icons/detail-account.png';
import CardComponent from './CardComponent';

const AccountInformationCard = ({ userData }) => {
  const { t } = useTranslation();

  const rows = [
    {
      name: t('fullName'),
      content: `${userData?.lastName || ''} ${userData?.firstName || ''} `,
    },
    {
      name: t('phoneNumber'),
      content: userData?.phoneNumber || '--',
    },
    { name: t('email'), content: userData?.email || '--' },
  ];

  return (
    <CardComponent
      rows={rows}
      title={`${t('userId')}: ${userData?.id}`}
      iconHeader={IconHeader}
    />
  );
};

export default AccountInformationCard;
