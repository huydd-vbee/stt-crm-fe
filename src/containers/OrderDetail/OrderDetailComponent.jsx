import React from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { LANGUAGE } from '@src/constants';
import { CONFIRM_FROM, CURRENCY } from '@src/constants/order';
import IconHeader from '@src/assets/icons/detail-order.png';
import CardComponent from './CardComponent';

const OrderDetailComponent = ({ orderData }) => {
  const { t, i18n } = useTranslation();
  const { orderId } = useParams();
  const langVi = i18n.language === LANGUAGE.VI;

  const rows = [
    {
      name: t('tradingCode'),
      content: orderData?.transactionId || '--',
    },
    {
      name: t('packageName'),
      content: langVi
        ? orderData?.package?.name.vi
        : orderData?.package?.name.en,
    },
    {
      name: t('price'),
      content: `${orderData?.price.toLocaleString()} ${CURRENCY.VND}`,
    },
    // { name: t('orderContent'), content: orderData.code },
    {
      name: t('paymentMethod'),
      content: langVi
        ? orderData?.paymentMethod?.name.vi
        : orderData?.paymentMethod?.name.en,
    },
    {
      name: t('orderCreateTime'),
      content: `${moment(orderData?.createdAt).format('HH:mm')} \u00A0 ${moment(
        orderData?.createdAt,
      ).format('DD-MM-YYYY')}`,
    },
    {
      name: t('activeTime'),
      content: orderData.confirmedAt
        ? `${moment(orderData.confirmedAt).format('HH:mm')} \u00A0 ${moment(
            orderData?.confirmedAt,
          ).format('DD-MM-YYYY')}`
        : '--',
    },
    {
      name: t('characters'),
      content: orderData?.package?.maxCharacters.toLocaleString(),
    },
    {
      name: t('expireDate'),
      content: moment(orderData?.confirmedAt)
        .add(orderData?.package?.expiresIn, 'days')
        .format('HH:mm | DD-MM-YYYY'),
    },
    {
      name: t('status'),
      content: orderData?.isConfirmedByCustomer
        ? t('approved')
        : t('notApproved'),
    },
    {
      name: t('approveOrderStatus'),
      content:
        orderData?.confirmedFrom === CONFIRM_FROM.SYSTEM
          ? t('auto')
          : t('manual'),
    },
    {
      name: t('invoice'),
      content: orderData?.invoice?.companyName ? t('yes') : t('no'),
    },
    {
      name: t('approver'),
      content: orderData?.confirmedBy || '--',
    },
  ];

  return (
    <CardComponent
      rows={rows}
      title={`${t('orderId')}: ${orderId}`}
      iconHeader={IconHeader}
    />
  );
};

export default OrderDetailComponent;
