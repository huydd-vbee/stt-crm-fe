import { RESOURCE } from '@src/constants';
import api from './api';

const getUsers = async ({
  search,
  searchFields,
  offset,
  limit,
  fields,
  sort,
}) => {
  try {
    const response = await api({
      method: 'GET',
      url: RESOURCE.USERS,
      params: { search, searchFields, offset, limit, fields, sort },
    });
    return response;
  } catch (error) {
    return error.response?.data;
  }
};

export { getUsers };
