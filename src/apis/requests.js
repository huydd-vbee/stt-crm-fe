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

const getCallRequestsBySessionAndApp = async ({appId, sessionId, limit, offset}) => {
  const response = await API({
    method: 'GET',
    url: `/app/${appId}/session/${sessionId}/requests`,
    params: { limit, offset },
  });
  return response;
};

const getCallRequestDetails = async ({appId, sessionId, requestId}) => {
  const response = await API({
    method: 'GET',
    url: `/app/${appId}/session/${sessionId}/request/${requestId}`,
  });
  return response;
};

const getCallRequestAudio = async ({appId, sessionId, requestId}) => {
  const response = await API({
    method: 'GET',
    url: `/app/${appId}/session/${sessionId}/request/${requestId}/audio`,
  });
  return response;
};

export {
  getCallSessions,
  getCallSessionsByApp,
  getCallSessionDetail,
  getCallRequestsBySessionAndApp,
  getCallRequestAudio,
  getCallRequestDetails
};
