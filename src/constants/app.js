const APP_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
};

const API_TYPE = {
  PREPAID: 'prepaid',
  POSTPAID: 'postpaid',
};

const API_TYPES = [
  { value: undefined, label: 'all' },
  { value: API_TYPE.POSTPAID, label: 'postpaid' },
  { value: API_TYPE.PREPAID, label: 'prepaid' },
];

const APP_STATUSES = [
  { value: undefined, label: 'all' },
  { value: APP_STATUS.ACTIVE, label: 'active' },
  { value: APP_STATUS.INACTIVE, label: 'inactive' },
];

export { APP_STATUS, API_TYPE, API_TYPES, APP_STATUSES };
