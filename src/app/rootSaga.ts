import { all } from 'redux-saga/effects';
import authSaga from './features/auth/authSaga';
import postSaga from './features/post/postSaga';
import userSaga from './features/user/userSaga';

export default function* rootSaga() {
  yield all([authSaga(), userSaga(), postSaga()]);
}
