import { RESOURCE } from '@src/constants';
import API from './api';
import api from '@src/apis/api';
import { getCookie } from '@src/utils/cookie';
import axios from 'axios';
import { API_URL } from '@src/configs';

const getRequestStats = async ({startDate, endDate, appId}) => {
  const response = await API({
    method: 'GET',
    url: `${RESOURCE.STATISTICS}/requests`,
    params: { startDate, endDate, appId },
  });
  return response;
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

const getAppStatsGeneral = async ({limit, offset, startDate, endDate}) => {
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
  getRequestStats,
  getRequestStatsByAppId,
  getAppStatsGeneral,
  exportExcelFile
};
