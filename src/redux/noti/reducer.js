import { actionTypes } from './actions';

export const initialState = {
  code: null,
  message: null,
  severity: null, // error | success | warning | info
};

export default function notiReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.PUSH_NOTI: {
      const { code, message, severity } = action;
      return { ...state, code, message, severity };
    }

    case actionTypes.RESET_NOTI:
      return initialState;

    default:
      return state;
  }
}
