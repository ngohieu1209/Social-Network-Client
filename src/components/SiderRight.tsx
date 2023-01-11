import { Avatar, Button, Layout } from 'antd';
import { FaHandshake, FaBirthdayCake } from 'react-icons/fa';

const { Sider } = Layout;

const SiderRight = () => {
  return (
    <Sider
      className='bg-white-F1cc basis-2/6 max-w-lg'
      style={{
        overflow: 'auto',
        height: '100vh',
        top: 0,
        right: 0,
      }}
    >
      <div className='w-1/5 fixed right-20'>
        <div className='bg-white-default mt-9 mb-6 rounded-xl shadow-md shadow-white-gainsboro'>
          <div className='flex items-center justify-center pt-4'>
            <FaHandshake className='mr-2 text-green-600' size={23} />
            <span className='font-semibold'>FRIEND REQUEST</span>
          </div>

          <hr className='mx-5 my-3 h-px bg-gray-200 dark:bg-gray-700' />

          <div className='flex ml-5 pt-4'>
            <Avatar
              size={48}
              src='https://i.pinimg.com/550x/3c/61/48/3c6148580a9d33efb242b5c369d0a5be.jpg'
            />
            <div className='flex flex-col ml-2'>
              <span className='font-semibold'>Ngo Trung Hieu</span>
              <span className='text-gray-500 text-sm'>Ha Noi</span>
            </div>
          </div>

          <div className='flex ml-5 pt-4'>
            <Avatar
              size={48}
              src='https://i.pinimg.com/550x/3c/61/48/3c6148580a9d33efb242b5c369d0a5be.jpg'
            />
            <div className='flex flex-col ml-2'>
              <span className='font-semibold'>Ngo Trung Hieu</span>
              <span className='text-gray-500 text-sm'>Ha Noi</span>
            </div>
          </div>

          <div className='mt-4 pb-4 text-center'>
            <Button className='w-5/6 font-semibold text-gray-500 hover:text-grey-darkLight hover:border-grey-darkLight hover:shadow-lg'>
              View All
            </Button>
          </div>
        </div>

        {/* Happy birthday */}

        <div className='bg-white-default mt-6 mb-6 rounded-xl shadow-md shadow-white-gainsboro'>
          <div className='flex items-center justify-center pt-4'>
            <FaBirthdayCake className='mr-2 text-yellow-600' size={23} />
            <span className='font-semibold'>BIRTHDAY</span>
          </div>

          <hr className='mx-5 my-3 h-px bg-gray-200 dark:bg-gray-700' />

          <div className='flex ml-5 pt-4'>
            <Avatar
              size={48}
              src='https://i.pinimg.com/550x/3c/61/48/3c6148580a9d33efb242b5c369d0a5be.jpg'
            />
            <div className='flex flex-col ml-2'>
              <span className='font-semibold'>Ngo Trung Hieu</span>
              <span className='text-gray-500 text-sm'>Ha Noi</span>
            </div>
          </div>

          <div className='flex ml-5 pt-4'>
            <Avatar
              size={48}
              src='https://i.pinimg.com/550x/3c/61/48/3c6148580a9d33efb242b5c369d0a5be.jpg'
            />
            <div className='flex flex-col ml-2'>
              <span className='font-semibold'>Ngo Trung Hieu</span>
              <span className='text-gray-500 text-sm'>Ha Noi</span>
            </div>
          </div>

          <div className='mt-4 pb-4 text-center'>
            <Button className='w-5/6 font-semibold text-gray-500 hover:text-grey-darkLight hover:border-grey-darkLight hover:shadow-lg'>
              View All
            </Button>
          </div>
        </div>
      </div>
    </Sider>
  );
};

export default SiderRight;
