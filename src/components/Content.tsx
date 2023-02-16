import { Empty, Layout, Skeleton } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { postActions } from '../app/features/post/postSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { AppState } from '../app/store';
import { socketService } from '../services/socket/socketService';
import { openNotification } from '../utils';
import CreatePost from './CreatePost';
import ListPost from './ListPost';

const { Content } = Layout;
let timer: NodeJS.Timeout | null = null;

const ContentComponent = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  
  const dispatch = useAppDispatch();
  const userSuccess = useAppSelector((state: AppState) => state.user.success);
  const posts = useAppSelector((state: AppState) => state.post.data);
  const mounted = useRef(false);
  
  const [newPosts, setNewPosts] = useState(false);
  
  const debounce = (cb: Function, delay: number) => {
    if (timer) clearTimeout(timer); 
    timer = setTimeout(() => {
      cb();
    }, delay);
  }

  const fetchPosts = async () => {
    setLoading(true);
    try {
      dispatch(postActions.getPostStart({page}));
      setNewPosts(false);
      debounce(() => setLoading(false), 2000)
    } catch (error) {
      console.log(error);
      setNewPosts(false);
      debounce(() => setLoading(false), 2000)
    }
  }

  useEffect(() => {
    if (userSuccess) {
      fetchPosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  useEffect(() => {
    if (userSuccess) {
      socketService.updateComment((data: any) => {
        if (data.ACTION === 'newComment') {
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
        } else if (data.ACTION === 'POST_DELETED') {
          openNotification('error', 'Post deleted', data.PAYLOAD);
        }
      })
      socketService.editComment((data: any) => {
        if (data.ACTION === 'editComment') {
          dispatch(
            postActions.editComment({
              postId: data.PAYLOAD.postId,
              id: data.PAYLOAD.id,
              content: data.PAYLOAD.content,
            })
          )
        }
      })
      socketService.deleteComment((data: any) => {
        if(data.ACTION === 'deleteComment') {
          dispatch(
            postActions.deleteComment({
              postId: data.PAYLOAD.postId,
              id: data.PAYLOAD.id,
            })
          )
        }
      })
      return () => {
        dispatch(postActions.getPostReset())
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (!newPosts) return;
    if (loading) return;
    setPage((oldPage) => oldPage + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newPosts]);

  const event = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      setNewPosts(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', event);
    return () => window.removeEventListener('scroll', event);
  }, []);

  return (
    <Content className='bg-white-F1cc'>
      <CreatePost />
      {posts.length > 0 ? (
        posts.map((post) => <ListPost key={post.id} post={post} />)
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
      {loading && (
        <div className='text-center'>
          <Skeleton active={true} avatar paragraph={{ rows: 4 }} />
        </div>
      )}
    </Content>
  );
};

export default ContentComponent;
