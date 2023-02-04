import axiosJWT from '../interceptors/axios';

const friendApi = {
  requestFriend: async (friendId: string) => {
    try {
      const { data } = await axiosJWT.post('/friend/request', {
        userId: friendId,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  listRequestFriends: async (page: number) => {
    try {
      const { data } = await axiosJWT.get(`/friend/request/list?page=${page}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  acceptFriend: async (friendId: string) => {
    try {
      const { data } = await axiosJWT.post('/friend/accept', {
        userId: friendId,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  deleteFriend: async (userId: string) => {
    try {
      const { data } = await axiosJWT.delete(`/friend/delete/${userId}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  listFriends: async (page: number) => {
    try {
      const { data } = await axiosJWT.get(`/friend/list?page=${page}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  checkFriend: async (userId: string) => {
    try {
      const { data } = await axiosJWT.get(`/friend/check?userId=${userId}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default friendApi;
