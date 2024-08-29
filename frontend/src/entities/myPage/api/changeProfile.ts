import axiosInstance from '../../../shared/api/axiosInstance.ts';

export const changeProfile = async (FormData: any) => {
  const response = await axiosInstance.patch('/api/v1/members', FormData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.data;
};
