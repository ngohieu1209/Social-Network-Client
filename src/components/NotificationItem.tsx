import { Avatar } from 'antd';
import moment from 'moment';
import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { BsDot } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { INotification } from '../models';
import { socketService } from '../services/socket/socketService';

type Props = {
  notification: INotification;
};


const NotificationItem: React.FC<Props> = ({ notification }) => {
  const { action, createdAt, id, sender, seen, recipient } = notification;
  const navigate = useNavigate();
  
  const handleNotificationClick = () => {
    socketService.sendSeenNotification(id);
    navigate(`/${recipient}`);
  }

  return (
    <div className='mt-4 grid grid-cols-10 items-center pr-0 cursor-pointer'
      onClick={handleNotificationClick}
    >
      <Avatar
        size={52}
        icon={<AiOutlineUser size={50} />}
        src={sender.avatar?.url}
      />
      <div className='col-start-3 col-end-11 flex items-center justify-between'>
        <h3>
          <span className='font-semibold'>{`${sender.firstName} ${sender.lastName}`}</span> {action} on your
          post
        </h3>
        {seen === 0 && <BsDot size={56} className='text-[#0083E0]' />}
      </div>
      <span
        className={`
        ${seen === 0 ? 'text-[#0083E0]' : 'text-gray-400'} 
        text-sm col-start-3 col-span-3`}
      >
        {moment(createdAt).fromNow()}
      </span>
    </div>
  );
};

export default NotificationItem;