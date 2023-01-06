import { Badge, Layout, Select } from 'antd';
import { FaSearch, FaHome, FaUserFriends, FaUserAstronaut } from 'react-icons/fa';
import { IoMdNotifications } from 'react-icons/io';
import { AiFillMessage } from 'react-icons/ai';

const logo = require('../assets/logo.png');

const { Header } = Layout;

const HeaderComponent = () => {
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
  );
};

export default HeaderComponent;
