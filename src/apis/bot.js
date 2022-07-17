import { RESOURCE } from '@src/constants';
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
