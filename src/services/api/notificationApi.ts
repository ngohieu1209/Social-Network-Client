import axiosJWT from '../../interceptors/axios';

const notificationApi = {
  getNotifications: async (page: number) => {
    try {
      const { data } = await axiosJWT.get(
        `/notification?page=${page}`
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default notificationApi;
