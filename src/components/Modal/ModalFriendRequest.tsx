import { Avatar, Modal, Skeleton } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineCloseCircle,
  AiOutlineUser,
} from 'react-icons/ai';
import friendApi from '../../services/api/friendApi';
import { friendActions } from '../../app/features/friend/friendSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AppState } from '../../app/store';
import { Friend } from '../../models';

let timer: NodeJS.Timeout | null = null;

type Props = {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
};

const ModalFriendRequest: React.FC<Props> = ({ open, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [newRequest, setNewRequest] = useState(false);

  const dispatch = useAppDispatch();
  const userSuccess = useAppSelector((state: AppState) => state.user.success);
  const listFriendRequest = useAppSelector(
    (state: AppState) => state.friend.data.listRequest
  );
  const mounted = useRef(false);
  const divScroll = useRef<HTMLDivElement>(null);

  const handleCancelModal = () => {
    setPage(1);
    setNewRequest(false);
    onCancel();
  }

  const debounce = (cb: Function, delay: number) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      cb();
    }, delay);
  };

  const fetchListRequest = async () => {
    setLoading(true);
    try {
      dispatch(friendActions.getRequestFriendStart({ page }));
      setNewRequest(false);
      debounce(() => setLoading(false), 2000);
    } catch (error) {
      console.log(error);
      setNewRequest(false);
      debounce(() => setLoading(false), 2000);
    }
  };

  useEffect(() => {
    if (userSuccess) {
      fetchListRequest();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (!newRequest) return;
    if (loading) return;
    setPage((oldPage) => oldPage + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newRequest]);

  const handleAccept = async (friend: Friend) => {
    try {
      if(!friend.user_send_request.id) return;
      const data = await friendApi.acceptFriend(friend.user_send_request.id);
      console.log(data);
      dispatch(friendActions.acceptFriend({friend}))
      dispatch(friendActions.deleteRequestFriend({ userId: friend.user_send_request.id }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (userId: string) => {
    try {
      const data = await friendApi.deleteFriend(userId);
      console.log(data);
      dispatch(friendActions.deleteRequestFriend({ userId }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleScroll = () => {
    let element = divScroll.current;
    if(element) {
      if (element.scrollTop + element.clientHeight >= element.scrollHeight) {
        setNewRequest(true);
      }
    }
  };

  return (
    <>
      <Modal
        title='Friend Request'
        maskClosable={false}
        footer={null}
        closeIcon={<AiOutlineCloseCircle size={22} />}
        open={open}
        onCancel={handleCancelModal}
        width={'25%'}
        className='ant-modal-header:text-center ant-modal-title:text-2xl ant-modal-footer-btn:w-full ant-modal-footer-btn:m-0 ant-modal-footer-btn:bg-purple-FrenchMauve ant-modal-footer-btn-hover:bg-purple-Purpureus ant-modal-footer-btn:h-10'
      >
        <div
          className='h-[60vh] overflow-auto'
          ref={divScroll}
          onScroll={handleScroll}
        >
          {listFriendRequest.map((friend) => {
            const { user_send_request } = friend;
            return (
              <div
                className='flex items-center justify-between mx-5 py-4'
                key={friend.id}
              >
                <div className='flex'>
                  <Avatar
                    size={48}
                    icon={<AiOutlineUser size={46} />}
                    src={user_send_request.avatar?.url}
                  />
                  <div className='flex flex-col ml-2'>
                    <span className='font-semibold'>{`${user_send_request.firstName} ${user_send_request.lastName}`}</span>
                    <span className='text-gray-500 text-sm'>
                      {user_send_request.location}
                    </span>
                  </div>
                </div>
                <div className='flex items-center'>
                  <AiOutlineCheck
                    size={20}
                    className='mr-2 text-green-neon hover:scale-125 cursor-pointer'
                    onClick={() => handleAccept(friend)}
                  />
                  <AiOutlineClose
                    size={20}
                    className='text-red-neon hover:scale-125 cursor-pointer'
                    onClick={() => handleDelete(user_send_request.id || '')}
                  />
                </div>
              </div>
            );
          })}
          {loading && (
            <div className='mx-5 pt-4'>
              <Skeleton active={true} avatar paragraph={{ rows: 0 }} />
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default ModalFriendRequest;
