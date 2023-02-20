import {
  Affix,
  Avatar,
  Badge,
  Dropdown,
  Layout,
  MenuProps,
  Space,
} from 'antd';
import Notification from '../Notification';
import { FaHome, FaUserFriends } from 'react-icons/fa';
import { IoMdNotifications } from 'react-icons/io';
import { AiOutlineCaretDown, AiOutlineUser } from 'react-icons/ai';
import { BiLogOut, BiMessage } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { AppState } from '../../app/store';
import authApi from '../../services/api/authApi';
import { useState } from 'react';
import SearchUsers from '../SearchUsers';

const logo = require('../../assets/logo.png');

const { Header } = Layout;

const items: MenuProps['items'] = [
  {
    key: '1',
    label: 'Sign out',
    icon: <BiLogOut />,
    style: {
      fontWeight: 600,
      fontSize: 16,
    },
    onClick: async () => {
      await authApi.signOut();
    },
  },
];

const HeaderComponent = () => {
  const [openNotification, setOpenNotification] = useState(false);
  const user = useAppSelector((state: AppState) => state.user.data);
  const notification = useAppSelector((state: AppState) => state.notification.data);
  const countNotification = notification.filter((item) => item.seen === 0).length;
  const navigate = useNavigate();

  return (
    <>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          width: '100%',
          height: '75px',
        }}
        className='bg-white-default rounded-b-xl shadow-md shadow-white-gainsboro'
      >
        <div className='flex justify-between'>
          <div className='flex items-center justify-evenly w-1/2'>
            <img
              src={logo}
              alt='logo'
              className='w-56 h-16 mt-[5px] cursor-pointer'
              onClick={() => navigate('/')}
            />
            <SearchUsers />
          </div>
          <div className='flex justify-between w-1/2'>
            <div className='flex justify-between w-1/3'>
              <div
                className='flex items-center font-bold cursor-pointer'
                onClick={() => navigate('/')}
              >
                <FaHome className='mr-1' size={20} />
                <span className='text-xl'>Homepage</span>
              </div>
              <div
                className='flex items-center font-bold cursor-pointer'
                onClick={() => navigate('/friends')}
              >
                <FaUserFriends size={20} className='mr-1' />
                <span className='text-xl'>Friends</span>
              </div>
            </div>
            <div className='flex justify-evenly w-1/3'>
              <div className='flex items-center font-bold'>
                <Badge count={countNotification}>
                  <Avatar
                    shape='circle'
                    icon={
                      <IoMdNotifications
                        size={20}
                        className='absolute top-[5px] left-[5px] text-black'
                      />
                    }
                    draggable={false}
                    className='bg-[#E0E0E0] hover:bg-[#C2C2C2] cursor-pointer'
                    onClick={() => setOpenNotification(!openNotification)}
                  />
                </Badge>
              </div>
              {/* <div className='flex items-center font-bold cursor-pointer'>
                <Badge count={9}>
                  <Avatar
                    shape='circle'
                    icon={
                      <BiMessage
                        size={20}
                        className='absolute top-[5px] left-[5px] text-black'
                      />
                    }
                    draggable={false}
                    className='bg-[#E0E0E0] hover:bg-[#C2C2C2] cursor-pointer'
                  />
                </Badge>
              </div> */}
              <div className='flex items-center font-bold'>
                <div
                  className='flex items-center cursor-pointer'
                  onClick={() => navigate(`/${user.id}`)}
                >
                  <Avatar
                    size={30}
                    className='mr-1'
                    icon={<AiOutlineUser size={28} />}
                    src={user.avatar?.url}
                  />
                  <span className='text-xl'>{user.lastName}</span>
                </div>
                <Dropdown
                  menu={{ items }}
                  trigger={['click']}
                  placement='bottom'
                  className='mt-1 ml-2 cursor-pointer'
                >
                  <Space>
                    <AiOutlineCaretDown size={20} />
                  </Space>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </Header>
      <Affix
        offsetTop={80}
        style={{ position: 'absolute', right: 60 }}
        className={`z-30 ${openNotification ? '' : 'hidden'}`}
      >
        <Notification />
      </Affix>
    </>
  );
};

export default HeaderComponent;
