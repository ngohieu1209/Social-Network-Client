import { Avatar, Select } from 'antd';
import React, { useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { UserInformation } from '../models';
import userApi from '../services/api/userApi';

const SearchUsers = () => {
  const [users, setUsers] = useState<Partial<UserInformation>[]>([]);

  const navigate = useNavigate();

  const fetchUser = async (name: string) => {
    try {
      const data = await userApi.getUsersByName(name);
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (newValue: string) => {
    if (newValue && newValue.length > 0) {
      fetchUser(newValue);
    } else {
      setUsers([]);
    }
  };

  return (
    <Select
      showSearch
      value={null}
      className='w-1/2'
      placeholder='Search'
      defaultActiveFirstOption={false}
      onSearch={handleSearch}
      suffixIcon={<FaSearch />}
      options={(users || []).map((user) => ({
        value: user.firstName + ' ' + user.lastName,
        label: (
          <div className='flex items-center' onClick={() => navigate(`/${user.id}`)}>
            <Avatar
              size={24}
              icon={<AiOutlineUser size={22} />}
              src={user.avatar?.url}
            />
            <div className='flex flex-col ml-2'>
              <span className='font-semibold'>{`${user.firstName} ${user.lastName}`}</span>
              <span className='text-gray-500 text-sm'>
                {user.followers} followers
              </span>
            </div>
          </div>
        ),
      }))}
    />
  );
};

export default SearchUsers;
