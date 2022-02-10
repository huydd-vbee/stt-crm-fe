import { all, put, takeEvery } from 'redux-saga/effects';
import api from '@src/apis/api';
import { ERROR_CODE } from '@src/errors/code';
import actions from '../actions';

function* verifyTokenSaga({ accessToken }) {
  try {
    // const { status } = yield apis.account.verifyToken(accessToken);
    // if (!status) throw new Error();

    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    // const { status: getMeStatus, result: user } = yield apis.account.getMe();
    // if (!getMeStatus) throw new Error();

    yield put(actions.auth.verifyTokenSuccess(accessToken, {}));
  } catch (error) {
    yield put(
      actions.noti.push({
        severity: 'error',
        message: error.response?.data?.message,
        code: error.response?.data?.code || ERROR_CODE.INTERNAL_SERVER_ERROR,
      }),
    );
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.auth.actionTypes.VERIFY_TOKEN, verifyTokenSaga),
  ]);
}
