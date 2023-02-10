import { Avatar, Badge, Dropdown, Layout, MenuProps, Select, Space } from 'antd';
import { FaSearch, FaHome, FaUserFriends } from 'react-icons/fa';
import { IoMdNotifications } from 'react-icons/io';
import { AiFillMessage, AiOutlineCaretDown, AiOutlineUser } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { AppState } from '../../app/store';
import authApi from '../../services/api/authApi';

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
    }
  },
];

const HeaderComponent = () => {

  const user = useAppSelector((state: AppState) => state.user.data);

  const navigate = useNavigate();

  return (
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
          <img
            src={logo}
            alt='logo'
            className='w-56 h-16 mt-[5px] cursor-pointer'
            onClick={() => navigate('/')}
          />
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
          <div className='flex items-center font-bold cursor-pointer'>
            <Badge count={9} size='small' className='mr-3'>
              <IoMdNotifications size={20} />
            </Badge>
            <span className='text-xl'>Notification</span>
          </div>
          <div className='flex items-center font-bold cursor-pointer'>
            <Badge count={9} size='small' className='mr-3'>
              <AiFillMessage size={20} />
            </Badge>
            <span className='text-xl'>Message</span>
          </div>
          <div className='flex items-center font-bold'>
            <div className='flex items-center cursor-pointer' onClick={() => navigate(`/${user.id}`)}>
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
    </Header>
  );
};

export default HeaderComponent;