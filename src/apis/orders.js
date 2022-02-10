import axios from 'axios';

import { RESOURCE } from '@src/constants';
import { getCookie } from '@src/utils/cookie';
import { API_URL } from '@src/configs';
import api from './api';

const getDetailOrder = async (orderId) => {
  try {
    const response = await api({
      method: 'GET',
      url: `${RESOURCE.ORDERS}/${orderId}`,
    });
    return response;
  } catch (error) {
    return error.response?.data;
  }
};

const getOrders = async ({ limit, offset, status, sort }) => {
  try {
    const response = await api({
      method: 'GET',
      url: RESOURCE.ORDERS,
      params: { limit, offset, status, sort },
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

export { getDetailOrder, getOrders, exportExcelFile };
