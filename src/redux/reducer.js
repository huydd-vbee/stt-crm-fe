import { combineReducers } from 'redux';
import auth, { initialState as authInitialState } from './auth/reducer';
import noti, { initialState as notiInitialState } from './noti/reducer';

export const initialState = {
  auth: authInitialState,
  noti: notiInitialState,
};

export default combineReducers({
  auth,
  noti,
});
