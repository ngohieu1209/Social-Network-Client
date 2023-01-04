import React from 'react';
import { Button, Form, Input, Typography } from 'antd';
import { AxiosError } from 'axios';
import authApi from '../api/authApi';
import { openNotification } from '../utils';

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

const ForgotPassword = () => {
  
  const [form] = Form.useForm();

  const handleSubmit = async (values: {email: string}) => {
    const { email } = values;
    try {
      await authApi.forgotPassword(email);
      openNotification(
        'success',
        'Verify Email Successfully',
        'Please check your email to reset password!'
      );
      form.resetFields();
    } catch (error) {
      const err = error as AxiosError;
      const data: any = err.response?.data;
      openNotification('error', 'Verify Email Failed', data?.message);
    }
  };

  return (
    <div className='bg-background bg-no-repeat bg-center bg-cover h-screen relative'>
      <div className='bg-white-default w-[35%] rounded-2xl flex flex-col content-center items-center absolute top-[30%] left-[50%] shadow-inner shadow-white-gainsboro'>
        <Typography.Title
          editable={false}
          level={1}
          style={{ margin: '50px 0 30px 0', textAlign: 'start' }}
          className='font-Acme-Regular'
        >
          Forgot Password
        </Typography.Title>
        <Form
          form={form}
          onFinish={handleSubmit}
          scrollToFirstError
          layout='vertical'
          className='w-[70%] label-form'
        >
          <Form.Item
            name='email'
            label='Email Address'
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input placeholder='Enter email address' />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button
              type='primary'
              htmlType='submit'
              className='h-10 w-full bg-purple-FrenchMauve hover:bg-purple-Purpureus shadow-md shadow-purple-PinkLavender'
            >
              <span className='text-base'>Verify your email</span>
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;