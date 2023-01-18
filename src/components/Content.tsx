import { Layout, Skeleton } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { postActions } from '../app/features/post/postSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { AppState } from '../app/store';
import CreatePost from './CreatePost';
import ListPost from './ListPost';

const { Content } = Layout;
let timer: NodeJS.Timeout | null = null;

const ContentComponent = () => {
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
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])
  
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
      {posts.map((post) => (
        <ListPost key={post.id} post={post} />
      ))}
      {loading && (
        <div className='text-center'>
          <Skeleton active={true} avatar paragraph={{ rows: 4 }} />
        </div>
      )}
    </Content>
  );
};

export default ContentComponent;
