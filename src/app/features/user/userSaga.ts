import { UserInformation } from './../../../models/user';
import { call, put, takeLatest } from 'redux-saga/effects';
import userApi from '../../../services/api/userApi';
import { userActions } from './userSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { UploadInformation } from '../../../models';
import { socketService } from '../../../services/socket/socketService';


function* getCurrentUserSaga(): any {
  try {
    const userInformation: UserInformation = yield call(userApi.getCurrentUser);
    if (userInformation) {
      socketService.connectWithSocketServer(userInformation.id);
      yield put(userActions.getUserSuccess({ data: userInformation }));
    } else {
      yield put(userActions.getUserFailed());
    }
  } catch (error) {
    yield put(userActions.getUserFailed());
  }
}

function* changeAvatar(action: PayloadAction<{avatar: UploadInformation}>): any {
  try {
    yield call(userApi.updateUser, { avatar: action.payload.avatar.id });
    yield put(userActions.changeAvatar({ avatar: action.payload.avatar }));
  } catch (error) {
    yield put(userActions.changeAvatar({ avatar: {} as UploadInformation }));
  }
}

export default function* userSaga() {
  yield takeLatest(userActions.getUserStart.type, getCurrentUserSaga);
  yield takeLatest(userActions.changeAvatar.type, changeAvatar);
}
