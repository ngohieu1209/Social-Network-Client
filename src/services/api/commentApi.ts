import axiosJWT from '../../interceptors/axios';

const commentApi = {
  getComments: async (postId: string, page: number) => {
    try {
      const { data } = await axiosJWT.get(`/comment?postId=${postId}&page=${page}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
};

export default commentApi;
