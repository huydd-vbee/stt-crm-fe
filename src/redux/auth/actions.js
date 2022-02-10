export const actionTypes = {
  VERIFY_TOKEN: 'VERIFY_TOKEN',
  VERIFY_TOKEN_SUCCESS: 'VERIFY_TOKEN_SUCCESS',
  VERIFY_TOKEN_FAILURE: 'VERIFY_TOKEN_FAILURE',
};

const verifyToken = (accessToken) => ({
  type: actionTypes.VERIFY_TOKEN,
  accessToken,
});

const verifyTokenSuccess = (accessToken, user) => ({
  type: actionTypes.VERIFY_TOKEN_SUCCESS,
  accessToken,
  user,
});

export { verifyToken, verifyTokenSuccess };
