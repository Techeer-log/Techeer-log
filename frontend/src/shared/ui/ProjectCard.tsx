import { Project } from '../types/projectList.ts';
import { Link } from 'react-router-dom';
interface propsProjects {
  project: Project;
}
export default function ProjectCard({ project }: propsProjects) {
  return (
    <Link to={`/projectview/${project.id}`}>
      <div
        key={project.id}
        className="rounded-[0.3rem] border-solid border border-[#444444] flex flex-col p-[0_0_1rem_0] box-sizing-border w-[100%] cursor-pointer"
      >
        <div className="bg-[url('./shared/assets/image/cardImg/ThumbNailImg.png')] bg-cover rounded-[0.3rem] m-[0_0_1.3rem_0] w-[99.9%] h-[15rem]"></div>
        <div className="m-[0_1rem_0.4rem_1rem] inline-block self-start break-words font-['Pre-S'] font-semibold text-[1.3rem] bg-[#FFFFFF] text-[transparent] bg-clip-text">
          {project.title}
        </div>
        <div className="m-[0_1rem_0.7rem_1rem] inline-block self-start break-words font-['Pre-R'] font-normal text-[0.9rem] text-[#CCCCCC]">
          {project.subtitle}
        </div>
        <div className="rounded-[0.3rem] m-[0_1rem_2rem_1rem] flex flex-row flex-wrap self-start w-[90%] h-[2rem] box-sizing-border">
          {project.frameworkResponseList &&
            project.frameworkResponseList.map((framework, index) => (
              <div
                key={index}
                className="rounded-[0.3rem] bg-[#333333] relative m-[0_0.3rem_0.5rem_0] flex flex-row justify-center p-[0.3rem_0.7rem_0.2rem_0.6rem] box-sizing-border"
              >
                <span className="break-words font-['Pre-R'] font-semibold text-[0.8rem] text-[#FFFFFF]">
                  {framework.name}
                </span>
              </div>
            ))}
        </div>
        <div className="m-[0_1rem_0_1rem] flex flex-row justify-between w-[92%] box-sizing-border">
          <p className="m-[0_0.5rem_0_0] break-words font-['Pre-R'] font-normal text-[0.8rem] text-[#B0B0B0]">
            {/*<span className="container-17-sub-10"></span>*/}
            {project.projectStatus === 'RUNNING' ? (
              <>
                <span className="text-green-400">•</span>
                <span> 서비스 운영중</span>
              </>
            ) : (
              <span>• 서비스 중단</span>
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
