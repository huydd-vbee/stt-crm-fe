import { actionTypes } from './actions';

export const initialState = {
  accessToken: null,
  verifying: false,
  user: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.VERIFY_TOKEN:
      return { ...state, verifying: true };

    case actionTypes.VERIFY_TOKEN_SUCCESS: {
      const { accessToken, user } = action;
      return {
        ...state,
        verifying: false,
        accessToken,
        user,
      };
    }

    default:
      return state;
  }
};

export default authReducer;
