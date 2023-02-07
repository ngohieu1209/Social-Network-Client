import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import postApi from '../../../services/api/postApi';
import { PostInformation } from '../../../models';
import { postActions } from './postSlice';

function* getPostsSaga(action: PayloadAction<{ page: number, userId: string }>): any {
  try {
    let posts = null
    if (action.payload.userId) {
      posts = yield call(postApi.getPostsByUserId, action.payload.userId, action.payload.page);
    } else {
      posts = yield call(postApi.getAllPost, action.payload.page);
    }
    if (posts) {
      const data: PostInformation[] = posts.data;
      yield put(postActions.getPostSuccess({ data }));
    } else {
      yield put(postActions.getPostFailed());
    }
  } catch (error) {
    yield put(postActions.getPostFailed());
  }
}

export default function* postSaga() {
  yield takeLatest(postActions.getPostStart.type, getPostsSaga);
  yield takeLatest(postActions.getPostPersonalStart.type, getPostsSaga);
}
