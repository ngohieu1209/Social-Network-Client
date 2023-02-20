import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import friendApi from '../../../services/api/friendApi';
import { friendActions } from './friendSlice';

function* getRequestFriendSaga(
  action: PayloadAction<{ page: number }>
): any {
  try {
    const requestFriends = yield call(friendApi.listRequestFriends, action.payload.page)
    if(requestFriends) {
      yield put(friendActions.getRequestFriendSuccess({ data: requestFriends.data }));
    } else {
      yield put(friendActions.getFriendFailed());
    }
} catch (error) {
      yield put(friendActions.getFriendFailed());
    
  }
}

function* getFriendsSaga(
  action: PayloadAction<{ page: number }>
): any {
  try {
    const friends = yield call(friendApi.listFriends, action.payload.page);
    if(friends) {
      yield put(friendActions.getFriendsSuccess({ data: friends.data }));
    } else {
      yield put(friendActions.getFriendFailed());
    }
} catch (error) {
      yield put(friendActions.getFriendFailed());
    
  }
}

export default function* friendSaga() {
  yield takeLatest(friendActions.getRequestFriendStart.type, getRequestFriendSaga);
  yield takeLatest(friendActions.getFriendsStart.type, getFriendsSaga);
  
}
