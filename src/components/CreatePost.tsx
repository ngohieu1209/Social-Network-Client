import { Avatar, Select } from 'antd';
import { AiOutlineUser } from 'react-icons/ai';
import { BsFillPlayBtnFill, BsImageFill } from 'react-icons/bs';
import { FaHashtag } from 'react-icons/fa';
import { FiLink } from 'react-icons/fi';
import { useAppSelector } from '../app/hooks';
import { AppState } from '../app/store';

const CreatePost = () => {

  const user = useAppSelector((state: AppState) => state.user.data);

  return (
    <div className=' bg-white-default mt-9 mb-6 rounded-xl shadow-md shadow-white-gainsboro'>
      <div className='flex items-center ml-5 pt-4'>
        <Avatar
          size={48}
          icon={<AiOutlineUser size={46} />}
          src={user.avatar}
        />
        <Select
          size='large'
          className='w-4/5 share-input ml-5'
          placeholder='Share something ...'
          onChange={(value) => console.log(value)}
          showArrow={false}
          notFoundContent={null}
        />
      </div>

      <hr className='mx-5 my-5 h-px bg-gray-200 dark:bg-gray-700' />

      <div className='ml-5 pb-4 flex justify-evenly'>
        <div className='flex items-center'>
          <BsImageFill className='text-[#2F49EE]' size={20} />
          <span className='mx-2 font-semibold'>Image</span>
        </div>
        <div className='flex items-center'>
          <BsFillPlayBtnFill className='text-[#FCAB10]' size={20} />
          <span className='mx-2 font-semibold'>Video</span>
        </div>
        <div className='flex items-center'>
          <FiLink className='text-[#32936F]' size={20} />
          <span className='mx-2 font-semibold'>Attachment</span>
        </div>
        <div className='flex items-center'>
          <FaHashtag className='text-[#EA3449]' size={20} />
          <span className='mx-2 font-semibold'>Hashtag</span>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;