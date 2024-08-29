import { getProjectList } from '../api/getProjectList.ts';
import { Project } from '../../../shared/types/projectList.ts';
import { useInfiniteQuery } from '@tanstack/react-query';

const SIZE_PER_PAGE = 20; //페이지당 불러올 게시글 개수

export const useGetProjectQuery = () => {
  const { data, isFetching, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery<Project[]>({
    queryKey: ['projectList'],
    queryFn: ({ pageParam }) => getProjectList({ pageStart: pageParam, size: SIZE_PER_PAGE }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length;

      return lastPage.length < SIZE_PER_PAGE ? undefined : nextPage;
    },

    retry: 0,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  return { data, hasNextPage, isFetching, isFetchingNextPage, fetchNextPage };
};
