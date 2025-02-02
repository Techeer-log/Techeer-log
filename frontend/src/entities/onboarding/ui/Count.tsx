import useScrollCount from '../hook/useScrollHook';

export default function Count() {
  const animatedItem1 = useScrollCount(8, 0, 1000);
  const animatedItem2 = useScrollCount(600, 0, 1000);
  const animatedItem3 = useScrollCount(100, 0, 3000);
  return (
    <div className="w-[100vw] h-full flex flex-col my-20 items-center text-white">
      <div className="flex gap-[2rem] my-[2rem]">
        <div className="w-[33rem] border-t-[0.1rem] border-t-white border-solid"></div>
        <span className="font-['Pre-S']">Since 2020</span>
        <div className="w-[33rem] border-t-[0.1rem] border-t-white border-solid"></div>
      </div>
      <div className="flex gap-[15rem]">
        <div className="flex flex-col items-center w-[6rem]">
          <span
            className="font-['Pre-S'] text-[3.5rem] w-[8rem] h-[4.5rem] flex items-center justify-center overflow-hidden"
            {...animatedItem1}
          >
            8기
          </span>
          <span className="font-['Pretendard-Medium'] text-[1.1rem]">부트캠프 기수</span>
        </div>
        <div className="flex flex-col items-center">
          <span
            className="font-['Pre-S'] text-[3.5rem] w-[8rem] h-[4.5rem] flex items-center justify-center overflow-hidden"
            {...animatedItem2}
          >
            600명 +
          </span>
          <span className="font-['Pretendard-Medium'] text-[1.1rem]">누적 수료생</span>
        </div>
        <div className="flex flex-col items-center">
          <span
            className="font-['Pre-S'] text-[3.5rem] w-[8rem] h-[4.5rem] flex items-center justify-center overflow-hidden"
            {...animatedItem3}
          >
            100개 +
          </span>
          <span className="font-['Pretendard-Medium'] text-[1.1rem]">진행한 프로젝트</span>
        </div>
      </div>
    </div>
  );
}
