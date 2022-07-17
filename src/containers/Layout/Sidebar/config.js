/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ROUTES from '@src/constants/routes';
import {
  Dashboard,
  PermPhoneMsg,
  AccountBox,
  Description,
  DeveloperBoard,
  Email,
  Help,
  LocalAtm,
  More,
  ShoppingCart,
} from '@mui/icons-material';

export const sidebarMenu = [
  {
    key: 'dashboard',
    icon: <Dashboard />,
    route: ROUTES.DASHBOARD,
  },
  {
    key: 'asrRequest',
    icon: <PermPhoneMsg />,
    subMenu: [
      {
        key: 'statistics',
        route: ROUTES.ASR_REQUEST_BY_BOT,
      },
      {
        key: 'validation',
        route: ROUTES.ASR_REQUEST_BY_SESSION,
      },
    ],
  },
  // {
  //   key: 'sttManagement',
  //   icon: <Description />,
  //   subMenu: [
  //     {
  //       key: 'voiceManagement',
  //       route: ROUTES.VOICE_MANAGEMENT,
  //     },
  //     {
  //       key: 'errorReportTTS',
  //       route: ROUTES.ERROR_REPORT,
  //     },
  //     {
  //       key: 'dictionaryManagement',
  //       route: ROUTES.DICTIONARY_MANAGEMENT,
  //     },
  //     {
  //       key: 'blacklistManagement',
  //       route: ROUTES.BLACKLIST_MANAGEMENT,
  //     },
  //     {
  //       key: 'appManagement',
  //       route: ROUTES.APP_MANAGEMENT,
  //     },
  //   ],
  // },
  // {
  //   key: 'orders',
  //   icon: <ShoppingCart />,
  //   subMenu: [
  //     {
  //       key: 'orderManagement',
  //       route: ROUTES.ORDER_MANAGEMENT,
  //     },
  //     {
  //       key: 'paymentManagement',
  //       route: ROUTES.PAYMENT_MANAGEMENT,
  //     },
  //     {
  //       key: 'packageManagement',
  //       route: ROUTES.PACKAGE_MANAGEMENT,
  //     },
  //     {
  //       key: 'voucherManagement',
  //       route: ROUTES.VOUCHER_MANAGEMENT,
  //     },
  //   ],
  // },
  // {
  //   key: 'tickets',
  //   icon: <More />,
  //   subMenu: [
  //     {
  //       key: 'ticketList',
  //       route: ROUTES.TICKETS,
  //     },
  //     {
  //       key: 'performance',
  //       route: ROUTES.PERFORMANCE,
  //     },
  //   ],
  // },
  // {
  //   key: 'Affiliate',
  //   icon: <LocalAtm />,
  //   route: ROUTES.AFFILIATE,
  // },
  // {
  //   key: 'notificationAndEmail',
  //   icon: <Email />,
  //   subMenu: [
  //     {
  //       key: 'notificationManagement',
  //       route: ROUTES.NOTIFICATION_MANAGEMENT,
  //     },
  //     {
  //       key: 'emailManagement',
  //       route: ROUTES.EMAIL_MANAGEMENT,
  //     },
  //   ],
  // },
  {
    key: 'system',
    icon: <DeveloperBoard />,
    subMenu: [
      {
        key: 'adminManagement',
        route: ROUTES.ADMIN_MANAGEMENT,
      },
      {
        key: 'adminAuthorization',
        route: ROUTES.ADMIN_AUTHORIZATION,
      },
      {
        key: 'bannerManagement',
        route: ROUTES.BANNER_MANAGEMENT,
      },
    ],
  },
  {
    key: 'FAQ',
    icon: <Help />,
    route: ROUTES.FAQ,
  },
];
