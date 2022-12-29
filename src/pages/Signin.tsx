import { Button, Form, Input, Typography } from 'antd';
import { Link } from 'react-router-dom';

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
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
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
          onFinish={onFinish}
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
            <Input />
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
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button
              type='primary'
              htmlType='submit'
              disabled={false}
              className='h-10 mt-5 w-full bg-purple-FrenchMauve hover:bg-purple-Purpureus disabled:bg-white-F1cc  enabled:shadow-md enabled:shadow-purple-PinkLavender'
            >
              <span className='text-base'>Sign In</span>
            </Button>
          </Form.Item>
          <div className='mb-5'>
            <Typography.Text
              editable={false}
              style={{ fontWeight: '600'}}
              >
              <Link to='/forgotPassword'>Forgot your password?</Link>
            </Typography.Text>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Signin;
