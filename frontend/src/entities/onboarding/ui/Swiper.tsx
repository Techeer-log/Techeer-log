import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import { useRef, useState } from 'react';

export default function MySwiper() {
  // Swiper 인스턴스를 참조하기 위한 ref
  const swiperRef = useRef<any>(null);

  // 각 슬라이드에 해당하는 텍스트
  const slideTitles = ['IDEATON', 'TECHEER PARTY', 'BOOTCAMP', 'NETWORK'];

  // 텍스트 클릭 시 해당 슬라이드로 이동하는 함수
  const handleClick = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(index); // 슬라이드 이동
    }
  };

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // 텍스트 클릭 시 동작
  const handleTextClick = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null); // 이미 클릭된 텍스트를 다시 클릭하면 비활성화
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div>
      <Swiper
        ref={swiperRef} // Swiper 인스턴스를 참조
        className="flex w-[1200px] h-[30rem]"
        modules={[Pagination]} // 모듈 설정
        spaceBetween={50}
        slidesPerView={1}
        pagination={false} // 페이지네이션 활성화
      >
        {/* 각 슬라이드에 이미지를 출력 */}
        <SwiperSlide>
          <img src="/idea.png" alt="Idea Image" className="w-full h-full object-contain" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/party.png" alt="Party Image" className="w-full h-full object-contain" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/session1.png" alt="Hang Image" className="w-full h-full object-contain" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/hang2.png" alt="Hang Image" className="w-full h-full object-contain" />
        </SwiperSlide>
      </Swiper>

      {/* 이미지 아래에 텍스트 추가 */}
      <div className="relative flex justify-center mt-4 space-x-20 text-white">
        {slideTitles.map((title, index) => (
          <div key={index} className="relative">
            <button
              onClick={() => {
                handleClick(index); // 클릭 시 해당 슬라이드로 이동
                handleTextClick(index); // 클릭 시 해당 인덱스 활성화
              }}
              className="mt-10 text-2xl font-bold hover:text-blue-500"
            >
              {title}
            </button>
            {/* activeIndex에 해당하는 텍스트 오른쪽 위에 span 표시 */}
            {activeIndex === index && (
              <span className="absolute z-30 rounded-full bg-white -right-15 left-0 top-7 h-3 w-3"></span>
            )}
          </div>
        ))}{' '}
      </div>
    </div>
  );
}
