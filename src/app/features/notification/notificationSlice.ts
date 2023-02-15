import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INotification } from '../../../models';

interface NotificationState {
  loading: boolean;
  data: INotification[];
  success: boolean;
  error: boolean;
}

const initialState: NotificationState = {
  loading: false,
  data: [],
  success: false,
  error: false,
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    getNotificationsStart(state, action: PayloadAction<{ page: number }>) {
      state.loading = true;
    },
    getNotificationsSuccess(
      state,
      action: PayloadAction<{ data: INotification[] }>
    ) {
      state.loading = false;
      state.data = [...state.data, ...action.payload.data];
      state.success = true;
    },
    getNotificationsFailed(state) {
      state.loading = false;
      state.success = false;
      state.error = true;
    },
  },
});

export const notificationActions = notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;
