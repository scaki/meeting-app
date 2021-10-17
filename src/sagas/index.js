import { all } from 'redux-saga/effects';
import authSaga from './auth';
import meetSaga from './meeting';
import userSaga from './user';

export default function* rootSaga() {
  yield all([authSaga(), meetSaga(), userSaga()]);
}
