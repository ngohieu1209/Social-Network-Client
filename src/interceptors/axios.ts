import axios, { AxiosRequestConfig } from 'axios';

const axiosJWT = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/api/v1`,
  withCredentials: true,
});

axiosJWT.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const isLogged = localStorage.getItem('firstLogin');
    if (isLogged) {
      const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/v1/auth/refreshToken`, null);
      console.log("res: ", res);
      if (res.status === 200) {
        config.headers!.Authorization = `Bearer ${res.data.accessToken}`;
      }
    }
    return config;
  },
  (err) => Promise.reject(err)
);

export default axiosJWT;
