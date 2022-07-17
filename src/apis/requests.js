import { RESOURCE } from '@src/constants';
import API from './api';
import api from '@src/apis/api';
import { getCookie } from '@src/utils/cookie';
import axios from 'axios';
import { API_URL } from '@src/configs';

const getCallSessionsByApp = async ({appId, startDate, endDate, limit, offset}) => {
  const response = await API({
    method: 'GET',
    url: `/app/${appId}/sessions`,
    params: { startDate, endDate, limit, offset},
  });
  return response;
};

export {
  getCallSessionsByApp
};
