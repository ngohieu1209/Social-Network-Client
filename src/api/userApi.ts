import axiosJWT from "../interceptors/axios";
import { UpdateUser } from "../models";

const userApi = {
  getCurrentUser: async () => {
    try {
      const { data } = await axiosJWT.get("/user/profile");
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
      console.log(error)
    }
  },
}

export default userApi;