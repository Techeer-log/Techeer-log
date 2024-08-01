import { Project } from '../../../shared/types/projectList.ts';
import axiosInstance from '../../../shared/api/axiosInstance.ts';

export const getBootCampProject = async ({
  pageStart,
  size,
}: {
  pageStart: number | unknown;
  size: number;
}): Promise<Project[]> => {
  const params = {
    pageStart: pageStart,
    pageSize: size,
    searchKeyword: '',
    searchFieldEnum: 'TITLE',
    sortDirection: 'ASC',
  };

  const response = await axiosInstance.get(`/api/v1/projects/bootcamp`, {
    params,
  });

  return response.data.data.projectItemResponseList;
};
