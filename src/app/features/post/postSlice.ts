import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostInformation } from '../../../models';
import { IComment } from '../../../models/comment';

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

    getPostPersonalStart(
      state,
      action: PayloadAction<{ page: number; userId: string }>
    ) {
      state.loading = true;
    },

    getPostReset(state) {
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

    addNewComment(state, action: PayloadAction<{ postId: string; comment: IComment }>) {
      state.data = state.data.reduce((filtered, option) => {
        if (option.id === action.payload.postId) {
          const isCommentExist = option.comment.some(comment => comment.id === action.payload.comment.id);
          if (!isCommentExist) {
            option.comment = [action.payload.comment, ...option.comment];
            option.commentsCount++;
          }
        }
        return filtered;
      }, state.data);
    },

    editComment(state, action: PayloadAction<{ id: string, content: string, postId: string }>) {
      state.data = state.data.reduce((filtered, option) => {
        if(option.id === action.payload.postId) {
          option.comment = option.comment.map(comment => {
            if(comment.id === action.payload.id) {
              comment.content = action.payload.content;
            }
            return comment;
          });
        }
        return filtered;
      }, state.data);
    },

    deleteComment(state, action: PayloadAction<{ id: string, postId: string }>) {
      state.data = state.data.reduce((filtered, option) => {
        if (option.id === action.payload.postId) {
          option.comment = option.comment.filter(comment => comment.id !== action.payload.id);
          option.commentsCount--;
        }
        return filtered;
      }, state.data);
    },

    addCommentsStart(state, action: PayloadAction<{ postId: string;  page: number}>) {
      return state;
    },

    addComments(state, action: PayloadAction<{ postId: string; comments: IComment[] }>) {
      state.data = state.data.reduce((filtered, option) => {
        if (option.id === action.payload.postId) {
          if(option.hasOwnProperty('comment'))
            option.comment = [...option.comment, ...action.payload.comments];
          else 
            option.comment = [...action.payload.comments];
        }
        return filtered;
      }, state.data);
    }
  },
});

export const postActions = postSlice.actions;
export const postReducer = postSlice.reducer;
