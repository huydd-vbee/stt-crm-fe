export default {
  UNAUTHORIZED: '/403',
  DASHBOARD: '/dashboard',
  AFFILIATE: '/affiliate',
  NOTIFICATION_MANAGEMENT: '/notification',
  EMAIL_MANAGEMENT: '/email',
  FAQ: '/faq',

  // CUSTOMERS
  CUSTOMER: '/customers',
  CUSTOMER_DETAIL: '/customers/:customerId',

  // ASR REQUEST
  ASR_REQUEST_BY_BOT: '/asr/bot',
  ASR_REQUEST_BY_BOT_DETAIL: '/asr/bot/:appId',
  ASR_REQUEST_BY_SESSION: '/asr/session',

  // VALIDATION
  VALIDATION_LIVE: '/validation/live',
  VALIDATION_MESSAGE: '/validation/:messageId',
  VALIDATION_SESSION: '/validation/:sessionId',


  // STT
  VOICE_MANAGEMENT: '/voice',
  DICTIONARY_MANAGEMENT: '/dictionary',
  BLACKLIST_MANAGEMENT: '/blacklist',

  // ORDERS
  ORDER_MANAGEMENT: '/orders',
  PAYMENT_MANAGEMENT: '/payments',
  PACKAGE_MANAGEMENT: '/packages',
  PROMOTION_MANAGEMENT: '/promotions',
  ORDER_DETAIL: '/orders/:orderId',

  // TICKET
  TICKETS: '/tickets',
  PERFORMANCE: '/performance',

  // SYSTEM
  ADMIN_MANAGEMENT: '/admin-management',
  ADMIN_AUTHORIZATION: '/admin-authorization',
};
