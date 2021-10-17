import { call, put, takeLatest } from 'redux-saga/effects';
import { addMeeting, loadedMeeting } from '../actions/meeting';
import { LOAD_MEETING, POST_MEETING } from '../constants/meeting';
import ApiService from '../services/apiService';

export function* postMeetingSaga(actions) {
  try {
    const response = yield call(ApiService.post('/meets', actions.values));
    yield put(addMeeting(response.data));
    actions.success(response.data);
  } catch (e) {
    actions.error(e);
    return e;
  }
}

export function* loadMeetingSaga(actions) {
  try {
    const response = yield call(ApiService.get('/meets'));
    yield put(loadedMeeting(response.data));
    actions.success(response.data);
  } catch (e) {
    actions.error(e);
    return e;
  }
}

export default function* meetSaga() {
  yield takeLatest(POST_MEETING, postMeetingSaga);
  yield takeLatest(LOAD_MEETING, loadMeetingSaga);
}
