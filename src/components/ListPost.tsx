import { Avatar, Button } from 'antd';
import React from 'react';
import { Image } from 'antd';
import { FiMoreHorizontal } from 'react-icons/fi';
import { AiFillHeart, AiOutlineHeart, AiOutlineUser } from 'react-icons/ai';
import { FaRegCommentAlt } from 'react-icons/fa';
import { useAppSelector } from '../app/hooks';
import { AppState } from '../app/store';

const picture_loading_failed = require('../assets/images/picture-loading-failed.png');

const ListPost = () => {

  const user = useAppSelector((state: AppState) => state.user.data);

  return (
    <div className=' bg-white-default mt-8 mb-6 rounded-xl shadow-md shadow-white-gainsboro relative'>
      <div className='flex ml-5 pt-4'>
        <Avatar
          size={48}
          icon={<AiOutlineUser size={46} />}
          src={user.avatar}
        />
        <div className='flex flex-col ml-2'>
          <span className='font-semibold'>Ngo Trung Hieu</span>
          <span className='text-gray-400 text-sm'>2 hours ago</span>
        </div>
      </div>

      <div className='absolute top-6 right-5 cursor-pointer'>
        <FiMoreHorizontal
          className='text-[#6E6E72] hover:text-[#3C3C3E]'
          size={25}
        />
      </div>

      {/* <hr className='mx-5 my-3 h-px bg-gray-200 dark:bg-gray-700' /> */}

      <div className='mx-5 my-3 text-left text-base'>
        <span>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout
        </span>
      </div>
      <div className='ml-5 mr-5'>
        <Image
          className='w-full rounded-xl'
          style={{ aspectRatio: 'auto' }}
          src='https://afamilycdn.com/150157425591193600/2020/11/26/envfb8uucaauczf-16063924492751905819335-1606405159242-16064051600031572598975.jpg'
          preview={{
            maskClassName: 'rounded-xl',
          }}
          fallback={picture_loading_failed}
        />
      </div>
      <div className='mt-4 ml-5 pb-4 flex items-center'>
        <div className='flex mr-5'>
          <AiFillHeart size={28} className='mr-1 text-red-500' />
          <span>99</span>
        </div>
        <div className='flex items-center'>
          <FaRegCommentAlt size={23} className='mr-1' />
          <span>99</span>
        </div>
      </div>
    </div>
  );
};

export default ListPost;