import { all } from 'redux-saga/effects';
import authSaga from './auth';
import meetSaga from './meeting';

export default function* rootSaga() {
  yield all([authSaga(), meetSaga()]);
}
