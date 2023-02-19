import { postActions } from '../../../app/features/post/postSlice';
import { store } from '../../../app/store';
import { onDataToServer } from '../../../models/events';
import { openNotification } from '../../../utils';

const commentHandler = {
  // on: newComment
  updateComment: (data: onDataToServer<any>) => {
    if (data.ACTION === 'newComment') {
      store.dispatch(
        postActions.addNewComment({
          postId: data.PAYLOAD.postId,
          comment: {
            ...data.PAYLOAD,
            userId: {
              ...data.PAYLOAD.userId,
              avatar: { url: data.PAYLOAD.userId.avatar } || null,
            },
          },
        })
      );
    }
  },

  // on: editComment
  editComment: (data: onDataToServer<any>) => {
    if (data.ACTION === 'editComment') {
      store.dispatch(
        postActions.editComment({
          postId: data.PAYLOAD.postId,
          id: data.PAYLOAD.id,
          content: data.PAYLOAD.content,
        })
      );
    }
  },

  // on: deleteComment
  deleteComment: (data: onDataToServer<any>) => {
    if (data.ACTION === 'deleteComment') {
      store.dispatch(
        postActions.deleteComment({
          postId: data.PAYLOAD.postId,
          id: data.PAYLOAD.id,
        })
      );
    }
  },

  // on: Post Not Found
  postNotFound: (data: onDataToServer<any>) => {
    if (data.ACTION === 'postNotFound') {
      openNotification('error', 'Post', data.PAYLOAD)
    }
  },
};

export default commentHandler;
