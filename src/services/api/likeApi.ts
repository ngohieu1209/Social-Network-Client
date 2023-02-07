import axiosJWT from '../../interceptors/axios';

const likeApi = {
  likePost: async (postId: string) => {
    try {
      const { data } = await axiosJWT.post('/like', { postId });
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  getUserLikePost: async (postId: string) => { 
    try {
      const { data } = await axiosJWT.get(`/like/post/${postId}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
};

export default likeApi;
