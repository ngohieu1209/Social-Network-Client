import { Avatar, Dropdown, MenuProps, Modal, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { Image } from 'antd';
import moment from 'moment';
import { FiMoreHorizontal } from 'react-icons/fi';
import { AiFillHeart, AiFillLock, AiOutlineHeart, AiOutlineUser } from 'react-icons/ai';
import { FaRegCommentAlt, FaUserFriends } from 'react-icons/fa';
import { PostInformation } from '../models/post';
import { BiEditAlt } from 'react-icons/bi';
import { MdDeleteOutline, MdPublic } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { AppState } from '../app/store';
import ModalEditPost from './Modal/ModalEditPost';
import postApi from '../services/api/postApi';
import { postActions } from '../app/features/post/postSlice';
import { openNotification } from '../utils';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import likeApi from '../services/api/likeApi';
import Comments from './Comments';

const picture_loading_failed = require('../assets/images/picture-loading-failed.png');

type Props = {
  post: PostInformation
};

const ListPost: React.FC<Props> = ({ post }) => {
  const { comment } = post;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  
    const navigate = useNavigate();


   const showModal = () => {
     setIsModalOpen(true);
  };
  
   const handleOk = () => {
     setIsModalOpen(false);
   };

   const handleCancel = () => {
     setIsModalOpen(false);
  };

  const currentUser = useAppSelector((state: AppState) => state.user.data);
  const dispatch = useAppDispatch();
  const { upload, userId: user } = post;

  const handleDeletePost = async (postId: string) => {
    try {
      dispatch(postActions.deletePost({ postId }));
      await postApi.deletePost(postId);
      openNotification(
        'success',
        'Delete Post Successfully!',
        ''
      );
    } catch (error) {
      const err = error as AxiosError;
      const data: any = err.response?.data;
      openNotification('error', 'Delete Post Failed!', data.message);
    }
  };

  const IconMode = (): React.ReactElement => {
    if (post.postMode === 'public') {
      return <MdPublic className='mr-1' />;
    } else if(post.postMode === 'friend') {
      return <FaUserFriends className='mr-1' />;
    } else {
      return <AiFillLock className='mr-1' />;
    }
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Edit',
      icon: <BiEditAlt size={15} className='group-hover:text-[#3ACF3F]' />,
      className: 'group',
      style: {
        fontWeight: 600,
        fontSize: 16,
      },
      onClick: () => {showModal()}
    },
    {
      key: '2',
      label: 'Remove',
      icon: (
        <MdDeleteOutline size={15} className='group-hover:text-[#FF101F]' />
      ),
      className: 'group',
      style: {
        fontWeight: 600,
        fontSize: 16,
      },
      onClick: () => {configWarning()}
    },
  ];

  const configWarning = () => {
    Modal.confirm({
      icon: (
        <MdDeleteOutline size={28} className='text-[#FF101F] mr-2' />
      ),
      title: <span>Are you sure delete this post?</span>,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      closable: true,
      className: 'delete-confirm',
      onOk: () => {
        handleDeletePost(post.id);
      }
    });
  }

  const fetchLike = async () => {
    try {
      const listUser = await likeApi.getUserLikePost(post.id);
      if (listUser.length > 0) {
        const isUserLike = listUser.includes(currentUser.id);
        if(isUserLike) {
          setIsLike(true);
        } else {
          setIsLike(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (currentUser.id)
      fetchLike();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  const handleLike = async () => {
    try {
      if (isLike) {
        await likeApi.likePost(post.id);
        setLikesCount((prev) => prev - 1);
        setIsLike(false);
      } else {
        await likeApi.likePost(post.id);
        setLikesCount((prev) => prev + 1);
        setIsLike(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className=' bg-white-default mb-5 rounded-xl shadow-md shadow-white-gainsboro relative'>
      <div className='flex ml-5 pt-4'>
        <Avatar
          size={48}
          icon={<AiOutlineUser size={46} />}
          src={user.avatar?.url}
          onClick={() => navigate(`/${user.id}`)}
          className='cursor-pointer'
        />
        <div className='flex flex-col ml-2'>
          <span
            className='font-semibold cursor-pointer'
            onClick={() => navigate(`/${user.id}`)}
          >{`${user.firstName} ${user.lastName}`}</span>
          <span className='text-gray-400 text-sm flex items-center'>
            <IconMode />
            {moment(post.createdAt).fromNow()}
            {/* {post.updatedAt !== post.createdAt && (
              <span className='text-xs italic ml-2 mt-1'>
                Đã chỉnh sửa:{' '}
                {moment(post.updatedAt).calendar()}
              </span>
            )} */}
          </span>
        </div>
      </div>

      {currentUser.id === user.id && (
        <div className='absolute top-6 right-5 cursor-pointer'>
          <Dropdown menu={{ items }} trigger={['click']} placement='bottom'>
            <Space>
              <FiMoreHorizontal
                className='text-[#6E6E72] hover:text-[#3C3C3E]'
                size={25}
              />
            </Space>
          </Dropdown>
        </div>
      )}
      <ModalEditPost
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        post={post}
      />

      <div className='mx-5 my-3 text-left text-base'>
        <span>{post.content}</span>
      </div>
      <div className='ml-5 mr-5'>
        <Image.PreviewGroup>
          {upload.length > 0 &&
            upload.map((item) => {
              return (
                <Image
                  key={item.id || item.public_id}
                  className='rounded-xl ml-1 pl-1 pr-1'
                  width={`${
                    upload.length !== 4 ? 100 / upload.length - 1 : 100 / 2 - 1
                  }%`}
                  // style={{ aspectRatio: 'auto' }}
                  src={item.url}
                  preview={{
                    maskClassName: 'rounded-xl ml-2',
                  }}
                  fallback={picture_loading_failed}
                />
              );
            })}
        </Image.PreviewGroup>
      </div>
      <div className='mt-4 ml-5 pb-4 flex items-center'>
        <div className='flex mr-5'>
          {isLike ? (
            <AiFillHeart
              size={28}
              className='mr-1 text-red-500 cursor-pointer'
              onClick={handleLike}
            />
          ) : (
            <AiOutlineHeart
              size={28}
              className='mr-1 cursor-pointer'
              onClick={handleLike}
            />
          )}
          <span>{likesCount}</span>
        </div>
        <div className='flex items-center'>
          <FaRegCommentAlt size={23} className='mr-1' />
          <span>{post.commentsCount}</span>
        </div>
      </div>
      <div>
        <Comments postId={post.id} comments={comment && comment.slice().reverse()} count={post.commentsCount} />
      </div>
    </div>
  );
};

export default ListPost;