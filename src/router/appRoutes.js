import Unauthorized from '@src/pages/Unauthorized';
import ComingSoon from '@src/pages/ComingSoon';

import ROUTES from '@src/constants/routes';
import Dashboard from '@src/pages/Dashboard';
import AsrRequests from '@src/pages/AsrRequests';
import CallBotDetail from '@src/pages/CallBotDetail';
import CallSessionDetail from '@src/pages/CallSessionDetail';
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
    component: Dashboard,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: ROUTES.ASR_HISTORY,
    component: AsrRequests,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: ROUTES.ASR_HISTORY_BY_APP,
    component: ComingSoon,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: ROUTES.ASR_HISTORY_BY_APP_DETAIL,
    component: CallBotDetail,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: ROUTES.ASR_HISTORY_BY_SESSION,
    component: ComingSoon,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: ROUTES.ASR_HISTORY_BY_SESSION_DETAIL,
    component: CallSessionDetail,
    exact: true,
    restricted: false,
    isPrivate: true,
  },
  {
    path: ROUTES.ASR_EXPERIMENT,
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
