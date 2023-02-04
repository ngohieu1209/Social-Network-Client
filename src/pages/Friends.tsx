import { Layout } from 'antd';
import React from 'react';
import { FooterComponent, HeaderComponent, ListFriends, SiderLeft, SiderRight } from '../components';

const Friends = () => {
  return (
    <Layout>
      <HeaderComponent />
      <Layout className='site-layout'>
        <SiderLeft />
        <ListFriends />
        <SiderRight />
      </Layout>
      <FooterComponent />
    </Layout>
  );
};

export default Friends;