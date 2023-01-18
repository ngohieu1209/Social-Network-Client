import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import postApi from '../../../api/postApi';
import { PostInformation } from '../../../models';
import { postActions } from './postSlice';

function* getPostsSaga(action: PayloadAction<{ page: number }>): any {
  try {
    const posts = yield call(postApi.getAllPost, action.payload.page);
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
}
