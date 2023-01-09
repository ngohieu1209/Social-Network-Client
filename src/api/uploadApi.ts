import axiosJWT from '../interceptors/axios';

const uploadApi = {
  uploadImage: async (formData: FormData) => {
    try {
      const { data } = await axiosJWT.post('/upload/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default uploadApi;