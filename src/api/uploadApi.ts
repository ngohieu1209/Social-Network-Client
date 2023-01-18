import axiosJWT from '../interceptors/axios';
import { UploadInformation } from '../models/upload';

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

  uploadImages: async (formData: FormData) => {
    try {
      const { data } = await axiosJWT.post('/upload/images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  createUpload: async (createUpload: Partial<UploadInformation>) => {
    try {
      const { data } = await axiosJWT.post('upload/create', createUpload);
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  deleteUpload: async (public_id: string) => {
    try {
      const { data } = await axiosJWT.delete(`upload/delete?id=${public_id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default uploadApi;