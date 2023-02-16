import axiosJWT from "../../interceptors/axios";
import { SocialLinks, UpdateUser } from "../../models";

const userApi = {
  getCurrentUser: async () => {
    try {
      const { data } = await axiosJWT.get("/user/profile");
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  getUserById: async (id: string) => {
    try {
      const { data } = await axiosJWT.get(`/user/profile/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  updateUser: async (update: UpdateUser) => {
    try {
      const { data } = await axiosJWT.patch('/user/update', update);
      return data
    } catch (error) {
      console.log(error)
    }
  },
  updateSocialLinks: async (update: Partial<SocialLinks>) => {
    try {
      const { data } = await axiosJWT.patch('/social-link', update);
      return data
    } catch (error) {
      console.log(error)
    }
  },
  getUsersByName: async (name: string) => {
    try {
      const { data } = await axiosJWT.get(`/user/search?name=${name}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default userApi;