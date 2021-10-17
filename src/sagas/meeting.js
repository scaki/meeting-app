import { call, put, takeLatest } from 'redux-saga/effects';
import { addMeeting, loadedMeetings } from '../actions/meeting';
import {
  EDIT_MEETING,
  LOAD_MEETING,
  LOAD_MEETINGS,
  LOAD_MEETINGS_BY_DATE,
  POST_MEETING,
} from '../constants/meeting';
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

export function* loadMeetingsSaga(actions) {
  try {
    const response = yield call(ApiService.get('/meets'));
    yield put(loadedMeetings(response.data));
    actions.success(response.data);
  } catch (e) {
    actions.error(e);
    return e;
  }
}

export function* loadMeetingsByDateSaga(actions) {
  try {
    const response = yield call(ApiService.get(`/meets/date/${actions.date}`));
    actions.success(response.data);
  } catch (e) {
    actions.error(e);
    return e;
  }
}

export function* loadMeetingSaga(actions) {
  try {
    const response = yield call(ApiService.get(`/meets/${actions.id}`));
    actions.success(response.data);
  } catch (e) {
    actions.error(e);
    return e;
  }
}

export function* editMeetingSaga(actions) {
  try {
    const response = yield call(
      ApiService.put(`/meets/${actions.values.id}`, actions.values)
    );
    actions.success(response.data);
  } catch (e) {
    actions.error(e);
    return e;
  }
}

export default function* meetSaga() {
  yield takeLatest(POST_MEETING, postMeetingSaga);
  yield takeLatest(LOAD_MEETINGS, loadMeetingsSaga);
  yield takeLatest(LOAD_MEETINGS_BY_DATE, loadMeetingsByDateSaga);
  yield takeLatest(LOAD_MEETING, loadMeetingSaga);
  yield takeLatest(EDIT_MEETING, editMeetingSaga);
}
