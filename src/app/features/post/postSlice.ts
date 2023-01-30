import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostInformation } from '../../../models';

interface PostState {
  loading: boolean;
  data: PostInformation[];
  success: boolean;
  error: boolean;
}

const initialState: PostState = {
  loading: false,
  data: [],
  success: false,
  error: false,
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    getPostStart(state, action: PayloadAction<{ page: number }>) {
      state.loading = true;
    },

    getPostPersonalStart(state, action: PayloadAction<{ page: number, userId: string }>) {
      state.loading = true;
    },

    getResetPost(state) {
      state.data = [];
    },

    getPostSuccess(state, action: PayloadAction<{ data: PostInformation[] }>) {
      state.loading = false;
      state.data = [...state.data, ...action.payload.data];
      state.success = true;
      state.error = false;
    },

    getPostFailed(state) {
      state.loading = false;
      state.success = false;
      state.error = true;
    },

    addPost(state, action: PayloadAction<{ post: PostInformation }>) {
      state.data = [action.payload.post, ...state.data];
    },

    deletePost(state, action: PayloadAction<{ postId: string }>) {
      state.data = state.data.filter(
        (post) => post.id !== action.payload.postId
      );
    },

    deleteUploadPost(
      state,
      action: PayloadAction<{ postId: string; public_id: string }>
    ) {
      state.data = state.data.reduce((filtered, option) => {
        if (option.id === action.payload.postId) {
          option.upload = option.upload.filter(
            (upload) => upload.public_id !== action.payload.public_id
          );
        }
        return filtered;
      }, state.data);
    },

    updatePostBasicInfo(
      state,
      action: PayloadAction<{
        postId: string;
        content: string;
        postMode: string;
      }>
    ) {
      state.data = state.data.reduce((filtered, option) => {
        if (option.id === action.payload.postId) {
          option.content = action.payload.content;
          option.postMode = action.payload.postMode;
        }
        return filtered;
      }, state.data);
    },

    updatePostUpload(
      state,
      action: PayloadAction<{ postId: string; upload: any }>
    ) {
      state.data = state.data.reduce((filtered, option) => {
        if (option.id === action.payload.postId) {
          option.upload = [...option.upload, ...action.payload.upload];
        }
        return filtered;
      }, state.data);
    },
  },
});

export const postActions = postSlice.actions;
export const postReducer = postSlice.reducer;
