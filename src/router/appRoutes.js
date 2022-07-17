import Unauthorized from '@src/pages/Unauthorized';
import ComingSoon from '@src/pages/ComingSoon';

import ROUTES from '@src/constants/routes';
import AsrRequests from '@src/pages/AsrRequests';
import DetailCustomer from '@src/pages/DetailCustomer';
import Order from '@src/pages/Order';
import DetailOrder from '@src/pages/DetailOrder';
import Package from '@src/pages/Package';

export default [
  {
    path: ROUTES.UNAUTHORIZED,
    component: Unauthorized,
    exact: true,
    restricted: true,
    isPrivate: false,
  },
  {
    path: ROUTES.DASHBOARD,
    component: ComingSoon,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: ROUTES.CUSTOMER,
    component: AsrRequests,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: ROUTES.CUSTOMER_DETAIL,
    component: DetailCustomer,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: ROUTES.ASR_REQUEST_BY_BOT,
    component: AsrRequests,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: ROUTES.ASR_REQUEST_BY_SESSION,
    component: ComingSoon,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: ROUTES.VALIDATION_LIVE,
    component: ComingSoon,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: ROUTES.VALIDATION_SESSION,
    component: ComingSoon,
    exact: true,
    restricted: false,
    isPrivate: true,
  },


  {
    path: ROUTES.VOICE_MANAGEMENT,
    component: ComingSoon,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: ROUTES.DICTIONARY_MANAGEMENT,
    component: ComingSoon,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: ROUTES.BLACKLIST_MANAGEMENT,
    component: ComingSoon,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: ROUTES.ORDER_MANAGEMENT,
    component: Order,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: ROUTES.PAYMENT_MANAGEMENT,
    component: ComingSoon,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: ROUTES.PACKAGE_MANAGEMENT,
    component: Package,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: ROUTES.ORDER_DETAIL,
    component: DetailOrder,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: ROUTES.TICKETS,
    component: ComingSoon,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: ROUTES.PERFORMANCE,
    component: ComingSoon,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: ROUTES.AFFILIATE,
    component: ComingSoon,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: ROUTES.NOTIFICATION_MANAGEMENT,
    component: ComingSoon,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: ROUTES.EMAIL_MANAGEMENT,
    component: ComingSoon,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: ROUTES.ADMIN_MANAGEMENT,
    component: ComingSoon,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: ROUTES.ADMIN_AUTHORIZATION,
    component: ComingSoon,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: ROUTES.FAQ,
    component: ComingSoon,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
];
