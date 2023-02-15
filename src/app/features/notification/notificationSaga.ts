import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import notificationApi from '../../../services/api/notificationApi';
import { notificationActions } from './notificationSlice';

function* getNotificationsSaga(action: PayloadAction<{ page: number }>): any {
  try {
    const notifications = yield call(notificationApi.getNotifications, action.payload.page);
    if (notifications) {
      const data = notifications.data;
      yield put(notificationActions.getNotificationsSuccess({ data }));
    } else {
      yield put(notificationActions.getNotificationsFailed());
    }
  } catch (error) {
    yield put(notificationActions.getNotificationsFailed());
  }
}

export default function* notificationSaga() {
  yield takeLatest(notificationActions.getNotificationsStart.type, getNotificationsSaga);
}
