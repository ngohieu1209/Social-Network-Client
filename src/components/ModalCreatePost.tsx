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

const ModalCreatePost: React.FC<Props> = ({ open, onOk, onCancel }) => {
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
        title='Create Post'
        maskClosable={false}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={loading ? { style: { display: 'none' } } : {}}
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
            <div className='flex pt-2'>
              <Avatar
                size={64}
                icon={<AiOutlineUser size={62} />}
                src={user.avatar}
              />
              <div className='flex flex-col ml-2'>
                <span className='font-semibold text-xl'>{`${user.firstName} ${user.lastName}`}</span>
                <Select
                  defaultValue='public'
                  style={{ width: 110, marginTop: 5 }}
                  onSelect={handleChange}
                  optionLabelProp='label'
                  options={[
                    {
                      value: 'public',
                      label: (
                        <div className='flex items-center justify-start'>
                          <MdPublic className='mr-1' />{' '}
                          <span className='font-semibold'>Public</span>
                        </div>
                      ),
                    },
                    {
                      value: 'friend',
                      label: (
                        <div className='flex items-center justify-start'>
                          <FaUserFriends className='mr-1' />{' '}
                          <span className='font-semibold'>Friend</span>
                        </div>
                      ),
                    },
                    {
                      value: 'private',
                      label: (
                        <div className='flex items-center justify-start'>
                          <AiFillLock className='mr-1' />{' '}
                          <span className='font-semibold'>Only me</span>
                        </div>
                      ),
                    },
                  ]}
                />
              </div>
            </div>
            <div className='mt-8'>
              <TextArea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind?"
                autoSize={{ minRows: 3, maxRows: 3 }}
                bordered={false}
                size='large'
                spellCheck={false}
                className='text-2xl'
              />
            </div>
            <div className='my-8 flex justify-between items-center box-border h-12 border-solid border-2 rounded-lg'>
              <span className='ml-5 font-semibold'>Add to your post</span>
              <div className='flex'>
                <label
                  htmlFor='image-upload'
                  className='flex items-center mr-5 cursor-pointer'
                >
                  <BsImageFill className='text-[#2F49EE] mr-1' size={20} />
                  <span className='font-semibold'>Image</span>
                </label>
                <div className='flex items-center mr-5'>
                  <BsFillPlayBtnFill
                    className='text-[#FCAB10] mr-1'
                    size={20}
                  />
                  <span className='font-semibold'>Video</span>
                </div>
              </div>
            </div>
            <div>
              <ImgCrop
                beforeCrop={(file) => {
                  if (
                    file.size > 1024 * 1024 * 2 ||
                    !file.type.includes('image')
                  ) {
                    return false;
                  } else {
                    return true;
                  }
                }}
              >
                <Upload
                  listType='picture-card'
                  id='image-upload'
                  showUploadList={{ showPreviewIcon: false }}
                  accept='image/*'
                  fileList={fileList}
                  onChange={onChange}
                  onRemove={(file) => console.log(file.uid)}
                  beforeUpload={() => {
                    return false;
                  }}
                  className={`${fileList.length > 0 ? '' : 'hidden'}`}
                >
                  {fileList.length < 4 && '+ Upload'}
                </Upload>
              </ImgCrop>
            </div>
          </div>
        </Spin>
      </Modal>
    </>
  );
};

export default ModalCreatePost;
