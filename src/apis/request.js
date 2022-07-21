import API from './api';

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
  getCallRequestsBySessionAndApp,
  getCallRequestAudio,
  getCallRequestDetails
};
