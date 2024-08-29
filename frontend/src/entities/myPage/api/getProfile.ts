import axiosInstance from '../../../shared/api/axiosInstance.ts';

export const getProfile = () => {
  return axiosInstance.get('/api/v1/members/profile', {}).then((response) => response.data.data);
};
