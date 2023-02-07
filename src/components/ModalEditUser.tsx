import { Avatar, Modal, Input, Button, Progress, Select } from 'antd';
import React, { useState } from 'react';
import {
  AiOutlineCloseCircle,
  AiOutlineGithub,
  AiOutlineInstagram,
  AiOutlinePlusCircle,
  AiOutlineUser,
} from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { AppState } from '../app/store';
import { openNotification } from '../utils';
import uploadApi from '../services/api/uploadApi';
import { AxiosError } from 'axios';
import { BiEditAlt } from 'react-icons/bi';
import { MdPhotoCamera } from 'react-icons/md';
import { SocialLinks, UpdateUser, UploadInformation } from '../models';
import { userActions } from '../app/features/user/userSlice';
import userApi from '../services/api/userApi';
import { BsFacebook } from 'react-icons/bs';

const INIT_PERCENT = 30;

const { TextArea } = Input;

type Props = {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
};

const initialStateLinks = {
  facebook: '',
  instagram: '',
  github: '',
};

const getUsername = (url: string | null) => {
  if(url === null) return '';
  const regexUrl = url.match(/\/(\w+)/g);
  if(regexUrl === null) return '';
  const username = regexUrl[regexUrl.length - 1].substring(1);
  return username;
}

const ModalEditUser: React.FC<Props> = ({ open, onCancel }) => {
  const user = useAppSelector((state: AppState) => state.user.data);
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState<null | UploadInformation>(null);
  const [percent, setPercent] = useState<number>(-INIT_PERCENT);
  const [isEdit, setIsEdit] = useState({ field: '', edit: false });
  const [name, setName] = useState(`${user.firstName} ${user.lastName}`);
  const [location, setLocation] = useState(user.location || '');
  const [bio, setBio] = useState(user.bio || '');
  const [links, setLinks] = useState(initialStateLinks);
  const [social, setSocial] = useState('');
  const dispatch = useAppDispatch();

  const changeAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files;
      if (file && file.length > 0) {
        const image = file[0];
        if (image.size > 2 * 1024 * 1024)
          return openNotification(
            'error',
            'Upload Image Failed',
            'Size too large'
          );
        if (!image.type.match(/\/(jpg|jpeg|png|gif)$/))
          return openNotification(
            'error',
            'Upload Image Failed',
            'File format is incorrect'
          );
        let formData = new FormData();
        formData.append('image', image);
        setLoading(true);
        const timerProgress = setInterval(() => {
          setPercent((prev) => {
            if (prev >= 60) {
              clearInterval(timerProgress);
            }
            return prev + INIT_PERCENT;
          });
        }, 1000);
        const img = await uploadApi.uploadImage(formData);
        const data = await uploadApi.createUpload(img);
        setAvatar(data);
        clearInterval(timerProgress);
        if (user.avatar?.public_id) {
          await uploadApi.deleteUpload(user.avatar.public_id);
        }
        dispatch(userActions.changeAvatar({ avatar: data }));
        setLoading(false);
        setPercent(-INIT_PERCENT);
      }
    } catch (error) {
      return openNotification(
        'error',
        'Upload Image Failed',
        'No files uploaded !'
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const name = e.target.name;
    if (name === 'name') {
      setName(e.target.value);
    } else if (name === 'location') {
      setLocation(e.target.value);
    } else if (name === 'bio') {
      setBio(e.target.value);
    }
  };

  const changeLinks = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLinks({ ...links, [name]: value });
  };
  
  const handleCancelEdit = () => {
    onCancel();
  };

  const handleSave = async ({ ...value }: UpdateUser & { name?: string }) => {
    setLoading(true);
    try {
      if (value.name) {
        const name = value.name.trim();
        const firstName = name.substring(0, name.lastIndexOf(' '));
        const lastName = name.substring(name.lastIndexOf(' ') + 1);
        await userApi.updateUser({ firstName, lastName });
        dispatch(
          userActions.changeUserBasicInfo({
            key: 'firstName',
            value: firstName,
          })
        );
        dispatch(
          userActions.changeUserBasicInfo({ key: 'lastName', value: lastName })
        );
      } else if (value.location) {
        await userApi.updateUser({ location: value.location });
        dispatch(
          userActions.changeUserBasicInfo({
            key: 'location',
            value: value.location,
          })
        );
      } else if (value.bio) {
        await userApi.updateUser({ bio: value.bio });
        dispatch(
          userActions.changeUserBasicInfo({ key: 'bio', value: value.bio })
        );
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const err = error as AxiosError;
      const data: any = err.response?.data;
      openNotification('error', 'Upload Post Failed!', data.message);
    }
    setIsEdit({ field: '', edit: false });
  };

  const handleSaveLinks = async ({ ...value }: Partial<Omit<SocialLinks, 'id'>>) => {
    setLoading(true);
    try {
      await userApi.updateSocialLinks({ ...value });
      dispatch(
        userActions.changeSocialLinks({
          key: Object.keys(value)[0] as keyof Pick<
            SocialLinks,
            'linkFacebook' | 'linkInstagram' | 'linkGithub'
          >,
          value: Object.values(value)[0] as string | null,
        })
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const err = error as AxiosError;
      const data: any = err.response?.data;
      openNotification('error', 'Upload Post Failed!', data.message);
    }
    setIsEdit({ field: '', edit: false });
  };
  
  return (
    <>
      <Modal
        title='Edit User'
        maskClosable={false}
        footer={null}
        closeIcon={<AiOutlineCloseCircle size={22} />}
        open={open}
        onCancel={handleCancelEdit}
        width={'35%'}
        style={{ top: 20 }}
        className='ant-modal-header:text-center ant-modal-title:text-2xl ant-modal-footer-btn:w-full ant-modal-footer-btn:m-0 ant-modal-footer-btn:bg-purple-FrenchMauve ant-modal-footer-btn-hover:bg-purple-Purpureus ant-modal-footer-btn:h-10'
      >
        <div>
          <div className='items-center flex-row pt-2 grid grid-cols-8'>
            <div className='col-span-8 flex items-center relative'>
              <Avatar
                size={82}
                icon={<AiOutlineUser size={80} />}
                src={avatar ? avatar.url : user.avatar?.url}
              />
              <input
                type='file'
                name='image'
                id='avatar-upload'
                style={{ display: 'none' }}
                hidden
                onChange={changeAvatar}
              />
              {loading ? (
                <div className='absolute z-50 w-[82px] h-[82px] overflow-hidden rounded-full bg-gray-200 bg-opacity-80'>
                  <Progress
                    type='circle'
                    percent={percent}
                    showInfo={false}
                    width={60}
                    className='absolute right-[calc(50%_-_30px)] bottom-[15%]'
                  />
                </div>
              ) : (
                <label
                  htmlFor='avatar-upload'
                  className='absolute left-[12%] bottom-0 ml-auto mr-auto z-50 w-[23px] h-[23px] cursor-pointer overflow-hidden rounded-full bg-gray-200'
                >
                  <MdPhotoCamera
                    size={20}
                    className='text-gray-500 absolute rounded-full cursor-pointer top-[2px] left-[1.5px]'
                  />
                </label>
              )}
              {isEdit.field === 'name' && isEdit.edit ? (
                <TextArea
                  name='name'
                  className='ml-2 font-semibold text-xl'
                  maxLength={100}
                  style={{ resize: 'none', width: '80%' }}
                  onChange={handleChange}
                  size='large'
                  value={name}
                  placeholder='Name'
                />
              ) : (
                <span className='font-semibold text-xl ml-2'>{`${user.firstName} ${user.lastName}`}</span>
              )}
            </div>
            {isEdit.field === 'name' && isEdit.edit ? (
              <div className='flex col-end-9 col-span-3 ml-9 mt-3'>
                <Button
                  type='primary'
                  className='mr-2 bg-grey-Cultured hover:bg-[#939393] hover:text-white-F1 text-grey-darkHover border-none'
                  onClick={() => setIsEdit({ field: '', edit: false })}
                >
                  Cancel
                </Button>
                <Button
                  type='primary'
                  className='bg-purple-DeepLilac hover:bg-[#5f3a87]'
                  onClick={() => handleSave({ name: name })}
                >
                  Save
                </Button>
              </div>
            ) : (
              <BiEditAlt
                size={25}
                className='col-end-10 cursor-pointer'
                onClick={() => setIsEdit({ field: 'name', edit: true })}
              />
            )}
          </div>

          <div className='my-3'>
            <div className='flex items-center justify-between'>
              <h1 className='text-xl font-semibold mb-1'>Location</h1>
              {!(isEdit.field === 'location' && isEdit.edit) && (
                <BiEditAlt
                  size={25}
                  className='cursor-pointer'
                  onClick={() => setIsEdit({ field: 'location', edit: true })}
                />
              )}
            </div>
            {isEdit.field === 'location' && isEdit.edit ? (
              <div className='grid grid-cols-8 mt-1'>
                <TextArea
                  name='location'
                  className='col-span-8'
                  maxLength={100}
                  style={{ resize: 'none', width: '98%' }}
                  onChange={handleChange}
                  size='large'
                  value={location}
                  placeholder='location'
                />
                <div className='flex col-end-9 col-span-3 ml-9 mt-3'>
                  <Button
                    type='primary'
                    className='mr-2 bg-grey-Cultured hover:bg-[#939393] hover:text-white-F1 text-grey-darkHover border-none'
                    onClick={() => setIsEdit({ field: '', edit: false })}
                  >
                    Cancel
                  </Button>
                  <Button
                    type='primary'
                    className='bg-purple-DeepLilac hover:bg-[#5f3a87]'
                    onClick={() => handleSave({ location: location })}
                  >
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <span className=''>{user.location || 'my location'}</span>
            )}
          </div>

          <hr className='my-3 bg-gray-200 dark:bg-gray-700' />

          <div className=''>
            <div className='flex items-center justify-between'>
              <h1 className='text-xl font-semibold mb-1'>Bio</h1>
              {!(isEdit.field === 'bio' && isEdit.edit) && (
                <BiEditAlt
                  size={25}
                  className='cursor-pointer'
                  onClick={() => setIsEdit({ field: 'bio', edit: true })}
                />
              )}
            </div>
            {isEdit.field === 'bio' && isEdit.edit ? (
              <div className='grid grid-cols-8 mt-2'>
                <TextArea
                  name='bio'
                  className='col-span-8'
                  maxLength={100}
                  style={{ resize: 'none', width: '98%' }}
                  onChange={handleChange}
                  size='large'
                  value={bio}
                  placeholder='bio'
                />
                <div className='flex col-end-9 col-span-3 ml-9 mt-3'>
                  <Button
                    type='primary'
                    className='mr-2 bg-grey-Cultured hover:bg-[#939393] hover:text-white-F1 text-grey-darkHover border-none'
                    onClick={() => setIsEdit({ field: '', edit: false })}
                  >
                    Cancel
                  </Button>
                  <Button
                    type='primary'
                    className='bg-purple-DeepLilac hover:bg-[#5f3a87]'
                    onClick={() => handleSave({ bio: bio })}
                  >
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <span>{user.bio || 'my bio'}</span>
            )}
          </div>

          <hr className='my-3 bg-gray-200 dark:bg-gray-700' />

          <div className=''>
            <div className='flex items-center justify-between'>
              <h1 className='text-xl font-semibold mb-1'>My pages</h1>
              {!(isEdit.field === 'page' && isEdit.edit) && (
                <BiEditAlt
                  size={25}
                  className='cursor-pointer'
                  onClick={() => setIsEdit({ field: 'page', edit: true })}
                />
              )}
            </div>
            <div className=''>
              <div className='flex items-center'>
                {isEdit.field === 'facebook' && isEdit.edit ? (
                  <div className='grid grid-cols-8 mt-2'>
                    <Input.Group
                      compact
                      className='my-2 flex col-span-8 items-center'
                    >
                      <Input
                        name='facebook'
                        style={{ width: '60%' }}
                        placeholder='link'
                        className='rounded-md mr-3'
                        defaultValue={user.links?.linkFacebook || ''}
                        onChange={changeLinks}
                      />
                      <Select
                        defaultValue='Facebook'
                        style={{ width: '30%' }}
                        disabled
                      />
                    </Input.Group>
                    <div className='flex col-end-9 col-span-3 ml-9 mt-3'>
                      <Button
                        type='primary'
                        className='mr-2 bg-grey-Cultured hover:bg-[#939393] hover:text-white-F1 text-grey-darkHover border-none'
                        onClick={() => setIsEdit({ field: '', edit: false })}
                      >
                        Cancel
                      </Button>
                      <Button
                        type='primary'
                        className='bg-purple-DeepLilac hover:bg-[#5f3a87]'
                        onClick={() =>
                          handleSaveLinks({ linkFacebook: links.facebook })
                        }
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    {user.links?.linkFacebook ? (
                      <button className='flex' onClick={() => window.open(user.links?.linkFacebook || '', '_blank')}>
                        <BsFacebook className='text-blue-500 text-xl mr-2' />
                        {getUsername(user.links?.linkFacebook)}
                      </button>
                    ) : (
                      ''
                    )}
                    {user.links?.linkFacebook &&
                      isEdit.field === 'page' &&
                      isEdit.edit && (
                        <BiEditAlt
                          size={20}
                          className='cursor-pointer ml-3 border-none'
                          onClick={() =>
                            setIsEdit({ field: 'facebook', edit: true })
                          }
                        />
                      )}
                  </>
                )}
              </div>
              <div className='flex items-center mt-1'>
                {isEdit.field === 'instagram' && isEdit.edit ? (
                  <div className='grid grid-cols-8 mt-2'>
                    <Input.Group
                      compact
                      className='my-2 flex col-span-8 items-center'
                    >
                      <Input
                        name='instagram'
                        style={{ width: '60%' }}
                        placeholder='link'
                        className='rounded-md mr-3'
                        defaultValue={user.links?.linkInstagram || ''}
                        onChange={changeLinks}
                      />
                      <Select
                        defaultValue='Instagram'
                        style={{ width: '30%' }}
                        disabled
                      />
                    </Input.Group>
                    <div className='flex col-end-9 col-span-3 ml-9 mt-3'>
                      <Button
                        type='primary'
                        className='mr-2 bg-grey-Cultured hover:bg-[#939393] hover:text-white-F1 text-grey-darkHover border-none'
                        onClick={() => setIsEdit({ field: '', edit: false })}
                      >
                        Cancel
                      </Button>
                      <Button
                        type='primary'
                        className='bg-purple-DeepLilac hover:bg-[#5f3a87]'
                        onClick={() =>
                          handleSaveLinks({ linkInstagram: links.instagram })
                        }
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    {user.links?.linkInstagram ? (
                        <button className='flex' onClick={() => window.open(user.links?.linkInstagram || '', '_blank')}>
                        <AiOutlineInstagram className='text-white-F1 text-xl instagram mr-2' />
                        {getUsername(user.links?.linkInstagram)}
                      </button>
                    ) : (
                      ''
                    )}
                    {user.links?.linkInstagram &&
                      isEdit.field === 'page' &&
                      isEdit.edit && (
                        <BiEditAlt
                          size={20}
                          className='cursor-pointer ml-3 border-none'
                          onClick={() =>
                            setIsEdit({ field: 'instagram', edit: true })
                          }
                        />
                      )}
                  </>
                )}
              </div>
              <div className='flex items-center mt-1'>
                {isEdit.field === 'github' && isEdit.edit ? (
                  <div className='grid grid-cols-8 mt-2'>
                    <Input.Group
                      compact
                      className='my-2 flex col-span-8 items-center'
                    >
                      <Input
                        name='github'
                        style={{ width: '60%' }}
                        placeholder='link'
                        className='rounded-md mr-3'
                        defaultValue={user.links?.linkGithub || ''}
                        onChange={changeLinks}
                      />
                      <Select
                        defaultValue='Github'
                        style={{ width: '30%' }}
                        disabled
                      />
                    </Input.Group>
                    <div className='flex col-end-9 col-span-3 ml-9 mt-3'>
                      <Button
                        type='primary'
                        className='mr-2 bg-grey-Cultured hover:bg-[#939393] hover:text-white-F1 text-grey-darkHover border-none'
                        onClick={() => setIsEdit({ field: '', edit: false })}
                      >
                        Cancel
                      </Button>
                      <Button
                        type='primary'
                        className='bg-purple-DeepLilac hover:bg-[#5f3a87]'
                        onClick={() =>
                          handleSaveLinks({ linkGithub: links.github })
                        }
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    {user.links?.linkGithub ? (
                        <button className='flex' onClick={() => window.open(user.links?.linkGithub || '', '_blank')}>
                        <AiOutlineGithub className='text-xl mr-2' />
                        {getUsername(user.links?.linkGithub)}
                      </button>
                    ) : (
                      ''
                    )}
                    {user.links?.linkGithub &&
                      isEdit.field === 'page' &&
                      isEdit.edit && (
                        <BiEditAlt
                          size={20}
                          className='cursor-pointer ml-3 border-none'
                          onClick={() =>
                            setIsEdit({ field: 'github', edit: true })
                          }
                        />
                      )}
                  </>
                )}
              </div>
            </div>
            {isEdit.field === 'page' && isEdit.edit && (
              <span className='flex items-center text-purple-Purpureus mt-1'>
                <AiOutlinePlusCircle
                  className='mr-1 cursor-pointer'
                  onClick={() =>
                    setIsEdit({
                      field: 'social',
                      edit: true,
                    })
                  }
                />
                Add a website
              </span>
            )}
            {isEdit.field === 'social' && isEdit.edit && (
              <div className='grid grid-cols-8 mt-2'>
                <Input.Group
                  compact
                  className='my-2 flex col-span-8 items-center'
                >
                  <Input
                    name={social}
                    style={{ width: '60%' }}
                    placeholder='link'
                    className='rounded-md mr-3'
                    onChange={changeLinks}
                    disabled={social === '' ? true : false}
                  />
                  <Select
                    style={{ width: '30%' }}
                    placeholder='Select Social'
                    onChange={(value) => {
                      setSocial(value);
                    }}
                    options={[
                      {
                        value: 'facebook',
                        label: 'Facebook',
                        disabled: user.links?.linkFacebook ? true : false,
                      },
                      {
                        value: 'instagram',
                        label: 'Instagram',
                        disabled: user.links?.linkInstagram ? true : false,
                      },
                      {
                        value: 'github',
                        label: 'Github',
                        disabled: user.links?.linkInstagram ? true : false,
                      },
                    ]}
                  />
                </Input.Group>
                <div className='flex col-end-9 col-span-3 ml-9 mt-3'>
                  <Button
                    type='primary'
                    className='mr-2 bg-grey-Cultured hover:bg-[#939393] hover:text-white-F1 text-grey-darkHover border-none'
                    onClick={() => {
                      setIsEdit({ field: '', edit: false });
                      setSocial('');
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type='primary'
                    className='bg-purple-DeepLilac hover:bg-[#5f3a87]'
                    onClick={() => {
                      if (social === 'facebook')
                        handleSaveLinks({ linkFacebook: links.facebook });
                      if (social === 'instagram')
                        handleSaveLinks({ linkInstagram: links.instagram });
                      if (social === 'github')
                        handleSaveLinks({ linkGithub: links.github });
                    }}
                  >
                    Save
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalEditUser;
