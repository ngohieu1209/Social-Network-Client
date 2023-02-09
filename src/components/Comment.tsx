import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Avatar, Card, Input } from 'antd';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { AppState } from '../app/store';
import { AiOutlineUser } from 'react-icons/ai';
import commentApi from '../services/api/commentApi';
import { socketService } from '../services/socket/socketService';
import { postActions } from '../app/features/post/postSlice';
import { PostInformation } from '../models';

const { TextArea } = Input;
const { Meta } = Card;

type Props = {
  postId: string;
  count: number;
  comments: PostInformation['comment'];
};

const Comment: React.FC<Props> = ({ postId, comments, count }) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const [page, setPage] = useState(1);
  const [num, setNum] = useState<number>(-2);
  const [showMore, setShowMore] = useState(false);
  const [newComment, setNewComment] = useState(false);
  const mounted = useRef(false);

  const currentUser = useAppSelector((state: AppState) => state.user.data);
  const postSuccess = useAppSelector((state: AppState) => state.post.success);

  const dispatch = useAppDispatch();

  const fetchComment = async () => {
    setLoading(true)
    try {
      const data = await commentApi.getComments(postId, page);
      dispatch(postActions.addComments({ postId, comments: data.data }))
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };

  const handleNewComment = useCallback((data: any) => {
    if (data.ACTION === 'newComment') {
      console.log(data);
      dispatch(
        postActions.addNewComment({
          postId: data.PAYLOAD.postId,
          comment: {
            ...data.PAYLOAD,
            userId: {
              ...data.PAYLOAD.userId,
              avatar: { url: data.PAYLOAD.userId.avatar },
            },
          },
        })
      );
    }
  }, [])

  useEffect(() => {
    socketService.updateComment(handleNewComment);
    return () => {
      socketService.updateComment(null);
    }
  }, [])

  useEffect(() => {
    if (postSuccess) {
      fetchComment();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (!newComment) return;
    if (loading) return;
    setPage((oldPage) => oldPage + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newComment]);

  const handleMoreComment = () => {
    setShowMore(true);
    setNum(0);
  }

  const handleCollapseComment = () => {
    setShowMore(false);
    setNum(-2);
  }

  const handlePreviousComment = () => {
    setNewComment(true);
  }

  const handleKeyPressed = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      socketService.sendComment({ postId, content: value, userId: currentUser.id });
      setValue('');
    }
  };

  return (
    <div className='pb-5'>
      <div className='grid grid-cols-8 auto-cols-max mb-5'>
        <Avatar
          size={30}
          className='mr-3 ml-auto'
          icon={<AiOutlineUser size={28} />}
          src={currentUser.avatar?.url}
        />
        <TextArea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder='Write a comment...'
          className='w-11/12 col-start-2 col-end-9'
          autoSize={{ minRows: 1, maxRows: 5 }}
          spellCheck={false}
          onKeyDown={handleKeyPressed}
        />
      </div>

      {showMore && comments && comments.length < count && (
        <h3
          className='font-semibold ml-8 mt-3 text-gray-500 cursor-pointer hover:underline'
          onClick={handlePreviousComment}
        >
          View previous comments
        </h3>
      )}
      {comments &&
        comments.length > 0 &&
        comments.slice(num).map((comment) => {
          return (
            <div className='max-h-screen overflow-auto' key={comment.id}>
              <div className='grid grid-cols-8 mt-2'>
                <Avatar
                  size={30}
                  className='mr-3 ml-auto'
                  icon={<AiOutlineUser size={28} />}
                  src={comment.userId.avatar?.url}
                />
                <div className='col-start-2 col-end-8'>
                  <Card
                    style={{ marginTop: 0 }}
                    size='small'
                    loading={false}
                    className='max-w-max bg-[#E0DFE2]'
                  >
                    <Meta
                      title={`${comment.userId.firstName} ${comment.userId.lastName}`}
                      description={comment.content}
                      className='max-w-max custom-meta-component'
                    />
                  </Card>
                  <span className='text-gray-400 text-sm flex items-center my-1'>
                    {moment(comment.createdAt).add(7, 'hours').fromNow()}
                    {comment.updatedAt !== comment.createdAt && (
                      <span className='text-xs italic ml-2 mt-1'>
                        Đã chỉnh sửa:{' '}
                        {moment(comment.updatedAt).add(7, 'hours').calendar()}
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      {comments && comments.length > 2 && !showMore && (
        <h3
          className='font-semibold ml-8 mt-3 text-gray-500 cursor-pointer hover:underline'
          onClick={handleMoreComment}
        >
          View more comments
        </h3>
      )}
      {showMore && (
        <h3
          className='font-semibold ml-8 mt-3 text-gray-500 cursor-pointer hover:underline'
          onClick={handleCollapseComment}
        >
          Collapse comments
        </h3>
      )}
    </div>
  );
};

export default Comment;
