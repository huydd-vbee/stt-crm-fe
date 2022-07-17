import React from 'react';
import { useTranslation } from 'react-i18next';
import IconHeader from '@src/assets/icons/detail-invoice.png';
import CardComponent from './CardComponent';

const DetailInvoiceCard = ({ invoice }) => {
  const { t } = useTranslation();

  const rows = [
    {
      name: t('companyName'),
      content: invoice?.companyName || '--',
    },
    {
      name: t('address'),
      content: invoice?.companyAddress || '--',
    },
    {
      name: t('email'),
      content: invoice?.companyEmail || '--',
    },
  ];

  return (
    <CardComponent
      rows={rows}
      title={t('invoiceInfo')}
      iconHeader={IconHeader}
    />
  );
};

export default DetailInvoiceCard;
