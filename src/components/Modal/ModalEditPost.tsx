import { Avatar, Modal, Select, Input, Upload, Spin } from 'antd';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import ImgCrop from 'antd-img-crop';
import React, { useEffect, useState } from 'react';
import {
  AiFillLock,
  AiOutlineCloseCircle,
  AiOutlineUser,
} from 'react-icons/ai';
import { BsFillPlayBtnFill, BsImageFill } from 'react-icons/bs';
import { FaUserFriends } from 'react-icons/fa';
import { MdPublic } from 'react-icons/md';
import { useAppDispatch } from '../../app/hooks';
import { openNotification } from '../../utils';
import uploadApi from '../../services/api/uploadApi';
import postApi from '../../services/api/postApi';
import { PostInformation } from '../../models';
import { postActions } from '../../app/features/post/postSlice';
import { AxiosError } from 'axios';

const { TextArea } = Input;

type Props = {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  post: PostInformation;
};

const ModalEditPost: React.FC<Props> = ({ open, onOk, onCancel, post }) => {
  const { upload, userId: user } = post;

  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(post.content);
  const [postMode, setPostMode] = useState(post.postMode);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [fileRemove, setFileRemove] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (upload.length > 0) {
      const images = upload.map((item) : UploadFile => ({
        uid: item.public_id,
        name: item.name || 'image',
        status: 'done',
        url: item.url,
      }));
      setFileList(images);
    }
  }, [upload])

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
    setFileRemove([]);
    onCancel();
  };

  const handleRemoveImage = async (file: UploadFile) => {
    if (file.uid.includes('winter-social-network')) {
      setFileList((oldFile) => oldFile.filter((item) => item.uid !== file.uid));
      setFileRemove((oldFile) => [...oldFile, file.uid]);
    }
  };

  const handleEditPost = async () => {
    setLoading(true);
    try {
      const data = await postApi.updatePost({ id: post.id, content, postMode });
      dispatch(postActions.updatePostBasicInfo({ postId: data.id, content, postMode }));
      const fileListAdd = fileList.filter((item) => !item.uid.includes
      ('winter-social-network'));
      
      if (fileListAdd.length > 0) {
        let formData = new FormData();
        for (const file of fileListAdd) {
          formData.append('images', file.originFileObj as Blob);
        }
        const images = await uploadApi.uploadImages(formData);
        for (const image of images) {
          await uploadApi.createUpload({ ...image, postId: data.id });
        }
        dispatch(postActions.updatePostUpload({postId: data.id, upload: images}))
      }
      if(fileRemove.length > 0) {
        for (const id of fileRemove) {
          dispatch(postActions.deleteUploadPost({ postId: post.id, public_id: id}))
          await uploadApi.deleteUpload(id);
        }
      }
      setLoading(false);
      openNotification(
        'success',
        'Edit Post Successfully!',
        ''
      );
    } catch (error) {
      setLoading(false);
      const err = error as AxiosError;
      const data: any = err.response?.data;
      openNotification('error', 'Edit Post Failed!', data.message);
    }
    onOk();
    setFileRemove([]);
  };


  return (
    <>
      <Modal
        title='Edit Post'
        maskClosable={false}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={loading ? { style: { display: 'none' } } : {}}
        closeIcon={<AiOutlineCloseCircle size={22} />}
        open={open}
        okText='Save'
        onOk={handleEditPost}
        onCancel={handleCancelPost}
        width={'35%'}
        className='custom-modal'
      >
        <Spin spinning={loading} size='large'>
          <div>
            <div className='flex pt-2'>
              <Avatar
                size={64}
                icon={<AiOutlineUser size={62} />}
                src={user.avatar?.url}
              />
              <div className='flex flex-col ml-2'>
                <span className='font-semibold text-xl'>{`${user.firstName} ${user.lastName}`}</span>
                <Select
                  defaultValue={post.postMode}
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
                  onRemove={handleRemoveImage}
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

export default ModalEditPost;
