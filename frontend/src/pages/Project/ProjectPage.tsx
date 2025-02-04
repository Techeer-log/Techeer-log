import NavBar from '../../shared/ui/NavBar.tsx';
import Footer from '../../shared/ui/Footer.tsx';
import { DropDown } from '../../entities/filter';
import { ProjectList } from '../../entities/projectList';
import { useEffect, useRef, useState } from 'react';
import { ProjectTabs } from '../../entities/ProjectTabs/ui/ProjectTabs.tsx';
import ListToggle from '../../shared/ui/ListToggle.tsx';
import { useLocation } from 'react-router';

export const ProjectPage = () => {
  const [selectedType, setSelectedType] = useState<string>('부트캠프');
  const [selectedYear, setSelectedYear] = useState<string>('진행 연도');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('전체');

  const [alignment, setAlignment] = useState<string | null>('left');

  const setAlign = (align: string | null) => {
    setAlignment(align);
  };

  //검색 기능 자동 스크롤
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search') || '';
  const [_, setResult] = useState<any>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (searchQuery) {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [searchQuery]);
  useEffect(() => {
    if (!searchQuery) window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="w-screen bg-[#111111] flex flex-col justify-center items-center">
      <NavBar />
      <div className="flex flex-col items-center justify-center py-[4.5rem] font-['Pretendard-Bold'] text-[3rem] text-white"></div>
      <div
        ref={scrollRef}
        className="flex flex-col box-sizing-border items-start justify-center gap-[3.5rem] w-[1200px] px-4 mt-8 my-4 font-['Pretendard]"
      >
        <ProjectTabs
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          setSelectedYear={setSelectedYear}
          setSelectedPeriod={setSelectedPeriod}
          setResult={setResult}
        />
        <div className="flex flex-row justify-between w-[100%]">
          <DropDown
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            selectedPeriod={selectedPeriod}
            setSelectedPeriod={setSelectedPeriod}
          />
          <ListToggle alignment={alignment} setAlign={setAlign} />
        </div>
        <div className="flex flex-col w-[1200px]">
          <ProjectList
            selectedType={selectedType}
            selectedYear={selectedYear}
            selectedPeriod={selectedPeriod}
            alignment={alignment}
            result={searchQuery}
          />
        </div>
        <div className="mb-[25rem]"></div>
      </div>
      <Footer />
    </div>
  );
};
