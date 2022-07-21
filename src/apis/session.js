import API from './api';

const getCallSessions = async ({startDate, endDate, limit, offset}) => {
  const response = await API({
    method: 'GET',
    url: `/session`,
    params: { startDate, endDate, limit, offset},
  });
  return response;
};

const getCallSessionsByApp = async ({appId, startDate, endDate, limit, offset}) => {
  const response = await API({
    method: 'GET',
    url: `/app/${appId}/session`,
    params: { startDate, endDate, limit, offset},
  });
  return response;
};

const getCallSessionDetail = async ({appId, sessionId, limit, offset}) => {
  const response = await API({
    method: 'GET',
    url: `/app/${appId}/session/${sessionId}`,
    params: { limit, offset},
  });
  return response;
};


export {
  getCallSessions,
  getCallSessionsByApp,
  getCallSessionDetail,
};
