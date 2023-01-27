import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Result, Typography } from 'antd';
import { AxiosError } from 'axios';
import authApi from '../api/authApi';

const ActivationEmail = () => {
  const [err, setErr] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const { activateToken } = useParams();
  const navigate = useNavigate();

  console.log(activateToken);

  useEffect(() => {
    if (activateToken) {
      const activationEmail = async () => {
        try {
          const { data } = await authApi.activationEmail(activateToken);
          setSuccess(data.msg);
          setErr(''); 
        } catch (error) {
          const err = error as AxiosError;
          const data: any = err.response?.data;
          setSuccess('');
          data?.message && setErr(data?.message);
        }
      }
      activationEmail();
    }
  }, [activateToken])

  return (
    <div className='bg-background bg-no-repeat bg-center bg-cover h-screen relative'>
      <div className='bg-white-default w-[35%] rounded-2xl flex flex-col content-center items-center absolute top-[20%] left-[50%] shadow-inner shadow-white-gainsboro'>
        <Typography.Title
          editable={false}
          level={1}
          style={{ margin: '50px 0 0 0', textAlign: 'start' }}
          className='font-Acme-Regular'
        >
          Activation Email
        </Typography.Title>
        {success && (
          <Result
            status='success'
            title={`${success}`}
            extra={[
              <Button
                className='text-white-default border-none h-10 w-full bg-purple-FrenchMauve hover:bg-purple-Purpureus shadow-md shadow-purple-PinkLavender'
                onClick={() => navigate('/signin')}
              >
                <span className='text-base'>Sign In</span>
              </Button>,
            ]}
          />
        )}
        {err && (
          <Result
            status='error'
            title={`${err}`}
            extra={[
              <Button
                className='text-white-default border-none h-10 w-full bg-purple-FrenchMauve hover:bg-purple-Purpureus shadow-md shadow-purple-PinkLavender'
                onClick={() => navigate('/signup')}
              >
                <span className='text-base'>Sign Up</span>
              </Button>,
            ]}
          />
        )}
      </div>
    </div>
  );
};

export default ActivationEmail;