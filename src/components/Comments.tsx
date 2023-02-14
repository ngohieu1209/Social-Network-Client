import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Input } from 'antd';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { AppState } from '../app/store';
import { AiOutlineUser } from 'react-icons/ai';
import commentApi from '../services/api/commentApi';
import { socketService } from '../services/socket/socketService';
import { postActions } from '../app/features/post/postSlice';
import { PostInformation } from '../models';
import CommentItem from './CommentItem';

const { TextArea } = Input;

type Props = {
  postId: string;
  count: number;
  comments: PostInformation['comment'];
};

const Comments: React.FC<Props> = ({ postId, comments, count }) => {
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
    setLoading(true);
    try {
      const data = await commentApi.getComments(postId, page);
      dispatch(postActions.addComments({ postId, comments: data.data }));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

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
  };

  const handleCollapseComment = () => {
    setShowMore(false);
    setNum(-2);
  };

  const handlePreviousComment = () => {
    setNewComment(true);
  };

  const handleKeyPressed = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      socketService.sendComment({
        postId,
        content: value,
        userId: currentUser.id,
      });
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
            <CommentItem key={comment.id} comment={comment} />
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

export default Comments;
