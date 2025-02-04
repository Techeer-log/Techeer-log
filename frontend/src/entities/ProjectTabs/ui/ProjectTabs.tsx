//import { Search } from '../../../entities/search/index.ts';
import React, { Suspense } from 'react';

interface TabProps {
  selectedType: string;
  setSelectedType: (type: string) => void;
  setSelectedYear: (type: string) => void;
  setSelectedPeriod: (type: string) => void;
  setResult: (result: string) => void;
}
export const ProjectTabs = ({
  selectedType,
  setSelectedType,
  setSelectedYear,
  setSelectedPeriod,
  setResult,
}: TabProps) => {
  const handleTabClick = (category: string) => {
    setSelectedYear('진행 연도');
    setSelectedPeriod('전체');
    setSelectedType(category);
  };

  const tabDescription = [
    {
      type: '부트캠프',
      label: '실리콘밸리 부트캠프',
      description: `테커에서 진행되는 실리콘밸리 S/W 부트캠프 수료작입니다. 서비스의 기획부터 배포까지 6주간의 집중적인 일정에서
      진행된 프로젝트입니다.`,
      subDescription: `AI, Big Data, Cloud 기술 등을 활용하며 실제 CI/CD 파이프라인과 Docker 등을 통해 직접 서비스를 개발합니다.`,
    },
    {
      type: '팀 프로젝트',
      label: 'TECHEER',
      description: `테커에서 진행된 팀 프로젝트입니다.`,
      subDescription: `프론트엔드, 백엔드, AI, 인프라 등 다양한 포지션의 팀원들로 구성되어 서비스를 개발합니다.`,
    },
  ];
  const selectedTab = tabDescription.find((tab) => tab.type === selectedType) || tabDescription[0];

  const Search = React.lazy(() =>
    import('../../../entities/search/index.ts').then((module) => ({
      default: module.Search,
    })),
  );
  return (
    <>
      <div className="flex flex-row gap-[4rem] w-[100%] pb-[1rem] border-b-[0.1rem] border-solid border-[#444444] box-sizing-border relative">
        <span
          className={`break-words font-['Pre'] font-[600] text-[1.7rem] w-fit ml-1 text-center ${
            selectedType === '부트캠프' ? 'text-[#fafafa]' : 'text-[#a1a1a1]'
          } cursor-pointer`}
          onClick={() => handleTabClick('부트캠프')}
        >
          실리콘밸리 부트캠프
          {selectedType === '부트캠프' && (
            <div className="bg-[#0047FF] z-[2] absolute w-[14.5rem] h-[0.2rem] -ml-1 mt-[0.92rem]"></div>
          )}
        </span>
        {/* 
        <span
          className={`break-words font-['Pre'] font-[600] text-[1.7rem] ${
            selectedType === '팀 프로젝트' ? 'text-[#fafafa]' : 'text-[#a1a1a1]'
          } cursor-pointer`}
          onClick={() => handleTabClick('팀 프로젝트')}
        >
          TECHEER
          {selectedType === '팀 프로젝트' && (
            <div className="bg-[#0047FF] z-[2] absolute w-[8rem] -ml-[0.5rem] h-[0.2rem] mt-[0.92rem]"></div>
          )}
        </span> */}
        <Suspense fallback={<div>Loading...</div>}>
          <Search setResult={setResult} />
        </Suspense>
      </div>
      <div className="flex flex-col items-start justify-center text-[1.25rem] px-[0.5rem] mb-[2rem] font-[400] text-[#90909a]">
        {selectedTab.description}
        <span className="mt-2">{selectedTab.subDescription}</span>
      </div>
    </>
  );
};
