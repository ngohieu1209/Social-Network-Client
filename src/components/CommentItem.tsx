import React, { useState } from 'react';
import { Avatar, Card, Dropdown, Input, MenuProps, Modal, Space } from 'antd';
import moment from 'moment';
import { useAppSelector } from '../app/hooks';
import { AppState } from '../app/store';
import { AiOutlineUser } from 'react-icons/ai';
import { socketService } from '../services/socket/socketService';
import { BiEditAlt } from 'react-icons/bi';
import { MdDeleteOutline } from 'react-icons/md';
import { FiMoreHorizontal } from 'react-icons/fi';
import { IComment } from '../models/comment';
import { openNotification } from '../utils';
import { AxiosError } from 'axios';

const { TextArea } = Input;
const { Meta } = Card;

type Props = {
  comment: IComment;
};

const CommentItem: React.FC<Props> = ({ comment }) => {
  const [value, setValue] = useState(comment.content);
  const [edit, setEdit] = useState({
    commentId: '',
    isEdit: false,
  });

  const currentUser = useAppSelector((state: AppState) => state.user.data);

  const handleKeyPressed = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      socketService.sendEditComment({
        id: comment.id,
        content: value,
        postId: comment.postId,
      });
      handleCancelEditComment();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancelEditComment();
      setValue(comment.content);
    }
  };

  const handleDeleteComment = async () => {
    try {
      socketService.sendDeleteComment({id: comment.id, postId: comment.postId});
    } catch (error) {
      const err = error as AxiosError;
      const data: any = err.response?.data;
      openNotification('error', 'Delete Post Failed!', data.message);
    }
  };

  const handleCancelEditComment = () => {
    setEdit({
      commentId: '',
      isEdit: false,
    });
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Edit',
      icon: <BiEditAlt size={15} className='group-hover:text-[#3ACF3F]' />,
      className: 'group',
      style: {
        fontWeight: 600,
        fontSize: 16,
      },
      onClick: () => {
        setEdit({
          commentId: comment.id,
          isEdit: true,
        });
      },
    },
    {
      key: '2',
      label: 'Remove',
      icon: (
        <MdDeleteOutline size={15} className='group-hover:text-[#FF101F]' />
      ),
      className: 'group',
      style: {
        fontWeight: 600,
        fontSize: 16,
      },
      onClick: () => {
        configWarning();
      },
    },
  ];

  const configWarning = () => {
    Modal.confirm({
      icon: <MdDeleteOutline size={28} className='text-[#FF101F] mr-2' />,
      title: <span>Are you sure delete this comment?</span>,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      closable: true,
      className: 'delete-confirm',
      onOk: handleDeleteComment,
    });
  };

  return (
    <div className='max-h-screen overflow-auto' key={comment.id}>
      <div className='grid grid-cols-8 mt-2'>
        <Avatar
          size={30}
          className='mr-3 ml-auto'
          icon={<AiOutlineUser size={28} />}
          src={comment.userId.avatar?.url}
        />
        <div className='col-start-2 col-end-9'>
          {edit.isEdit && edit.commentId === comment.id ? (
            <TextArea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder='Write a comment...'
              className='w-11/12 col-start-2 col-end-9'
              autoSize={{ minRows: 1, maxRows: 5 }}
              autoFocus
              spellCheck={false}
              onKeyDown={handleKeyPressed}
            />
          ) : (
            <div className='flex items-center group'>
              <Card
                style={{ marginTop: 0 }}
                size='small'
                loading={false}
                className='max-w-max bg-[#E0DFE2]'
              >
                <Meta
                  title={`${comment.userId.firstName} ${comment.userId.lastName}`}
                  description={comment.content}
                  className='max-w-max custom-meta-component'
                />
              </Card>
              <div className='mx-2 w-10'>
                {currentUser.id === comment.userId.id && (
                  <Dropdown
                    menu={{ items }}
                    trigger={['click']}
                    placement='bottomLeft'
                  >
                    <Space>
                      <FiMoreHorizontal
                        className='text-[#6E6E72] hover:text-[#3C3C3E] cursor-pointer hidden group-hover:block'
                        size={20}
                      />
                    </Space>
                  </Dropdown>
                )}
              </div>
            </div>
          )}

          <span className='text-gray-400 text-sm flex items-center my-1'>
            {edit.isEdit ? (
              <>Press Esc Cancel</>
            ) : (
              <>
                {moment(comment.createdAt).add(7, 'hours').fromNow()}
                {comment.updatedAt !== comment.createdAt && (
                  <span className='text-xs italic ml-2 mt-1'>
                    Edited:{' '}
                    {moment(comment.updatedAt).add(7, 'hours').calendar()}
                  </span>
                )}
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
