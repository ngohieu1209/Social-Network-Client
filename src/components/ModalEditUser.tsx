import { Avatar, Modal, Select, Input, Upload, Spin } from 'antd';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import ImgCrop from 'antd-img-crop';
import React, { useState } from 'react';
import {
  AiFillLock,
  AiOutlineCloseCircle,
  AiOutlineUser,
} from 'react-icons/ai';
import { BsFillPlayBtnFill, BsImageFill } from 'react-icons/bs';
import { FaUserFriends } from 'react-icons/fa';
import { MdPublic } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { AppState } from '../app/store';
import { openNotification } from '../utils';
import uploadApi from '../api/uploadApi';
import postApi from '../api/postApi';
import { postActions } from '../app/features/post/postSlice';
import { AxiosError } from 'axios';

const { TextArea } = Input;

type Props = {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
};

const ModalEditUser: React.FC<Props> = ({ open, onOk, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const [postMode, setPostMode] = useState('public');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const user = useAppSelector((state: AppState) => state.user.data);
  const dispatch = useAppDispatch();

  const onChange: UploadProps['onChange'] = ({
    file,
    fileList: newFileList,
  }) => {
    if (file.size && file.size > 1024 * 1024 * 2) {
      openNotification(
        'error',
        'Upload Image!',
        'Image must smaller than 2MB!'
      );
    } else if (file.type && !file.type.includes('image')) {
      openNotification('error', 'Upload Image!', 'Wrong format file!');
    } else {
      setFileList(newFileList);
    }
  };

  const handleChange = (value: string) => {
    setPostMode(value);
  };

  const handleCancelPost = () => {
    setContent('');
    setFileList([]);
    onCancel();
  };

  const handlePost = async () => {
    setLoading(true);
    try {
      const data = await postApi.createPost({ content, postMode });
      if (fileList.length > 0) {
        let formData = new FormData();
        for (const file of fileList) {
          formData.append('images', file.originFileObj as Blob);
        }
        const images = await uploadApi.uploadImages(formData);
        for (const image of images) {
          await uploadApi.createUpload({ ...image, postId: data.id });
        }
      }
      const post = await postApi.getPostById(data.id);
      dispatch(postActions.addPost({ post }));
      setLoading(false);
      openNotification('success', 'Upload Post Successfully!', '');
    } catch (error) {
      setLoading(false);
      const err = error as AxiosError;
      const data: any = err.response?.data;
      openNotification('error', 'Upload Post Failed!', data.message);
    }
    onOk();
    setContent('');
    setFileList([]);
  };

  return (
    <>
      <Modal
        title='Edit User'
        maskClosable={false}
        footer={null}
        closeIcon={<AiOutlineCloseCircle size={22} />}
        open={open}
        okText='Post'
        onOk={handlePost}
        onCancel={handleCancelPost}
        width={'35%'}
        className='ant-modal-header:text-center ant-modal-title:text-2xl ant-modal-footer-btn:w-full ant-modal-footer-btn:m-0 ant-modal-footer-btn:bg-purple-FrenchMauve ant-modal-footer-btn-hover:bg-purple-Purpureus ant-modal-footer-btn:h-10'
      >
        <Spin spinning={loading} size='large'>
          <div>
            <div className='flex items-center pt-2'>
              <Avatar
                size={64}
                icon={<AiOutlineUser size={62} />}
                src={user.avatar?.url}
              />
              <span className='font-semibold text-xl ml-2'>{`${user.firstName} ${user.lastName}`}</span>
            </div>


            <div className='my-3'>
              <h1 className='text-xl font-semibold'>Location</h1>
              <span>{user.location}</span>
            </div>

            <hr className='my-3 bg-gray-200 dark:bg-gray-700' />
            
            <div className=''>
              <h1 className='text-xl font-semibold'>Bio</h1>
              <span>{user.bio}</span>
            </div>

            <hr className='my-3 bg-gray-200 dark:bg-gray-700' />
            
            <div className=''>
              <h1 className='text-xl font-semibold'>My Pages</h1>
              <span>Add a website</span>
            </div>
          </div>
        </Spin>
      </Modal>
    </>
  );
};

export default ModalEditUser;
