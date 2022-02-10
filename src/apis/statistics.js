import { RESOURCE } from '@src/constants';
import API from './api';

const numberUsers = async (by, startDate, endDate) => {
  const response = await API({
    method: 'GET',
    url: `${RESOURCE.STATISTICS}/users`,
    params: { by, startDate, endDate },
  });
  return response;
};

export { numberUsers };
