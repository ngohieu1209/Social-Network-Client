import axios, { AxiosRequestConfig } from 'axios';

const axiosJWT = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/api/v1`,
  withCredentials: true,
});

axiosJWT.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const isLogged = localStorage.getItem('firstLogin');
    if (isLogged) {
      const { data } = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/v1/auth/refreshToken`, null, { withCredentials: true });
      if (data) {
        config.headers!.Authorization = `Bearer ${data.accessToken}`;
      }
    }
    return config;
  },
  (err) => Promise.reject(err)
);

export default axiosJWT;
