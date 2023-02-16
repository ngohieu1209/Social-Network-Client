import { useAppDispatch, useAppSelector } from '../app/hooks';
import { AppState } from '../app/store';
import { useEffect, useRef, useState } from 'react';
import { notificationActions } from '../app/features/notification/notificationSlice';
import { FiMoreHorizontal } from 'react-icons/fi';
import NotificationItem from './NotificationItem';
import { socketService } from '../services/socket/socketService';

let timer: NodeJS.Timeout | null = null;

const Notification = () => {
  const [loading, setLoading] = useState(false);
  const [newNotifications, setNewNotifications] = useState(false);
  const [page, setPage] = useState(1);
  const mounted = useRef(false);
  const divScroll = useRef<HTMLDivElement>(null);

  const user = useAppSelector((state: AppState) => state.user.data);
  const userSuccess = useAppSelector((state: AppState) => state.user.success);
  const notifications = useAppSelector(
    (state: AppState) => state.notification.data
  );
  const dispatch = useAppDispatch();

  const debounce = (cb: Function, delay: number) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      cb();
    }, delay);
  };

  const fetchNotification = async () => {
    setLoading(true);
    try {
      dispatch(notificationActions.getNotificationsStart({ page }));
      setNewNotifications(false);
      debounce(() => setLoading(false), 2000);
    } catch (error) {
      console.log(error);
      setNewNotifications(false);
      debounce(() => setLoading(false), 2000);
    }
  };

  useEffect(() => {
    if (userSuccess) {
      fetchNotification();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    if (userSuccess) {
      socketService.updateNotification((data: any) => {
        if (
          data.ACTION === 'newNotification' &&
          data.PAYLOAD.recipient === user.id
        ) {
          dispatch(
            notificationActions.addNewNotification({ data: data.PAYLOAD })
          );
        }
      });
      socketService.seenNotification((data: any) => {
        if (data.ACTION === 'seenNotification') {
          dispatch(notificationActions.seenNotification({ id: data.PAYLOAD.id }));
        }
      });
      return () => {
        dispatch(notificationActions.resetNotification());
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (!newNotifications) return;
    if (loading) return;
    setPage((oldPage) => oldPage + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newNotifications]);

  const handleScroll = () => {
    let element = divScroll.current;
    if (element) {
      if (element.scrollTop + element.clientHeight >= element.scrollHeight) {
        setNewNotifications(true);
      }
    }
  };
  return (
    <div
      className='h-[76vh] w-[50vh] bg-white-default rounded-xl shadow-xl shadow-white-gainsboro overflow-auto'
      ref={divScroll}
      onScroll={handleScroll}
    >
      <div className='py-4 pl-4'>
        <div className='flex items-center justify-between mb-8'>
          <h1 className='text-xl font-semibold'>Notifications</h1>
          <FiMoreHorizontal
            className='text-[#6E6E72] hover:text-[#3C3C3E] cursor-pointer mr-4'
            size={24}
          />
        </div>
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  );
};

export default Notification;
