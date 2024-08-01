import GithubIcon from '../../../shared/assets/image/projectViewImg/Icon-Github.png';
import BlogIcon from '../../../shared/assets/image/modalImg/bloglink.svg';
import WebIcon from '../../../shared/assets/image/modalImg/Internet.svg';
import { Framework, ProjectData, ProjectMember } from '../../../shared/types/project.ts';
import { LikeButton } from './LikeButton.tsx';
import { ScrapButton } from './ScrapButton.tsx';
import { ShareButton } from './ShareButton.tsx';
import { MarkdownView } from '../../../feature/ProjectWrite';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProject } from '../api/project.ts';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useStore from '../../../shared/store/store.ts';
export const ProjectView = (props: { data: ProjectData }) => {
  const project: ProjectData = props.data;

  const projectMember: ProjectMember[] = props.data.nonRegisterProjectMemberResponseList;

  const techStack: Framework[] = props.data.frameworkResponseList;

  const currentUser = sessionStorage.getItem('nickname');

  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: (projectId: number) => deleteProject(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projectList'] });
    },
  });

  const navigate = useNavigate();
  const clickEditButton = (projectId: number) => {
    const setProjectData = useStore.getState().setProjectData;
    setProjectData(project);
    navigate(`/project/edit/${projectId}`);
  };

  const clickDeleteButton = (projectId: number) => {
    deleteMutation.mutate(projectId);
    navigate('/');
  };

  const [projectType, setProjectType] = useState('');
  const renameProjectType = (projectType: string) => {
    if (projectType === 'BOOTCAMP') {
      setProjectType('부트캠프');
    }
    if (projectType === 'TEAM_PROJECT') {
      setProjectType('팀 프로젝트');
    }
    if (projectType === 'PERSONAL_PROJECT') {
      setProjectType('개인 프로젝트');
    }
    return projectType;
  };
  useEffect(() => {
    renameProjectType(project.projectTypeEnum);
  }, [project.projectTypeEnum]);

  return (
    <div key={project.id} className="bg-[#0F1012] w-[100vw] box-sizing-border">
      <div className="w-[85rem] pt-[5.5rem] relative ml-auto mr-auto">
        <div className="m-[1rem_0_1.4rem_0] flex flex-col items-centerx break-words font-['Pretendard'] font-semibold text-[2rem] text-[#FFFFFF]">
          {project.title}
        </div>
        <div className="flex flex-row justify-between p-[0_0_1rem_0] text-[#C7C7C7] break-words font-['Pretendard']">
          <div className="inline-block font-normal text-[1.1em] ">{project.subtitle}</div>
          {currentUser === project.writer.nickname ? (
            <div className="flex flex-row gap-3">
              <div
                onClick={() => {
                  clickEditButton(project.id);
                }}
                className="flex items-center text-[0.8rem] cursor-pointer hover:underline"
              >
                수정
              </div>
              <div
                onClick={() => {
                  clickDeleteButton(project.id);
                }}
                className="flex items-center text-[0.8rem] cursor-pointer hover:underline"
              >
                삭제
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="bg-[#989898] absolute w-[100%] h-[0.1rem]"></div>
        {/*좋아요, 저장, 공유*/}
        <div className="flex flex-row items-center justify-between w-[100%] mt-[1.5rem] mb-[2rem] box-sizing-border">
          <div className="flex flex-row justify-between box-sizing-border mt-[0.5rem]">
            <LikeButton projectId={project.id} loveCount={project.loveCount} isLoved={project.loved} />
          </div>
          <div className="flex flex-row justify-between box-sizing-border mt-[0.5rem]">
            <ScrapButton projectId={project.id} scraped={project.scraped} />
            <ShareButton />
          </div>
        </div>
        {/*글*/}
        <div className="flex flex-row w-[100%] justify-between box-sizing-border">
          {/*소개*/}
          <div
            id="scroll-style"
            className="rounded-[0.9rem] w-[62rem] h-[60rem] border border-solid border-[#CCCCCC] relative flex flex-col p-[2rem_2.4rem_3rem_2.4rem] box-sizing-border overflow-y-scroll"
          >
            <div className="justify-center flex rounded-[0.6rem] w-[100%] mb-[3rem] ">
              {project.mainImageUrl ? (
                <img alt="mainImg" className="flex h-[22rem]" src={project.mainImageUrl} />
              ) : (
                <></>
              )}
            </div>
            <div className="whitespace-pre-wrap leading-5 self-start break-words font-['Pretendard'] font-normal text-[1rem] text-[#FFFFFF] w-full h-fit">
              <MarkdownView markdown={project.content} />
            </div>
          </div>
          {/*요약 박스*/}
          <div className="relative m-[0.2rem_0_0_0] flex flex-col w-[21rem] box-sizing-border">
            {/*프로젝트 소개*/}
            <div className="relative m-[0_0_1.5rem_0] flex flex-row items-center w-[100%] box-sizing-border">
              <div className="rounded-[0.9rem] bg-[#242424] relative flex flex-col p-[2.3rem_1.5rem_1.3rem_2.3rem] w-[100%] box-sizing-border">
                <div className="m-[0_0_2.1rem_0] inline-block self-start break-words font-['Pretendard'] font-semibold text-[1.1rem] text-[#FFFFFF]">
                  프로젝트 정보
                </div>
                <div className="flex flex-row">
                  <div className="flex flex-col justify-between self-start w-[8rem] box-sizing-border">
                    <span className="m-[0_0.6rem_0_0] w-[8.7rem] h-12 break-words font-['Pretendard'] font-medium text-[1rem] text-[#CCCCCC]">
                      진행 기간
                    </span>
                    <span className="m-[0_0.6rem_0_0] w-[8.7rem] h-12 break-words font-['Pretendard'] font-medium text-[1rem] text-[#CCCCCC]">
                      프로젝트 종류
                    </span>
                    <span className="m-[0_0.6rem_0_0] w-[8.7rem] h-12 break-words font-['Pretendard'] font-medium text-[1rem] text-[#CCCCCC]">
                      프로젝트 형태
                    </span>
                    <span className="m-[0_0.6rem_0_0] w-[8.7rem] h-12 break-words font-['Pretendard'] font-medium text-[1rem] text-[#CCCCCC]">
                      서비스 상태
                    </span>
                    <div className="m-[0.1rem_0.6rem_0.2rem_0] h-12 inline-block w-[10.9rem] break-words font-['Pretendard'] font-medium text-[1rem] text-[#CCCCCC]">
                      프로젝트 링크
                    </div>
                  </div>
                  <div className="flex flex-col justify-between self-start w-[17.8rem] mt-[0.1rem] box-sizing-border ">
                    <span className="break-words font-['Pretendard'] h-12 font-normal text-[0.9rem] text-[#FFFFFF]">
                      {project.startDate} <p>~ {project.endDate}</p>
                    </span>
                    <span className="break-words font-['Pretendard'] h-12 font-normal text-[0.9rem] text-[#FFFFFF]">
                      {projectType}
                    </span>
                    <span className="break-words font-['Pretendard'] h-12 font-normal text-[0.9rem] text-[#FFFFFF]">
                      {project.platform}
                    </span>
                    <span className="break-words font-['Pretendard'] h-12 font-normal text-[0.9rem] text-[#FFFFFF]">
                      {project.projectStatusEnum === 'RUNNING' ? '운영 중' : '운영 중단'}
                    </span>
                    <div className="flex flex-row items-center gap-4 box-sizing-border">
                      {project.githubLink && (
                        <div className="flex">
                          <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                            <img src={GithubIcon} className="cursor-pointer w-[1.6rem] h-[1.5rem]" />
                          </a>
                        </div>
                      )}
                      {project.blogLink && (
                        <div className="flex">
                          <a href={project.blogLink} target="_blank" rel="noopener noreferrer">
                            <img src={BlogIcon} className="cursor-pointer ml-1 w-[1.3rem] h-[1.3rem]" />
                          </a>
                        </div>
                      )}
                      {project.websiteLink && (
                        <div className="flex">
                          <a href={project.websiteLink} target="_blank" rel="noopener noreferrer">
                            <img src={WebIcon} className="cursor-pointer w-[1.6rem] h-[1.6rem]" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*기술스택*/}
            <div className="rounded-[0.9rem] bg-[#242424] mb-[1.5rem] flex flex-col p-[2.3rem_1.3rem_1.3rem_2.3rem] w-[21rem] box-sizing-border">
              <div className="m-[0_0.2rem_0.5rem_0.2rem] inline-block self-start break-words font-['Pretendard'] font-semibold text-[1.1rem] text-[#FFFFFF]">
                기술 스택
              </div>
              <span className="w-[8.7rem] m-[1rem_0_1rem_0.2rem] break-words font-['Pretendard'] font-medium text-[1rem] text-[#CCCCCC]">
                Backend
              </span>
              <div className="rounded-[0.9rem] flex flex-wrap flex-row self-start w-[fit-content] box-sizing-border">
                {techStack &&
                  techStack.map((tech, index) => {
                    if (tech.frameworkTypeEnum === 'BACKEND') {
                      return (
                        <div
                          key={index}
                          className="rounded-[0.9rem] bg-[#464646] relative m-[0_0.6rem_1rem_0] flex flex-row justify-center p-[0.4rem_0.9rem_0.4rem_0.9rem] box-sizing-border"
                        >
                          <span className="break-words font-['Pretendard'] font-semibold text-[0.8rem] text-[#CCCCCC]">
                            {tech.name}
                          </span>
                        </div>
                      );
                    }
                  })}
              </div>
              <span className="w-[8.7rem] m-[0.4rem_0_1rem_0.2rem] break-words font-['Pretendard'] font-medium text-[1rem] text-[#CCCCCC]">
                Frontend
              </span>
              <div className="rounded-[0.9rem] flex flex-wrap flex-row self-start w-[fit-content] box-sizing-border">
                {techStack &&
                  techStack.map((tech, index) => {
                    if (tech.frameworkTypeEnum === 'FRONTEND') {
                      return (
                        <div
                          key={index}
                          className="rounded-[0.9rem] bg-[#464646] relative m-[0_0.6rem_1rem_0] flex flex-row justify-center p-[0.4rem_0.9rem_0.4rem_0.9rem] box-sizing-border"
                        >
                          <span className="break-words font-['Pretendard'] font-semibold text-[0.8rem] text-[#CCCCCC]">
                            {tech.name}
                          </span>
                        </div>
                      );
                    }
                  })}
              </div>
            </div>
            {/*팀원*/}
            <div className="rounded-[0.9rem] bg-[#242424] relative flex flex-col p-[2.3rem_1.3rem_1.3rem_2.3rem] w-[21rem] box-sizing-border">
              <div className="m-[0_0_2.1rem_0] inline-block self-start break-words font-['Pretendard'] font-medium text-[1.1rem] text-[#FFFFFF]">
                프로젝트 팀원
              </div>
              <div className="flex flex-row">
                <div className="flex flex-col justify-between self-start w-[36rem] box-sizing-border">
                  <div className="flex flex-row m-[0_0_1rem_0] w-[15.7rem] h-[3.4rem] break-words font-['Pretendard'] font-medium text-[1rem] text-[#CCCCCC]">
                    <span>Team Leader</span>
                    <div className="flex flex-row gap-3 pl-[1.5rem] box-sizing-border flex-wrap">
                      {projectMember &&
                        projectMember.map((member, index) => {
                          if (member.projectMemberTypeEnum === 'LEADER') {
                            return (
                              <span key={index} className="break-words font-normal text-[0.9rem] text-[#FFFFFF]">
                                {member.name}
                              </span>
                            );
                          }
                        })}
                    </div>
                  </div>
                  <div className="flex flex-row m-[0_0_1rem_0] w-[15.7rem] h-[3.4rem] break-words font-['Pretendard'] font-medium text-[1rem] text-[#CCCCCC]">
                    <span>Backend</span>
                    <div className="flex flex-row gap-3 pl-[1.5rem] w-full box-sizing-border flex-wrap">
                      {projectMember &&
                        projectMember.map((member, index) => {
                          if (member.projectMemberTypeEnum === 'BACKEND') {
                            return (
                              <span
                                key={index}
                                className="break-words whitespace-normal font-normal text-[0.9rem] text-[#FFFFFF]"
                              >
                                {member.name}
                              </span>
                            );
                          }
                        })}
                    </div>
                  </div>
                  <div className="flex flex-row m-[0_0_0.1rem_0] w-[15.7rem] h-[3.4rem] break-words font-['Pretendard'] font-medium text-[1rem] text-[#CCCCCC]">
                    <span>Frontend</span>
                    <div className="flex flex-row gap-3 pl-[1.5rem] box-sizing-border flex-wrap">
                      {projectMember &&
                        projectMember.map((member, index) => {
                          if (member.projectMemberTypeEnum === 'FRONTEND') {
                            return (
                              <span key={index} className=" break-words font-normal text-[0.9rem] text-[#FFFFFF]">
                                {member.name}
                              </span>
                            );
                          }
                        })}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-between self-start w-[17.8rem] box-sizing-border"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
