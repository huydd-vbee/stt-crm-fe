import axios from 'axios';

import { RESOURCE } from '@src/constants';
import { getCookie } from '@src/utils/cookie';
import { API_URL } from '@src/configs';
import api from './api';

const getBotConfigDetails = async (appId) => {
  try {
    const response = await api({
      method: 'GET',
      url: `${RESOURCE.BOT}/${appId}`,
    });
    return response;
  } catch (error) {
    return error.response?.data;
  }
};


export {
  getBotConfigDetails,
};
