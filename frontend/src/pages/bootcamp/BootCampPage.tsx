import { Header } from './ui/Header.tsx';
import Footer from '../../shared/ui/Footer.tsx';
import { getBootCampProject } from './api/getBootCampProject.ts';
import { Project } from '../../shared/types/projectList.ts';
import { useQuery } from '@tanstack/react-query';
import ProjectCard from '../../shared/ui/ProjectCard.tsx';

export const BootCampPage = () => {
  const { data, isError, error } = useQuery<Project[]>({
    queryKey: ['projectList'],
    queryFn: () => getBootCampProject({ pageStart: 0, size: 16 }),
  });

  const ErrorMessage = () => (
    <div>
      <p>Fetching Error</p>
      <p>{error instanceof Error ? error.message : 'An unknown error occurred'}</p>
    </div>
  );

  return (
    <div className="bg-[#111111] flex flex-col w-screen justify-center items-center">
      <Header />
      <div className="w-[75rem] mt-[8rem] flex flex-col justify-center items-center mb-[15rem]">
        <div className="w-[97%] rounded-[0.3rem] bg-[#3c3c3c70] border-solid border-[0.1rem] border-[#444444] text-[#f1f1f1] flex flex-col gap-4 items-center p-[2rem]">
          <span className="font-['Pretendard-SemiBold'] text-[1.3rem]">
            모든 프로젝트를 살펴보신 후, 5개의 우수작을 선정해서 투표해 주세요.
            <p className="text-[1.1rem] text-[#c9c9c9] font-['Pretendard'] my-[1rem] justify-center flex">
              발표 순서: E - J - L - D - B - A - M - F - C - N - H - G - I - K - O
            </p>
          </span>
          <a
            href={'https://forms.gle/oE6VzpLiX93V8njg9'}
            target="_blank"
            rel="noopener noreferrer"
            className="px-9 py-[0.8rem] border-[0.05rem] bg-[#3e3e3e] border-[#646464] border-solid font-['Pretendard-Medium'] text-[1.2rem] rounded-md hover:bg-[#444446] active:bg-[#444446] transition-colors"
          >
            투표하기
          </a>
        </div>
        {isError ? (
          <ErrorMessage />
        ) : (
          <div className="grid grid-rows-3 grid-cols-3 gap-4 m-4">
            {data?.length ? (
              data.map((project) => <ProjectCard key={project.id} project={project} />)
            ) : (
              <div>No projects found.</div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};
