import { Avatar } from 'antd';
import moment from 'moment';
import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { BsDot } from 'react-icons/bs';
import { INotification } from '../models';

type Props = {
  notification: INotification;
};


const NotificationItem: React.FC<Props> = ({ notification }) => {
  const { action, createdAt, postId, id, sender, seen} = notification;
  return (
    <div className='mt-4 grid grid-cols-10 items-center pr-0'>
      <Avatar
        size={52}
        icon={<AiOutlineUser size={50} />}
        src={sender.avatar?.url}
      />
      <div className='col-start-3 col-end-11 flex items-center justify-between'>
        <h3>
          <p>{`${sender.firstName} ${sender.lastName}`}</p> commented on your
          post
        </h3>
        {seen === 0 && <BsDot size={56} className='text-[#0083E0]' />}
      </div>
      <span
        className={`
        ${seen === 0 ? 'text-[#0083E0]' : 'text-gray-400'} 
        text-sm col-start-3 col-span-3`}
      >
        {moment(notification.createdAt).fromNow()}
      </span>
    </div>
  );
};

export default NotificationItem;