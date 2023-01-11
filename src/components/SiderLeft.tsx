import { Avatar, Button, Layout } from 'antd';
import React from 'react';
import {
  AiOutlineHeart,
  AiOutlineEye,
  AiOutlineInstagram,
  AiOutlineUser,
} from 'react-icons/ai';
import { BsFacebook } from 'react-icons/bs';
import { useAppSelector } from '../app/hooks';
import { AppState } from '../app/store';

const { Sider } = Layout;

const SiderLeft = () => {

  const user = useAppSelector((state: AppState) => state.user.data);

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
      <div className='w-1/5 fixed left-20 bg-white-default mt-9 mb-6 rounded-xl shadow-md shadow-white-gainsboro'>
        <div className='flex ml-5 pt-4'>
          <Avatar
            size={48}
            icon={<AiOutlineUser size={46} />}
            src={user.avatar}
          />
          <div className='flex flex-col ml-2'>
            <span className='font-semibold'>{`${user.firstName} ${user.lastName}`}</span>
            <span className='text-gray-500 text-sm'>Ha Noi</span>
          </div>
        </div>

        <hr className='mx-5 my-3 h-px bg-gray-200 dark:bg-gray-700' />

        <div className='ml-5 mb-1 flex items-center'>
          <AiOutlineHeart className='text-pink-500' size={20} />
          <span className='mx-2'>{user.followers}</span>
          <span className='text-gray-500'>Follows</span>
        </div>
        <div className='ml-5 mb-2 flex items-center'>
          <AiOutlineEye className='text-blue-500' size={20} />
          <span className='mx-2'>{user.following}</span>
          <span className='text-gray-500'>Following</span>
        </div>
        <div className='mx-5 text-gray-600 text-left text-sm'>
          <span>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout
          </span>
        </div>
        <hr className='mx-5 my-3 h-px bg-gray-200 dark:bg-gray-700' />
        <div className='ml-5'>
          <span className='font-semibold text-gray-500'>MY PAGES</span>
          <div className='flex mt-2'>
            <AiOutlineInstagram className='text-white-F1 text-2xl instagram' />
            <span className='ml-2'>Link instagram</span>
          </div>
          <div className='flex mt-2'>
            <BsFacebook className='text-blue-500 text-2xl' />
            <span className='ml-2'>Link facebook</span>
          </div>
        </div>
        <div className='mt-4 pb-4 text-center'>
          <Button className='w-5/6 font-semibold text-gray-500 hover:text-grey-darkLight hover:border-grey-darkLight hover:shadow-lg'>
            Edit
          </Button>
        </div>
      </div>
    </Sider>
  );
};

export default SiderLeft;
