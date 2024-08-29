import axiosInstance from '../../../shared/api/axiosInstance';

export const getScrapList = () => {
  return axiosInstance.get(`/api/v1/scraps`).then((response) => {
    console.log('Scrap list response:', response.data.data); // 응답 데이터를 콘솔에 출력
    return response.data.data;
  });
};
