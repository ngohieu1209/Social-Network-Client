import { Button, Form, Input, Typography } from 'antd';
import { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import { AiOutlineInfoCircle } from 'react-icons/ai';
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

const ResetPassword = () => {
  const { token } = useParams();

  const [form] = Form.useForm();

  const handleSubmit = async (values: {password: string}) => {
    const { password } = values;
    try {
      if (token) {
        const { data } = await authApi.resetPassword(token, password);
        console.log(data)
        openNotification(
          'success',
          'Success',
          'Password successfully changed!'
        );
        form.resetFields();
      }
    } catch (error) {
      const err = error as AxiosError;
      const data: any = err.response?.data;
      openNotification('error', 'Failed', data?.message);
    }
  };

  return (
    <div className='bg-background bg-no-repeat bg-center bg-cover h-screen relative'>
      <div className='bg-white-default w-[35%] rounded-2xl flex flex-col content-center items-center absolute top-[20%] left-[50%] shadow-inner shadow-white-gainsboro'>
        <Typography.Title
          editable={false}
          level={1}
          style={{ margin: '50px 0 30px 0', textAlign: 'start' }}
          className='font-Acme-Regular'
        >
          Change Password
        </Typography.Title>
        <Form
          form={form}
          onFinish={handleSubmit}
          scrollToFirstError
          layout='vertical'
          className='w-[70%] label-form'
        >
          <Form.Item
            name='password'
            label='Password'
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                min: 8,
                pattern:
                  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                message: 'Invalid Password!',
              },
            ]}
            tooltip={{
              title:
                'Your password must be at least 8 characters including a lowercase letter, an uppercase letter, a number and a special character',
              icon: <AiOutlineInfoCircle />,
            }}
            hasFeedback
          >
            <Input.Password name='password' placeholder='Password' />
          </Form.Item>

          <Form.Item
            name='confirmPassword'
            label='Confirm Password'
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!'
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password
              name='confirmPassword'
              placeholder='Confirm Password'
            />
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button
              type='primary'
              htmlType='submit'
              className='h-10 w-full my-5 bg-purple-FrenchMauve hover:bg-purple-Purpureus shadow-md shadow-purple-PinkLavender'
            >
              <span className='text-base'>Change Password</span>
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;