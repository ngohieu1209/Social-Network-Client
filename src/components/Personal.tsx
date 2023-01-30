import { Empty, Layout, Skeleton } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { postActions } from '../app/features/post/postSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { AppState } from '../app/store';
import ListPost from './ListPost';

const { Content } = Layout;
let timer: NodeJS.Timeout | null = null;

type Props = {
  userId: string | undefined;
};


const Personal: React.FC<Props> = ({ userId }) => {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    const dispatch = useAppDispatch();
    const posts = useAppSelector((state: AppState) => state.post.data);
    const mounted = useRef(false);

    const [newPosts, setNewPosts] = useState(false);

    const debounce = (cb: Function, delay: number) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        cb();
      }, delay);
    };

    const fetchPosts = async () => {
      setLoading(true);
      try {
        if (userId) {
          dispatch(postActions.getPostPersonalStart({ page, userId }));
          setNewPosts(false);
          debounce(() => setLoading(false), 2000);
        } else {
          
        }

      } catch (error) {
        console.log(error);
        setNewPosts(false);
        debounce(() => setLoading(false), 2000);
      }
    };

    useEffect(() => {
      fetchPosts();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);
    
  useEffect(() => {
      dispatch(postActions.getResetPost())
      return () => {
        dispatch(postActions.getResetPost())
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId])

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
      if (
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 2
      ) {
        setNewPosts(true);
      }
    };

    useEffect(() => {
      window.addEventListener('scroll', event);
      return () => window.removeEventListener('scroll', event);
    }, []);
  
  return (
    <Content className='bg-white-F1cc mt-9'>
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

export default Personal;