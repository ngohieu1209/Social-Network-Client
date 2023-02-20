import React, { useState } from 'react';
import { Button, Form, Input, Typography, Layout, Avatar, Progress } from 'antd';
import { AxiosError } from 'axios';
import { openNotification } from '../utils';
import { useAppDispatch } from '../app/hooks';
import { AiOutlineUser, AiOutlinePoweroff } from 'react-icons/ai';
import { MdPhotoCamera } from 'react-icons/md';
import { FirstLogin as FirstLoginDto, UploadInformation } from '../models';
import userApi from '../services/api/userApi';
import { userActions } from '../app/features/user/userSlice';
import uploadApi from '../services/api/uploadApi';
import authApi from '../services/api/authApi';

const { Header, Content, Footer } = Layout;
const logo = require('../assets/logo.png');

const INIT_PERCENT = 30;

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 100,
      offset: 0,
    },
  },
};


const FirstLogin = () => {

  const [avatar, setAvatar] = useState<null | UploadInformation>(null);
  const [loading, setLoading] = useState(false);
  const [percent, setPercent] = useState<number>(-INIT_PERCENT);

  const dispatch = useAppDispatch();

  const [form] = Form.useForm();

  const changeAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files;
      if (file && file.length > 0) {
        const image = file[0];
        if (image.size > 2 * 1024 * 1024)
          return openNotification('error', 'Upload Image Failed', "Size too large");
        if (!image.type.match(/\/(jpg|jpeg|png|gif)$/))
          return openNotification('error', 'Upload Image Failed', 'File format is incorrect');
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
        setLoading(false);
        setPercent(-INIT_PERCENT);
      }
    } catch (error) {
      return openNotification('error', 'Upload Image Failed', 'No files uploaded !');
    }
  };

  const handleSubmit = async (values: FirstLoginDto) => {
    const { firstName, lastName } = values;
    try {
      await userApi.updateUser({
        firstName,
        lastName,
        avatar: avatar ? avatar.id : null,
      });
      dispatch(userActions.getUserStart());
      openNotification(
        'success',
        'Setup Successfully',
        'Welcome to Winter Social Network'
      );
      form.resetFields();
    } catch (error) {
      const err = error as AxiosError;
      const data: any = err.response?.data;
      openNotification('error', 'Setup Failed', data?.message);
    }
  };

  const handleSignOut = async() => {
    await authApi.signOut();
  }

  return (
    <Layout className='layout bg-white-F1cc'>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          height: '75px',
        }}
        className='bg-white-default rounded-b-xl shadow-md shadow-white-gainsboro'
      >
        <div className='flex items-center'>
          <img
            src={logo}
            alt='logo'
            className='w-56 h-16 mt-[5px] ml-auto mr-auto'
          />
          <AiOutlinePoweroff
            size={30}
            color={'#FA003F'}
            className='hover:scale-125 cursor-pointer'
            onClick={handleSignOut}
          />
        </div>
      </Header>
      <Content className='bg-white-F1cc w-full h-[calc(100vh_-_150px)]'>
        <div className='bg-white-default w-[40%] h-[75%] rounded-2xl flex flex-col content-center items-center absolute top-[15%] left-[30%] shadow-inner shadow-white-gainsboro'>
          <Typography.Title
            editable={false}
            level={1}
            style={{ margin: '50px 0 20px 0', textAlign: 'start' }}
            className='font-Acme-Regular'
          >
            Welcome To Winter
          </Typography.Title>
          <Form
            form={form}
            onFinish={handleSubmit}
            scrollToFirstError
            layout='vertical'
            className='w-[70%] label-form'
          >
            <div className='text-center relative mb-10'>
              <Avatar
                size={100}
                icon={<AiOutlineUser size={100} />}
                src={avatar?.url}
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
                <div
                  className='absolute right-[calc(50%_-_50px)] bottom-[calc(50%_-_50px)] z-50 w-[100px] h-[100px] overflow-hidden rounded-full bg-gray-200 bg-opacity-80'
                >
                  <Progress
                    type='circle'
                    percent={percent}
                    showInfo={false}
                    width={60}
                    className='absolute right-[calc(50%_-_30px)] bottom-[20%]'
                  />
                </div>
              ) : (
                <label
                  htmlFor='avatar-upload'
                  className='absolute ml-auto mr-auto right-[calc(50%_-_50px)] z-50 w-[100px] h-[100px] cursor-pointer overflow-hidden rounded-full hover:bg-gray-200 hover:bg-opacity-50 group'
                >
                  <MdPhotoCamera
                    size={25}
                    className='text-gray-500 absolute rounded-full bottom-[35%] right-[37%] cursor-pointer hidden group-hover:block'
                  />
                </label>
              )}
            </div>

            <Form.Item
              name='firstName'
              label='First Name'
              rules={[
                {
                  required: true,
                  message: 'Please input your First Name!',
                },
                {
                  pattern: /^[^\s].*/,
                  message: 'First name cannot start with a whitespace',
                },
                {
                  pattern: /.*[^\s]$/,
                  message: 'First name cannot end with a whitespace',
                },
              ]}
            >
              <Input placeholder='Enter first name' />
            </Form.Item>

            <Form.Item
              name='lastName'
              label='Last Name'
              rules={[
                {
                  required: true,
                  message: 'Please input your Last Name!',
                },
                {
                  pattern: /^[^\s].*/,
                  message: 'Last name cannot start with a whitespace',
                },
                {
                  pattern: /.*[^\s]$/,
                  message: 'Last name cannot end with a whitespace',
                },
              ]}
            >
              <Input placeholder='Enter last name' />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button
                type='primary'
                htmlType='submit'
                disabled={loading}
                className='h-10 mt-5 w-full bg-[#2E2E38] hover:bg-[#121216] disabled:bg-white-F1cc  enabled:shadow-md enabled:shadow-purple-PinkLavender'
              >
                <span className='text-base'>Start !</span>
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
      <Footer className='' style={{ textAlign: 'center' }}>
        <p>
          © {new Date().getFullYear()} Winter Social Network,{' '}
          <span className='text-base font-semibold'>Ngô Hiếu</span>
        </p>
      </Footer>
    </Layout>
  );
};

export default FirstLogin;
