import { RESOURCE } from '@src/constants';
import { getCookie } from '@src/utils/cookie';
import axios from 'axios';
import { API_URL } from '@src/configs';
import API from './api';

const getRequestRateStats = async ({startDate, endDate, appId}) => {
  const response = await API({
    method: 'GET',
    url: `${RESOURCE.STATISTICS}/request/rate`,
    params: { startDate, endDate, appId },
  });
  return response;
};

const getRequestResponseTimeStats = async ({ startDate, endDate, appId }) => {
  try {
    const response = await API({
      method: 'GET',
      url: `${RESOURCE.STATISTICS}/request/response-time`,
      params: { startDate, endDate, appId },
    });
    return response;
  } catch (error) {
    return error.response?.data;
  }
};

const getRequestStatusStats = async ({startDate, endDate, appId}) => {
  const response = await API({
    method: 'GET',
    url: `${RESOURCE.STATISTICS}/request/status`,
    params: { startDate, endDate, appId },
  });
  return response;
};

const getRequestStatusRateStats = async ({startDate, endDate, appId}) => {
  const response = await API({
    method: 'GET',
    url: `${RESOURCE.STATISTICS}/request/status/rate`,
    params: { startDate, endDate, appId },
  });
  return response;
};

const getRequestStatsByAppId = async ({startDate, endDate, appId}) => {
  try {
    const response = await API({
      method: 'GET',
      url: `${RESOURCE.STATISTICS}/request/app/${appId}`,
      params: { startDate, endDate, appId },
    });
    return response;
  } catch (error) {
    return error.response?.data;
  }
};

const getRequestStatsByApp = async ({limit, offset, startDate, endDate}) => {
  try {
    const response = await API({
      method: 'GET',
      url: `${RESOURCE.STATISTICS}/app/general`,
      params: { limit, offset, startDate, endDate },
    });
    return response;
  } catch (error) {
    return error.response?.data;
  }
};

const getRequestStatsForTopListApps = async ({startDate, endDate}) => {
  try {
    const response = await API({
      method: 'GET',
      url: `${RESOURCE.STATISTICS}/app/top-list`,
      params: { startDate, endDate },
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
  getRequestStatusRateStats,
  getRequestResponseTimeStats,
  getRequestRateStats,
  getRequestStatsByApp,
  getRequestStatsForTopListApps,
  getRequestStatsByAppId,
  exportExcelFile
};
