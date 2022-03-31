import { RESOURCE } from '@src/constants';
import API from './api';

const getOverviewRequestStats = async (startDate, endDate) => {
  const response = await API({
    method: 'GET',
    url: `${RESOURCE.STATISTICS}/requests/overview`,
    params: { startDate, endDate },
  });
  return response;
};

const getAppRequestStats = async ({limit, offset, startDate, endDate}) => {
  try {
    const response = await API({
      method: 'GET',
      url: `${RESOURCE.STATISTICS}/requests/app_id`,
      params: {limit, offset, startDate, endDate },
    });
    return response;
  } catch (error) {
    return error.response?.data;
  }
};

export { getOverviewRequestStats, getAppRequestStats };
