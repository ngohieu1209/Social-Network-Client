import { notificationActions } from '../../../app/features/notification/notificationSlice';
import { store } from '../../../app/store';
import { onDataToServer } from '../../../models/events';

const notificationHandler = {
  // on: newNotification
  updateNotification: (data: onDataToServer<any>) => {
    const user = store.getState().user.data;
    if (data.ACTION === 'newNotification' && data.PAYLOAD && data.PAYLOAD.recipient === user.id) {
      store.dispatch(
        notificationActions.addNewNotification({ data: data.PAYLOAD })
      );
    }
  },

  // on: seenNotification
  seenNotification: (data: onDataToServer<any>) => {
    if (data.ACTION === 'seenNotification') {
      store.dispatch(
        notificationActions.seenNotification({ id: data.PAYLOAD.id })
      );
    }
  },
};

export default notificationHandler;
