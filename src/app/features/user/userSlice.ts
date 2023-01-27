import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SocialLinks, UploadInformation, UserInformation } from '../../../models';

interface UserState {
  loading: boolean;
  data: UserInformation;
  success: boolean;
  error: boolean;
}

const initialState: UserState = {
  loading: false,
  data: {} as UserInformation,
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

    getUserSuccess(state, action: PayloadAction<{ data: UserInformation }>) {
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

    changeAvatar(state, action: PayloadAction<{ avatar: UploadInformation }>) {
      state.data.avatar = action.payload.avatar;
    },

    changeUserBasicInfo(
      state,
      action: PayloadAction<{
        key: keyof Pick<UserInformation, 'firstName' | 'lastName' | 'location' | 'bio'>;
        value: string | null;
      }>
    ) {
      state.data[`${action.payload.key}`] = action.payload.value;
    },

    changeSocialLinks(
      state,
      action: PayloadAction<{
        key: keyof Pick<SocialLinks, 'linkFacebook' | 'linkInstagram' | 'linkGithub'>;
        value: string | null;
      }>
    ) {
      if (state.data.links) {
        state.data.links[`${action.payload.key}`] = action.payload.value;
      } else {
        state.data.links = {
          linkFacebook: null,
          linkInstagram: null,
          linkGithub: null,
          [`${action.payload.key}`]: action.payload.value,
        };
      }
    },
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
