import { RESOURCE } from '@src/constants';
import { getCookie } from '@src/utils/cookie';
import axios from 'axios';
import { API_URL } from '@src/configs';
import API from './api';

const getRequestResponseTimeStats = async ({ startDate, endDate, general }) => {
  return {status: 0};
  // eslint-disable-next-line no-unreachable
  try {
    const response = await API({
      method: 'GET',
      url: `${RESOURCE.STATISTICS}/requests/response-time`,
      params: { startDate, endDate, general },
    });
    return response;
  } catch (error) {
    return error.response?.data;
  }
};

const getRequestStatusStats = async ({startDate, endDate, appId}) => {
  const response = await API({
    method: 'GET',
    url: `${RESOURCE.STATISTICS}/requests`,
    params: { startDate, endDate, appId },
  });
  return response;
};

const getRequestStatsByApp = async ({limit, offset, startDate, endDate}) => {
  try {
    const response = await API({
      method: 'GET',
      url: `${RESOURCE.STATISTICS}/apps`,
      params: { limit, offset, startDate, endDate },
    });
    return response;
  } catch (error) {
    return error.response?.data;
  }
};

const getRequestStatsByAppId = async ({startDate, endDate, appId}) => {
  try {
    const response = await API({
      method: 'GET',
      url: `${RESOURCE.STATISTICS}/requests/app/${appId}`,
      params: { startDate, endDate, appId },
    });
    return response;
  } catch (error) {
    return error.response?.data;
  }
};

const exportExcelFile = async ({ status }) => {
  try {
    const accessToken = getCookie('accessToken');
    const response = await axios({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'GET',
      url: `${API_URL}/api/v1/${RESOURCE.ORDERS}/export-excel`,
      params: { status },
      responseType: 'blob',
    });
    return response?.data;
  } catch (error) {
    return error.response?.data;
  }
};

export {
  getRequestStatusStats,
  getRequestResponseTimeStats,
  getRequestStatsByApp,
  getRequestStatsByAppId,
  exportExcelFile
};
