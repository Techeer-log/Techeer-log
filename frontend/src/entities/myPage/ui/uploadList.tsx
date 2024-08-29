import { useGetProjectQuery } from '../../projectList/query/useGetProjectQuery';
import ProjectCard from '../../../shared/ui/ProjectCard';
import Pagination from '../../../shared/ui/Pagination';
import { useState } from 'react';
import { useAuthStore } from '../../../shared/store/authStore';

export default function UploadList() {
  const { loginId } = useAuthStore(); // 현재 로그인한 사용자의 ID를 가져옴

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } = useGetProjectQuery();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // 페이지당 보여줄 프로젝트 수

  // 모든 페이지 데이터를 하나의 배열로 결합하고, 로그인한 사용자가 작성한 프로젝트만 필터링
  const allProjects = data?.pages.flatMap((page) => page.filter((project) => project.writer.loginId === loginId)) || [];

  // 총 페이지 수를 계산
  const totalPages = Math.ceil(allProjects.length / itemsPerPage);

  // 현재 페이지에 해당하는 데이터를 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = allProjects.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);

    // 다음 페이지로 넘어가야 하는 경우 fetchNextPage를 호출
    if (pageNumber > Math.ceil(allProjects.length / itemsPerPage) && hasNextPage) {
      fetchNextPage();
    }
  };
  return (
    <div>
      <div className="grid grid-rows-2 grid-cols-3 gap-4 m-4">
        {currentData.length > 0 ? (
          currentData.map((project) => <ProjectCard key={project.id} project={project} />)
        ) : (
          <div className="text-white">No projects found.</div>
        )}
      </div>
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      {isFetchingNextPage && <div>Loading more projects...</div>}
    </div>
  );
}
