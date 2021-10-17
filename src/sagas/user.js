import { call, put, takeLatest } from 'redux-saga/effects';
import { loadedMe } from '../actions/user';
import { LOAD_ME } from '../constants/user';
import ApiService from '../services/apiService';

export function* loadMeSaga() {
  try {
    const response = yield call(ApiService.get('/user/me'));
    yield put(loadedMe(response.data));
  } catch (e) {
    return e;
  }
}

export default function* userSaga() {
  yield takeLatest(LOAD_ME, loadMeSaga);
}
