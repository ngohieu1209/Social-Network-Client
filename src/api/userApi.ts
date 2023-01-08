import axiosJWT from "../interceptors/axios";

const userApi = {
  getCurrentUser: async () => {
    try {
      const { data } = await axiosJWT.get("/user/profile");
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default userApi;