import { Link } from 'react-router-dom';
import { Scrap } from '../types/scrapList.ts';

interface propsScraps {
  scrap: Scrap;
}

export default function ScrapCard({ scrap }: propsScraps) {
  const firstFrontend = scrap.frameworkResponseList.find((framework) => framework.frameworkTypeEnum === 'FRONTEND');
  const firstBackend = scrap.frameworkResponseList.find((framework) => framework.frameworkTypeEnum === 'BACKEND');

  const moveProjectView = `/projectview/${scrap.projectId}`;

  return (
    <Link to={moveProjectView}>
      <div
        key={scrap.projectId}
        className="rounded-[0.3rem] border-solid border border-[#444444] flex flex-col p-[0_0_1rem_0] box-sizing-border w-[100%] cursor-pointer"
      >
        <div className="flex justify-center items-center rounded-[0.3rem] m-[0_0_1.3rem_0] w-[99.9%] h-[15rem]">
          {scrap.mainImageUrl ? (
            <img alt="mainImg" className="w-full h-full object-contain" src={scrap.mainImageUrl} />
          ) : (
            <></>
          )}
        </div>
        <div className="w-80 m-[0_1rem_0.4rem_1rem] inline-block self-start break-words font-['Pre-S'] font-semibold text-[1.3rem] bg-[#FFFFFF] text-[transparent] bg-clip-text overflow-hidden text-ellipsis whitespace-nowrap">
          {scrap.title}
        </div>
        <div className="w-80 m-[0_1rem_0.7rem_1rem] inline-block self-start break-words font-['Pre-R'] font-normal text-[0.9rem] text-[#CCCCCC] overflow-hidden text-ellipsis whitespace-nowrap">
          {scrap.subtitle}
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
            {scrap.serviceRunning === true ? (
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
            {scrap.scraped}
          </span>
        </div>
      </div>
    </Link>
  );
}
