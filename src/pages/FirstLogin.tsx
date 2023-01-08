import React from 'react';
import { Button, Form, Input, Typography, Layout, Avatar } from 'antd';
import { AxiosError } from 'axios';
import { Link } from 'react-router-dom';
import authApi from '../api/authApi';
import { Signin as SigninDto } from '../models';
import { openNotification } from '../utils';
import { useAppDispatch } from '../app/hooks';
import { authActions } from '../app/features/auth/authSlice';
import { AiOutlineUser } from 'react-icons/ai';
import { MdPhotoCamera } from 'react-icons/md';

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

const { Header, Content, Footer } = Layout;
const logo = require('../assets/logo.png')

const FirstLogin = () => {

  const dispatch = useAppDispatch();

  const [form] = Form.useForm();

  const handleSubmit = async (values: SigninDto) => {
    // const { email, password } = values;
    // try {
    //   await authApi.signIn({
    //     email: email.toLowerCase().trim(),
    //     password,
    //   });
    //   dispatch(authActions.loginStart());
    //   openNotification(
    //     'success',
    //     'Sign In Successfully',
    //     'You have successfully signed in'
    //   );
    //   form.resetFields();
    // } catch (error) {
    //   const err = error as AxiosError;
    //   const data: any = err.response?.data;
    //   openNotification('error', 'Sign In Failed', data?.message);
    // }
  };


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
        <div>
          <img
            src={logo}
            alt='logo'
            className='w-56 h-16 mt-[5px] ml-auto mr-auto'
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
              <Avatar size={100} icon={<AiOutlineUser size={100} />} />
              <input type='file' name='avatar' id='avatar' style={{display: 'none'}} hidden />
              <label
                htmlFor='avatar'
                className='absolute ml-auto mr-auto right-[calc(50%_-_50px)] z-50 w-[100px] h-[100px] cursor-pointer overflow-hidden rounded-full hover:bg-gray-200 hover:bg-opacity-50 group'
              >
                <MdPhotoCamera
                  size={30}
                  className='text-gray-500 absolute rounded-full bottom-[35%] right-[35%] cursor-pointer hidden group-hover:block'
                />
              </label>
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
