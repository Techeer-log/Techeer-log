import Footer from '../shared/ui/Footer.tsx';
import NavBar from '../shared/ui/NavBar.tsx';
import { MyPageProfile } from '../entities/myPage/index.ts';
import ScrapList from '../entities/myPage/ui/scrapList.tsx';
import { useRef } from 'react';
import { useState } from 'react';
import UploadList from '../entities/myPage/ui/uploadList.tsx';

export const MyPage = () => {
  const [selectedTab, setSelectedTab] = useState<'uploaded' | 'scrapped'>('uploaded'); // 탭 상태 관리
  const scrollRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className="bg-[#111111] flex flex-col items-center w-screen box-sizing-border">
      <NavBar scrollRef={scrollRef} />
      <div className="w-screen flex flex-col items-center ml-auto mr-auto mt-[8rem] mb-[8rem]">
        <MyPageProfile />
        <div className="m-[0_0_1.5rem_0] flex flex-row justify-center gap-[30rem] w-[100%] box-sizing-border">
          <span
            className={`break-words font-['Pre-R'] font-medium text-[1.5rem] ${
              selectedTab === 'uploaded' ? 'text-[#0047FF]' : 'text-[#CCCCCC]'
            } cursor-pointer`}
            onClick={() => setSelectedTab('uploaded')}
          >
            업로드한 프로젝트
            {selectedTab === 'uploaded' && (
              <div className="bg-[#0047FF] z-[2] absolute w-[10.8rem] h-[0.2rem] mt-[1.45rem]"></div>
            )}
          </span>
          <span
            className={`break-words font-['Pre-R'] font-normal text-[1.5rem] ${
              selectedTab === 'scrapped' ? 'text-[#0047FF]' : 'text-[#CCCCCC]'
            } cursor-pointer`}
            onClick={() => setSelectedTab('scrapped')}
          >
            스크랩한 프로젝트
            {selectedTab === 'scrapped' && (
              <div className="bg-[#0047FF] z-[2] absolute w-[10.8rem] h-[0.2rem] mt-[1.45rem]"></div>
            )}
          </span>{' '}
        </div>
        <div className="bg-[#444444] relative m-[0_0_3.8rem_0] w-[100%] h-[0.1rem]"></div>
        {/* <div className="flex flex-col items-center justify-center mb-12"> */}
        <div className="w-[75rem] flex flex-col justify-center mb-[15rem]">
          {selectedTab === 'uploaded' ? (
            <div>
              <UploadList />
            </div>
          ) : (
            <ScrapList />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};
