import { Avatar, Button, Layout, Empty } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import friendApi from '../services/api/friendApi';
import { friendActions } from '../app/features/friend/friendSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { AppState } from '../app/store';
import { UserInformation } from '../models';

const { Content } = Layout;
let timer: NodeJS.Timeout | null = null;

const ListFriends = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const currentUserId = useAppSelector(
    (state: AppState) => state.user.data.id
  );
  const listFriends = useAppSelector(
    (state: AppState) => state.friend.data.listFriends
  );
  const mounted = useRef(false);

  const [newFriend, setNewFriend] = useState(false);

  const debounce = (cb: Function, delay: number) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      cb();
    }, delay);
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      dispatch(friendActions.getFriendsStart({ page }));
      setNewFriend(false);
      debounce(() => setLoading(false), 2000);
    } catch (error) {
      console.log(error);
      setNewFriend(false);
      debounce(() => setLoading(false), 2000);
    }
  };

  useEffect(() => {
    fetchPosts();
    return () => {
      dispatch(friendActions.getFriendReset());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    if (!mounted.current) {
      dispatch(friendActions.getFriendReset());
      mounted.current = true;
      return;
    }
    if (!newFriend) return;
    if (loading) return;
    setPage((oldPage) => oldPage + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newFriend]);

  const event = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      setNewFriend(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', event);
    return () => window.removeEventListener('scroll', event);
  }, []);

  const handleUnFollow = async(userId: string | undefined, friendId: string) => {
      try {
        if (userId) {
          await friendApi.deleteFriend(userId);
          dispatch(friendActions.deleteFriend({friendId}));
        }
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <Content className='bg-white-F1cc mt-9'>
      {listFriends.length > 0 ? (
        <div className=' bg-white-default mb-5 rounded-xl shadow-md shadow-white-gainsboro relative'>
          {listFriends.map((friend) => {
            let user = {} as Partial<UserInformation>;
            const { user_send_request, user_receive_request } = friend;
            if (user_send_request.id === currentUserId) {
              user = user_receive_request;
            } else {
              user = user_send_request;
            }

            return (
              <div
                className='flex items-center justify-between mx-5 py-4'
                key={friend.id}
              >
                <div
                  className='flex items-center cursor-pointer'
                  onClick={() => {
                    navigate(`/${user.id}`);
                  }}
                >
                  <Avatar
                    size={64}
                    icon={<AiOutlineUser size={62} />}
                    src={user.avatar?.url}
                  />
                  <div className='flex flex-col ml-2'>
                    <span className='font-semibold text-xl'>{`${user.firstName} ${user.lastName}`}</span>
                    <span className='text-gray-500 text-base'>
                      {user.location}
                    </span>
                  </div>
                </div>
                <div className='flex items-center'>
                  <Button
                    className='font-semibold text-gray-500 hover:text-grey-darkLight hover:border-grey-darkLight hover:shadow-lg'
                    onClick={() => handleUnFollow(user.id, friend.id)}
                  >
                    UnFollow
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </Content>
  );
};

export default ListFriends;
