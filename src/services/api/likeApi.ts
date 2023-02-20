import { openNotification } from './../../utils/notification';
import axiosJWT from '../../interceptors/axios';

const likeApi = {
  likePost: async (postId: string) => {
    try {
      const { data } = await axiosJWT.post('/like', { postId });
      return data;
    } catch (error) {
      openNotification('error', 'Like Post Failed!', 'Content Not Available Anymore');
    }
  },

  getUserLikePost: async (postId: string) => { 
    try {
      const { data } = await axiosJWT.get(`/like/post/${postId}`);
      return data;
    } catch (error) {
      openNotification('error', 'Like Post Failed!', 'Content Not Available Anymore');
    }
  }
};

export default likeApi;
