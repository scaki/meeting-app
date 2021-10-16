import { call, takeLatest } from 'redux-saga/effects';
import { SIGN_IN } from '../constants/auth';
import ApiService from '../services/apiService';

export function* signInSaga(actions) {
  try {
    const response = yield call(ApiService.post('/auth/login', actions.values));
    actions.success(response.data);
  } catch (e) {
    actions.error(e);
    return e;
  }
}

export default function* authSaga() {
  yield takeLatest(SIGN_IN, signInSaga);
}
