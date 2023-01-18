import axiosJWT from '../interceptors/axios';
import { UpdateUser } from '../models';
import { PostInformation } from '../models/post';

const postApi = {
  createPost: async (post: Partial<PostInformation>) => {
    try {
      const { data } = await axiosJWT.post('/post/create', post);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  updateUser: async (update: UpdateUser) => {
    try {
      const { data } = await axiosJWT.patch('/user/update', update);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  },
  getAllPost: async (page: number) => {
    try {
      const { data } = await axiosJWT.get(`/post?page=${page}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
};

export default postApi;
