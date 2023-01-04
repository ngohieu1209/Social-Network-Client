import { Avatar, Badge, Button, Layout, Select } from 'antd';
import React from 'react';
import {
  FaSearch,
  FaHome,
  FaUserFriends,
  FaUserAstronaut,
} from 'react-icons/fa';
import { IoMdNotifications } from 'react-icons/io';
import { AiFillMessage, AiOutlineHeart, AiOutlineEye, AiOutlineInstagram } from 'react-icons/ai';
import { BsFacebook } from 'react-icons/bs';

const logo = require('../assets/logo.png');

const { Header, Content, Footer, Sider } = Layout;

const HomePage = () => {
  return (
    <Layout>
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
        <div className='flex justify-between'>
          <div className='flex items-center justify-evenly w-1/2'>
            <img src={logo} alt='logo' className='w-56 h-16 mt-[5px]' />
            <Select
              showSearch
              value={null}
              className='w-1/2'
              placeholder='Search'
              optionFilterProp='children'
              onChange={(value) => console.log(value)}
              suffixIcon={<FaSearch />}
              onSearch={(value) => console.log(value)}
              filterOption={(input, option) =>
                (option?.label ?? '').includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '')
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? '').toLowerCase())
              }
              options={[
                {
                  value: '1',
                  label: 'Not Identified',
                },
              ]}
            />
          </div>
          <div className='flex justify-evenly w-1/2'>
            <div className='flex items-center font-bold'>
              <FaHome className='mr-1' size={20} />
              <span className='text-xl'>Homepage</span>
            </div>
            <div className='flex items-center font-bold'>
              <FaUserFriends size={20} className='mr-1' />
              <span className='text-xl'>Friends</span>
            </div>
            <div className='flex items-center font-bold'>
              <Badge count={9} size='small' className='mr-3'>
                <IoMdNotifications size={20} />
              </Badge>
              <span className='text-xl'>Notification</span>
            </div>
            <div className='flex items-center font-bold'>
              <Badge count={9} size='small' className='mr-3'>
                <AiFillMessage size={20} />
              </Badge>
              <span className='text-xl'>Message</span>
            </div>
            <div className='flex items-center font-bold'>
              <FaUserAstronaut size={20} className='mr-1' />
              <span className='text-xl'>Profile</span>
            </div>
          </div>
        </div>
      </Header>
      <Layout className='site-layout'>
        <Sider className='bg-white-F1cc basis-2/6 max-w-xs'>
          <div className='bg-white-default mt-6 mr-6 ml-10 mb-6 rounded-xl shadow-inner shadow-white-gainsboro'>
            <div className='flex ml-5 pt-4'>
              <Avatar
                size={56}
                src='https://i.pinimg.com/550x/3c/61/48/3c6148580a9d33efb242b5c369d0a5be.jpg'
              />
              <div className='flex flex-col ml-2'>
                <span className='font-semibold'>Ngo Trung Hieu</span>
                <span className='text-gray-500'>Ha Noi</span>
              </div>
            </div>

            <hr className='mx-5 my-3 h-px bg-gray-200 dark:bg-gray-700' />

            <div className='ml-5 mb-1 flex items-center'>
              <AiOutlineHeart className='text-pink-500' size={20} />
              <span className='mx-2'>10K</span>
              <span className='text-gray-500'>Follows</span>
            </div>
            <div className='ml-5 mb-2 flex items-center'>
              <AiOutlineEye className='text-blue-500' size={20} />
              <span className='mx-2'>10</span>
              <span className='text-gray-500'>Following</span>
            </div>
            <div className='mx-5 text-gray-600 text-left text-sm'>
              <span>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout
              </span>
            </div>
            <hr className='mx-5 my-3 h-px bg-gray-200 dark:bg-gray-700' />
            <div className='ml-5'>
              <span className='font-semibold text-gray-500'>MY PAGES</span>
              <div className='flex mt-2'>
                <AiOutlineInstagram className='text-white-F1 text-2xl instagram' />
                <span className='ml-2'>Link instagram</span>
              </div>
              <div className='flex mt-2'>
                <BsFacebook className='text-blue-500 text-2xl' />
                <span className='ml-2'>Link facebook</span>
              </div>
            </div>
            <div className='mt-4 pb-4 text-center'>
              <Button className='w-5/6 font-semibold text-gray-500 hover:text-grey-darkLight hover:border-grey-darkLight hover:shadow-lg'>
                Edit
              </Button>
            </div>
          </div>
        </Sider>
        <Content style={{ padding: '0 50px' }} className='bg-purple-500'>
          Taeyeon
        </Content>
        <Sider className='bg-blue-500'>Jisoo</Sider>
      </Layout>
      <Footer className='bg-pink-500' style={{ textAlign: 'center' }}>
        Footer
      </Footer>
    </Layout>
  );
};

export default HomePage;