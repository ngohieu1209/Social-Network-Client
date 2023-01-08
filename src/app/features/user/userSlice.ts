import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInformation } from '../../../models';

interface UserState {
  loading: boolean;
  data: UserInformation;
  success: boolean;
  error: boolean;
}

const initialState: UserState = {
  loading: false,
  data: {
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    avatar: '',
    followers: 0,
    following: 0,
  },
  success: false,
  error: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserStart(state) {
      state.loading = true;
    },

    getUserSuccess(state, action: PayloadAction<{data: UserInformation}>) {
      state.loading = false;
      state.data = action.payload.data;
      state.success = true;
      state.error = false;
    },

    getUserFailed(state) {
      state.loading = false;
      state.success = false;
      state.error = true;
    },
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
