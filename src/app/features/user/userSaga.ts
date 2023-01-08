import { UserInformation } from './../../../models/user';
import { call, put, takeLatest } from 'redux-saga/effects';
import userApi from '../../../api/userApi';
import { userActions } from './userSlice';

function* getCurrentUserSaga(): any {
  try {
    const userInformation: UserInformation = yield call(userApi.getCurrentUser);
    if (userInformation) {
      const data = {
        id: userInformation.id,
        email: userInformation.email,
        firstName: userInformation.firstName,
        lastName: userInformation.lastName,
        avatar: userInformation.avatar,
        followers: userInformation.followers,
        following: userInformation.following,
      };
      yield put(userActions.getUserSuccess({ data }));
    } else {
      yield put(userActions.getUserFailed());
    }
  } catch (error) {
    yield put(userActions.getUserFailed());
  }
}

export default function* userSaga() {
  yield takeLatest(userActions.getUserStart.type, getCurrentUserSaga);
}
