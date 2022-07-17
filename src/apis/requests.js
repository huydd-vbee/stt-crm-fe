import API from './api';

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
