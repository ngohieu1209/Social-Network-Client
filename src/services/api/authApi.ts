import { Signup, Signin } from '../../models/auth';
import axios from 'axios';

const authApi = {
  signUp: async (signUp: Signup) => {
    return await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/auth/signup`,
      signUp
    );
  },

  signIn: async (signIn: Signin) => {
    return await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/auth/signin`,
      signIn,
      { withCredentials: true }
    );
  },

  activationEmail: async (activationToken: string) => {
    return await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/auth/activation`,
      { activationToken }
    );
  },

  forgotPassword: async (email: string) => {
    return await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/auth/forgot`,
      { email }
    );
  },

  resetPassword: async (token: string, password: string) => {
    return await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/auth/resetPassword`,
      { password },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },

  signOut: async () => {
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/v1/auth/logout`);
    localStorage.removeItem('firstLogin');
    window.location.href = '/';
  },
};

export default authApi;
