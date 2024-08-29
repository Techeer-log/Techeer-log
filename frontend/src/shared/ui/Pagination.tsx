import { Link } from 'react-router-dom';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  const handleClick = (pageNumber: number) => {
    onPageChange(pageNumber);
    window.scrollTo(0, 0); // 페이지가 변경될 때 최상단으로 스크롤
  };

  const previousPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  return (
    <div className="flex justify-center mt-8">
      {/* 이전 버튼 */}
      {previousPage && (
        <Link
          to={`?page=${previousPage}`}
          onClick={() => handleClick(previousPage)}
          className="mx-6 flex justify-center items-center text-white"
        >
          이전
        </Link>
      )}
      {/* 페이지 번호 */}
      {Array.from({ length: totalPages }, (_, i) => (
        <Link
          to={`?page=${i + 1}`}
          key={i + 1}
          onClick={() => handleClick(i + 1)}
          className={`flex justify-center items-center mx-2 w-[2rem] h-[2rem] rounded-[30px] border border-transparent hover:border-gray-300 ${i + 1 === currentPage ? 'bg-gray-500 text-white' : 'text-white'}`}
        >
          {i + 1}
        </Link>
      ))}
      {/* 다음 버튼 */}
      {nextPage && (
        <Link
          to={`?page=${nextPage}`}
          onClick={() => handleClick(nextPage)}
          className="mx-6 flex justify-center items-center text-white"
        >
          다음
        </Link>
      )}
    </div>
  );
};

export default Pagination;
