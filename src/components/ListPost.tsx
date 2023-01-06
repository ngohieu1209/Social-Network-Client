import { Avatar, Button } from 'antd';
import React from 'react';
import { Image } from 'antd';
import { FiMoreHorizontal } from 'react-icons/fi';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FaRegCommentAlt } from 'react-icons/fa';

const ListPost = () => {
  return (
    <div className=' bg-white-default mt-8 mb-6 rounded-xl shadow-inner shadow-white-gainsboro relative'>
      <div className='flex ml-5 pt-4'>
        <Avatar
          size={56}
          src='https://i.pinimg.com/550x/3c/61/48/3c6148580a9d33efb242b5c369d0a5be.jpg'
        />
        <div className='flex flex-col ml-2'>
          <span className='font-semibold'>Ngo Trung Hieu</span>
          <span className='text-gray-400'>2 hours ago</span>
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