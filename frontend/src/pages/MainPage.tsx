import NavBar from '../shared/ui/NavBar.tsx';
import { DropDown } from '../entities/filter';
import { Search } from '../entities/search';
import { EmblaCarousel } from '../entities/carousel';
import { EmblaOptionsType } from 'embla-carousel';
import { useEffect, useRef, useState } from 'react';
import { ProjectList } from '../entities/projectList';
import Footer from '../shared/ui/Footer.tsx';
import { useLocation } from 'react-router-dom';
import ProjectCard from '../shared/ui/ProjectCard.tsx';
import { prizeDate } from '../shared/types/prizeDate.ts';
import iconPoint from '../shared/assets/image/mainImg/Icon-Point.png';

export default function MainPage() {
  const OPTIONS: EmblaOptionsType = { loop: true };
  const [result, setResult] = useState<any>([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search') || '';
  const [selectedType, setSelectedType] = useState<string>('프로젝트 종류');
  const [selectedYear, setSelectedYear] = useState<string>('프로젝트 기간');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('전체');

  const scrollRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (searchQuery) {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [searchQuery]);

  const data: prizeDate = {
    projectTypeEnum: 'BOOTCAMP',
    year: 2023,
    semesterEnum: 'FIRST',
  };
  function renameSemester(semester: string) {
    if (semester === 'FIRST') return '동계';
    if (semester === 'SECOND') return '하계';
    else return '';
  }
  // data.semesterEnum;

  return (
    <div className="bg-[#111111] flex flex-col w-screen justify-center items-center">
      <NavBar scrollRef={scrollRef} />
      {/* 메인페이지-소개 */}
      <div className="w-[100vw] h-[41.6vw] bg-cover bg-[url('./shared/assets/image/mainImg/Background-Main.png')] flex justify-center items-center">
        <div className="w-[100vw] h-[100vw] flex flex-col justify-center items-center font-['Pretendard-Regular'] font-normal text-[#FFFFFF]">
          <span className="font-['Pretendard-Black'] text-[6rem] m-[0_0_1.5rem_0]">TECHEER</span>
          <span className="font-['Pretendard-Thin'] text-[1.875rem]">
            테커에서 진행하는 <a className="font-['Pretendard-Medium']">다양한 프로젝트를 한눈에</a>
          </span>
          <Search setResult={setResult} nowRef={scrollRef} />
        </div>
      </div>
      <div className="w-[75rem] mt-[6.063rem] flex flex-col justify-center mb-[15rem]">
        {searchQuery ? (
          <div ref={scrollRef} className="grid grid-cols-3 grid-rows-3 gap-4 m-4">
            {result && result.length > 0 ? (
              result.map((results: any) => <ProjectCard key={results.id} project={results} />)
            ) : (
              <div className="flex justify-center text-[1.875rem] text-[#FFFFFF] font-['Pretendard-Thin']">
                No projects found.
              </div>
            )}
          </div>
        ) : (
          <>
            {/* 우수선정작 */}
            <div className="flex flex-col items-center justify-center mb-12">
              <img src={iconPoint} className="w-[1.875rem] h-[0.75rem] mb-[1rem]" />
              <span className="font-['Pretendard-Thin'] text-[1.875rem] text-white">
                {data.year} {renameSemester(data.semesterEnum)} 부트캠프
                <a className="font-['Pretendard-Bold']"> 우수 선정작</a>
              </span>
            </div>
            <div className="overflow-x-hidden w-[98%] mx-auto mb-[6.25rem]">
              <EmblaCarousel options={OPTIONS} date={data} />
              <div ref={scrollRef}></div>
            </div>
            {/*프로젝트 전체*/}
            <div className="flex flex-col items-center justify-center mb-12">
              <img src={iconPoint} className="w-[1.875rem] h-[0.75rem] mb-[1rem]" />
              <span className="font-['Pretendard-Thin'] text-[1.875rem] text-white">
                테커 모든 <a className="font-['Pretendard-Bold']">프로젝트</a>
              </span>
            </div>
            <DropDown
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              selectedPeriod={selectedPeriod}
              setSelectedPeriod={setSelectedPeriod}
            />
            <ProjectList selectedType={selectedType} selectedYear={selectedYear} selectedPeriod={selectedPeriod} />
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
