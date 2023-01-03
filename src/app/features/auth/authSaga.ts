import { PayloadAction } from '@reduxjs/toolkit';
import { put, takeLatest } from 'redux-saga/effects';
import { authActions } from './authSlice';

function* loginSaga(action: PayloadAction<string>): any {
  try {
    yield put(authActions.loginSuccess());
    localStorage.setItem('firstLogin', "true");
  } catch (error) {
    yield put(authActions.loginFailed());
  }
}

export default function* authSaga() {
  yield takeLatest(authActions.loginStart.type, loginSaga);
}
