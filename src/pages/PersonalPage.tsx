import { Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import userApi from '../api/userApi';
import { useAppSelector } from '../app/hooks';
import { AppState } from '../app/store';
import { FooterComponent, HeaderComponent, Personal, SiderLeft, SiderLeftPersonal } from '../components';
import { UserInformation } from '../models';

const { Sider } = Layout;

const PersonalPage = () => {

  const [user, setUser] = useState<UserInformation | null>(null);

  const currentUser = useAppSelector((state: AppState) => state.user.data);
  const { userId } = useParams();

  const fetchUser = async () => {
    try {
      if (userId) {
        const data = await userApi.getUserById(userId);
        setUser(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(currentUser.id !== userId) {
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, currentUser.id])
  return (
    <Layout>
      <HeaderComponent />
      <Layout className='site-layout'>
        {currentUser.id === userId ? <SiderLeft /> : <SiderLeftPersonal user={user} />}
        <Personal userId={userId} />
        <Sider className='bg-white-F1cc basis-2/6 max-w-lg h-screen' />
      </Layout>
      <FooterComponent />
    </Layout>
  );
};

export default PersonalPage;