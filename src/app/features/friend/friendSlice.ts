import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Friend } from '../../../models';

interface FriendState {
  loading: boolean;
  data: {
    listRequest: Friend[];
    listFriends: Friend[];
  };
  success: boolean;
  error: boolean;
}

const initialState: FriendState = {
  loading: false,
  data: {
    listRequest: [],
    listFriends: [],
  },
  success: false,
  error: false,
};

export const friendSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {
    getRequestFriendStart(state, action: PayloadAction<{ page: number }>) {
      state.loading = true;
    },

    getFriendsStart(state, action: PayloadAction<{ page: number }>) {
      state.loading = true;
    },

    getRequestFriendSuccess(state, action: PayloadAction<{ data: Friend[] }>) {
      state.loading = false;
      state.data.listRequest = [
        ...state.data.listRequest,
        ...action.payload.data,
      ];
      state.success = true;
      state.error = false;
    },

    getFriendsSuccess(state, action: PayloadAction<{ data: Friend[] }>) {
      state.loading = false;
      state.data.listFriends = [
        ...state.data.listFriends,
        ...action.payload.data,
      ];
      state.success = true;
      state.error = false;
    },

    getFriendFailed(state) {
      state.loading = false;
      state.success = false;
      state.error = true;
    },

    getFriendReset(state) {
      state.data.listRequest = [];
      state.data.listFriends = [];
    },

    deleteRequestFriend(state, action: PayloadAction<{ userId: string }>) {
      state.data.listRequest = state.data.listRequest.filter(
        (friend) => friend.user_send_request.id !== action.payload.userId
      );
    },

    deleteFriend(state, action: PayloadAction<{ friendId: string }>) {
      state.data.listFriends = state.data.listFriends.filter(
        (friend) => friend.id !== action.payload.friendId
      );
    },

    acceptFriend(state, action: PayloadAction<{ friend: Friend }>) {
      state.data.listRequest = state.data.listRequest.filter(
        (friend) => friend.id !== action.payload.friend.id
      );
      state.data.listFriends = [action.payload.friend, ...state.data.listFriends];
    },
  },
});

export const friendActions = friendSlice.actions;
export const friendReducer = friendSlice.reducer;
