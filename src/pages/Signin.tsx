import { Button, Form, Input, Typography } from 'antd';
import { AxiosError } from 'axios';
import { Link } from 'react-router-dom';
import authApi from '../api/authApi';
import { Signin as SigninDto } from '../models';
import { openNotification } from '../utils';
import { useAppDispatch } from '../app/hooks'
import { authActions } from '../app/features/auth/authSlice';

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

const Signin = () => {

  const dispatch = useAppDispatch();

  const [form] = Form.useForm();

  const handleSubmit = async (values: SigninDto) => {
    const { email, password } = values;
    try {
      await authApi.signIn({
        email: email.toLowerCase().trim(),
        password,
      });
      dispatch(authActions.loginStart());
      openNotification(
        'success',
        'Sign In Successfully',
        'You have successfully signed in'
      );
      form.resetFields();
    } catch (error) {
      const err = error as AxiosError;
      const data: any = err.response?.data;
      openNotification('error', 'Sign In Failed', data?.message);
    }
  };

  return (
    <div className='bg-background bg-no-repeat bg-center bg-cover h-screen relative'>
      <div className='bg-white-default w-[35%] rounded-2xl flex flex-col content-center items-center absolute top-[20%] left-[50%] shadow-inner shadow-white-gainsboro'>
        <Typography.Title
          editable={false}
          level={1}
          style={{ margin: '50px 0 10px 0', textAlign: 'start' }}
          className='font-Acme-Regular'
        >
          Sign In
        </Typography.Title>
        <p className='mb-2'>
          Don't have an account?{' '}
          <Link to='/signup' className='text-blue-600 font-semibold'>
            Sign up
          </Link>
        </p>
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

          <Form.Item
            name='password'
            label='Password'
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password placeholder='Password' />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button
              type='primary'
              htmlType='submit'
              className='h-10 mt-5 w-full bg-purple-FrenchMauve hover:bg-purple-Purpureus disabled:bg-white-F1cc  enabled:shadow-md enabled:shadow-purple-PinkLavender'
            >
              <span className='text-base'>Sign In</span>
            </Button>
          </Form.Item>
          <div className='mb-5'>
            <Typography.Text editable={false} style={{ fontWeight: '600' }}>
              <Link to='/forgotPassword'>Forgot your password?</Link>
            </Typography.Text>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Signin;
