import { Project } from '../../../shared/types/projectList.ts';
import axiosInstance from '../../../shared/api/axiosInstance.ts';

export const getProjectList = async ({
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
    sortDirection: 'DESC',
  };

  const response = await axiosInstance.get(`/api/v1/projects/list`, {
    params,
  });

  return response.data.data.projectItemResponseList;
};
