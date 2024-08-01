import { Project } from '../types/projectList.ts';
import { Link, useParams } from 'react-router-dom';
interface propsProjects {
  project: Project;
}
export default function ProjectCard({ project }: propsProjects) {
  const firstFrontend = project.frameworkResponseList.find((framework) => framework.frameworkTypeEnum === 'FRONTEND');
  const firstBackend = project.frameworkResponseList.find((framework) => framework.frameworkTypeEnum === 'BACKEND');
  const teamName = project.projectTeamNameEnum;

  const { param } = useParams();
  const moveProjectView =
    param === 'judge' ? `/2024-summer-bootcamp/project/${project.id}` : `/projectview/${project.id}`;

  return (
    <Link to={moveProjectView}>
      {param === 'judge' ? (
        <div className="w-[100%] font-['Pre-S'] bg-[#2e2e2e70] text-center rounded-[0.1rem] border-solid border-[0.1rem] border-[#444444] font-semibold text-[1.7rem] text-[#EEEEEE] p-[0.3rem] mt-[2rem] mb-[0.5rem]">
          {teamName}팀
        </div>
      ) : (
        <></>
      )}
      <div
        key={project.id}
        className="rounded-[0.3rem] border-solid border border-[#444444] flex flex-col p-[0_0_1rem_0] box-sizing-border w-[100%] cursor-pointer"
      >
        <div className="flex justify-center items-center rounded-[0.3rem] m-[0_0_1.3rem_0] w-[99.9%] h-[15rem]">
          {project.mainImageUrl ? (
            <img alt="mainImg" className="w-full h-full object-contain" src={project.mainImageUrl} />
          ) : (
            <></>
          )}
        </div>
        <div className="w-80 m-[0_1rem_0.4rem_1rem] inline-block self-start break-words font-['Pre-S'] font-semibold text-[1.3rem] bg-[#FFFFFF] text-[transparent] bg-clip-text overflow-hidden text-ellipsis whitespace-nowrap">
          {project.title}
        </div>
        <div className="w-80 m-[0_1rem_0.7rem_1rem] inline-block self-start break-words font-['Pre-R'] font-normal text-[0.9rem] text-[#CCCCCC] overflow-hidden text-ellipsis whitespace-nowrap">
          {project.subtitle}
        </div>
        <div className="rounded-[0.3rem] m-[0_1rem_2rem_1rem] flex flex-row flex-wrap self-start w-[90%] h-[2rem] box-sizing-border">
          {firstFrontend ? (
            <div className="rounded-[0.3rem] bg-[#333333] m-[0_0.3rem_0.5rem_0.1rem] flex flex-row justify-center p-[0.3rem_0.7rem_0.2rem_0.6rem] box-sizing-border">
              <span className="break-words font-['Pre-R'] font-semibold text-[0.8rem] text-[#FFFFFF]">
                {firstFrontend.name}
              </span>
            </div>
          ) : (
            <></>
          )}
          {firstBackend ? (
            <div className="rounded-[0.3rem] bg-[#333333] m-[0_0.3rem_0.5rem_0.1rem] flex flex-row justify-center p-[0.3rem_0.7rem_0.2rem_0.6rem] box-sizing-border">
              <span className="break-words font-['Pre-R'] font-semibold text-[0.8rem] text-[#FFFFFF]">
                {firstBackend.name}
              </span>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="m-[0_1rem_0_1rem] flex flex-row justify-between w-[92%] box-sizing-border">
          <p className="m-[0_0.5rem_0_0] break-words font-['Pre-R'] font-normal text-[0.8rem] text-[#B0B0B0]">
            {project.projectStatusEnum === 'RUNNING' ? (
              <>
                <span className="text-[1.2rem] text-green-400">•</span>
                <span> 서비스 운영중</span>
              </>
            ) : (
              <>
                <span className="text-[1.2rem]">•</span>
                <span> 서비스 중단</span>
              </>
            )}
          </p>
          <span className="break-words font-['Pre-R'] font-normal text-[0.8rem] text-[#B0B0B0]">
            ♥&nbsp;&nbsp;&nbsp;
            {project.loveCount}
          </span>
        </div>
      </div>
    </Link>
  );
}
