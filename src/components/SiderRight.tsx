import { Avatar, Button, Layout } from 'antd';
import { FaHandshake, FaBirthdayCake } from 'react-icons/fa';
import { AiOutlineCheck, AiOutlineClose, AiOutlineUser } from 'react-icons/ai';
import friendApi from '../services/api/friendApi';
import { useEffect, useState } from 'react';
import { Friend } from '../models';
import ModalFriendRequest from './ModalFriendRequest';
import { useAppDispatch } from '../app/hooks';
import { friendActions } from '../app/features/friend/friendSlice';

const { Sider } = Layout;

const SiderRight = () => {
  const [isModalFriendRequestOpen, setIsModalFriendRequestOpen] =
    useState(false);
  const showModal = () => {
    setIsModalFriendRequestOpen(true);
  };

  const modalFriendRequestHandleOk = () => {
    setIsModalFriendRequestOpen(false);
  };

  const modalFriendRequestHandleCancel = () => {
    setIsModalFriendRequestOpen(false);
  };

  const [requestFriends, setRequestFriends] = useState<Friend[]>([]);

  const dispatch = useAppDispatch();

  const fetchRequestFriend = async () => {
    const data = await friendApi.listRequestFriends(1);
    const secondElement = data.data.slice(0, 2);
    setRequestFriends(secondElement);
  };

  const handleAccept = async (userId: string) => {
    try {
      const data = await friendApi.acceptFriend(userId);
      console.log(data);
      const newFriend = requestFriends.find(
        (item) => item.user_send_request.id === userId 
      );
      if (newFriend) {
        dispatch(friendActions.acceptFriend({friend: newFriend}))
        setRequestFriends((prev) =>
          prev.filter((item) => item.user_send_request.id !== userId)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (userId: string) => {
    try {
      const data = await friendApi.deleteFriend(userId);
      console.log(data);
      setRequestFriends((prev) =>
        prev.filter((item) => item.user_send_request.id !== userId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequestFriend();
  }, []);

  return (
    <Sider
      className='bg-white-F1cc basis-2/6 max-w-lg'
      style={{
        overflow: 'auto',
        height: '100vh',
        top: 0,
        right: 0,
      }}
    >
      <div className='w-1/5 fixed right-20'>
        {/* Friend request */}
        {requestFriends.length > 0 && (
          <div className='bg-white-default mt-9 mb-6 rounded-xl shadow-md shadow-white-gainsboro'>
            <div className='flex items-center justify-center pt-4'>
              <FaHandshake className='mr-2 text-green-600' size={23} />
              <span className='font-semibold'>FRIEND REQUEST</span>
            </div>

            <hr className='mx-5 my-3 h-px bg-gray-200 dark:bg-gray-700' />

            {requestFriends.map((friend) => {
              const { user_send_request } = friend;
              return (
                <div
                  className='flex items-center justify-between mx-5 pt-4'
                  key={friend.id}
                >
                  <div className='flex'>
                    <Avatar
                      size={48}
                      icon={<AiOutlineUser size={46} />}
                      src={user_send_request.avatar?.url}
                    />
                    <div className='flex flex-col ml-2'>
                      <span className='font-semibold'>{`${user_send_request.firstName} ${user_send_request.lastName}`}</span>
                      <span className='text-gray-500 text-sm'>
                        {user_send_request.location}
                      </span>
                    </div>
                  </div>
                  <div className='flex items-center'>
                    <AiOutlineCheck
                      size={20}
                      className='mr-2 text-green-neon hover:scale-125 cursor-pointer'
                      onClick={() => handleAccept(user_send_request.id || '')}
                    />
                    <AiOutlineClose
                      size={20}
                      className='text-red-neon hover:scale-125 cursor-pointer'
                      onClick={() => handleDelete(user_send_request.id || '')}
                    />
                  </div>
                </div>
              );
            })}

            <div className='mt-4 pb-4 text-center'>
              <ModalFriendRequest
                open={isModalFriendRequestOpen}
                onOk={modalFriendRequestHandleOk}
                onCancel={modalFriendRequestHandleCancel}
              />
              {requestFriends.length > 2 && (
                <>
                  <Button
                    className='w-5/6 font-semibold text-gray-500 hover:text-grey-darkLight hover:border-grey-darkLight hover:shadow-lg'
                    onClick={showModal}
                  >
                    View All
                  </Button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Happy birthday */}

        <div className='bg-white-default mt-6 mb-6 rounded-xl shadow-md shadow-white-gainsboro'>
          <div className='flex items-center justify-center pt-4'>
            <FaBirthdayCake className='mr-2 text-yellow-600' size={23} />
            <span className='font-semibold'>BIRTHDAY</span>
          </div>

          <hr className='mx-5 my-3 h-px bg-gray-200 dark:bg-gray-700' />

          <div className='flex ml-5 pt-4'>
            <Avatar
              size={48}
              src='https://i.pinimg.com/550x/3c/61/48/3c6148580a9d33efb242b5c369d0a5be.jpg'
            />
            <div className='flex flex-col ml-2'>
              <span className='font-semibold'>Ngo Trung Hieu</span>
              <span className='text-gray-500 text-sm'>Ha Noi</span>
            </div>
          </div>

          <div className='flex ml-5 pt-4'>
            <Avatar
              size={48}
              src='https://i.pinimg.com/550x/3c/61/48/3c6148580a9d33efb242b5c369d0a5be.jpg'
            />
            <div className='flex flex-col ml-2'>
              <span className='font-semibold'>Ngo Trung Hieu</span>
              <span className='text-gray-500 text-sm'>Ha Noi</span>
            </div>
          </div>

          <div className='mt-4 pb-4 text-center'>
            <Button className='w-5/6 font-semibold text-gray-500 hover:text-grey-darkLight hover:border-grey-darkLight hover:shadow-lg'>
              View All
            </Button>
          </div>
        </div>
      </div>
    </Sider>
  );
};

export default SiderRight;
