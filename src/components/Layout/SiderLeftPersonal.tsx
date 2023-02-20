import { Avatar, Button, Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  AiOutlineHeart,
  AiOutlineEye,
  AiOutlineInstagram,
  AiOutlineUser,
  AiOutlineGithub,
} from 'react-icons/ai';
import { BsFacebook } from 'react-icons/bs';
import friendApi from '../../services/api/friendApi';
import { UserInformation } from '../../models';

const { Sider } = Layout;

type Props = {
  user: UserInformation | null;
};

const SiderLeftPersonal: React.FC<Props> = ({ user }) => {

  const [isRequest, setIsRequest] = useState<'friend' | 'followers' | 'following' | null>(null);

  const fetchRequest = async () => {
    try {
      if (!user) return;
      const checkStatus = await friendApi.checkFriend(user.id);
      setIsRequest(checkStatus);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const handleFollow = async () => {
    try {
      if (user) {
        if(isRequest === 'followers') {
          await friendApi.acceptFriend(user.id)
          setIsRequest('friend');
        } else {
          await friendApi.requestFriend(user.id);
          setIsRequest('following');
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleUnFollow = async () => {
    try {
      if (user) {
        await friendApi.deleteFriend(user.id);
        setIsRequest(null);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Sider
      className='bg-white-F1cc basis-2/6 max-w-lg'
      style={{
        overflow: 'auto',
        height: '100vh',
        top: 0,
        left: 0,
      }}
    >
      {user && (
        <div className='w-1/5 fixed left-20 bg-white-default mt-9 mb-6 rounded-xl shadow-md shadow-white-gainsboro'>
          <div className='flex ml-5 pt-4'>
            <Avatar
              size={48}
              icon={<AiOutlineUser size={46} />}
              src={user.avatar?.url}
            />
            <div className='flex flex-col ml-2'>
              <span className='font-semibold'>{`${user.firstName} ${user.lastName}`}</span>
              <span className='text-gray-500 text-sm'>{user.location}</span>
            </div>
          </div>

          <hr className='mx-5 my-3 h-px bg-gray-200 dark:bg-gray-700' />

          <div className='ml-5 mb-1 flex items-center'>
            <AiOutlineHeart className='text-pink-500' size={20} />
            <span className='mx-2'>{user.followers}</span>
            <span className='text-gray-500'>Follower</span>
          </div>
          <div className='ml-5 mb-2 flex items-center'>
            <AiOutlineEye className='text-blue-500' size={20} />
            <span className='mx-2'>{user.following}</span>
            <span className='text-gray-500'>Following</span>
          </div>
          <div className='mx-5 text-gray-600 text-left text-sm'>
            <span>{user.bio}</span>
          </div>
          {user.links && (
            <>
              <hr className='mx-5 my-3 h-px bg-gray-200 dark:bg-gray-700' />
              <div className='ml-5'>
                <span className='font-semibold text-gray-500'>MY PAGES</span>
                {user.links.linkFacebook && (
                  <button
                    className='flex mt-2'
                    onClick={() =>
                      window.open(user.links?.linkFacebook || '', '_blank')
                    }
                  >
                    <BsFacebook className='text-blue-500 text-2xl' />
                    <span className='ml-2'>
                      {getUsername(user.links.linkFacebook)}
                    </span>
                  </button>
                )}
                {user.links.linkInstagram && (
                  <button
                    className='flex mt-2'
                    onClick={() =>
                      window.open(user.links?.linkInstagram || '', '_blank')
                    }
                  >
                    <AiOutlineInstagram className='text-white-F1 text-2xl instagram' />
                    <span className='ml-2'>
                      {getUsername(user.links.linkInstagram)}
                    </span>
                  </button>
                )}
                {user.links.linkGithub && (
                  <button
                    className='flex mt-2'
                    onClick={() =>
                      window.open(user.links?.linkGithub || '', '_blank')
                    }
                  >
                    <AiOutlineGithub className='text-2xl' />
                    <span className='ml-2'>
                      {getUsername(user.links.linkGithub)}
                    </span>
                  </button>
                )}
              </div>
            </>
          )}
          <div className='mt-4 pb-4 text-center'>
            {isRequest === 'following' || isRequest === 'friend' ? (  
              <Button
                className='w-5/6 font-semibold text-gray-500 hover:text-grey-darkLight hover:border-grey-darkLight hover:shadow-lg'
                onClick={handleUnFollow}
              >
                UnFollow
              </Button>
            ) : (    
              <Button
                className='w-5/6 font-semibold text-gray-500 hover:text-grey-darkLight hover:border-grey-darkLight hover:shadow-lg'
                onClick={handleFollow}
              >
                Follow
              </Button>
            ) }
          </div>
        </div>
      )}
    </Sider>
  );
};

export default SiderLeftPersonal;

const getUsername = (url: string | null) => {
  if (url === null) return '';
  const regexUrl = url.match(/\/(\w+)/g);
  if (regexUrl === null) return '';
  const username = regexUrl[regexUrl.length - 1].substring(1);
  return username;
};