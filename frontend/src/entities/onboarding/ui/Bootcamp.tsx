import arrow from '../image/arrow.png';
import object from '../image/object.png';
import iconPoint from '../../../shared/assets/image/mainImg/Icon-Point.png';
import { EmblaCarousel } from '../../../entities/carousel';
import { useEffect, useRef } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import { prizeDate } from '../../../shared/types/prizeDate';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Bootcamp() {
  const OPTIONS: EmblaOptionsType = { loop: true };
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search') || '';

  const scrollRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (searchQuery) {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [searchQuery]);

  const data: prizeDate = {
    projectTypeEnum: 'BOOTCAMP',
    year: 2024,
    semesterEnum: 'SECOND',
  };
  function renameSemester(semester: string) {
    if (semester === 'FIRST') return '동계';
    if (semester === 'SECOND') return '하계';
    else return '';
  }

  return (
    <div className="w-[100vw] h-[70vw] flex flex-col my-20 items-center text-white">
      {/* 우수 선정작 */}
      <div className="w-[75rem] mt-[6.063rem] flex flex-col justify-center mb-[5rem]">
        <div className="flex flex-col items-center justify-center my-12">
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
      </div>

      {/* 텍스트 */}
      <div className="w-[100vw] h-[35vw] my-[13rem] flex flex-col bg-cover bg-[url('./entities/onboarding/image/bg.png')]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{
            ease: 'easeInOut',
            duration: 1,
          }}
        >
          <div className="flex justify-center pt-[4rem] pb-[1rem]">
            <div
              className="font-['Pre-S'] text-[3rem] bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(to bottom,#E4EDFF, #0047FF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              부트캠프&nbsp;
            </div>
            <div className="font-['Pre-S'] text-[3rem] text-white"> 결과물 한눈에 보기</div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            ease: 'easeInOut',
            duration: 1,
          }}
        >
          <div className="flex justify-center mb-[2rem] font-['Pretendard-Medium'] text-[1.1rem]">
            매년 2회 2번의 6주간 진행되는 실리콘밸리 실무 기반 SW 부트캠프
          </div>
        </motion.div>
        <motion.div
          className="mx-auto rounded-[3rem] border-solid border-[1px] border-black shadow-[0_35px_60px_-15px_rgba(146, 146, 146, 0.3)]"
          style={{
            boxShadow: '0px 4px 4px -2px rgba(146, 146, 146, 0.49)',
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            ease: 'easeInOut',
            duration: 1,
            delay: 0.5,
          }}
        >
          <Link to="/project">
            <div className="flex w-[11rem] h-[3rem] justify-center items-center gap-[1rem]">
              <span className="font-['Pretendard-Medium'] text-[1.3rem] text-white">보러가기</span>
              <img className="w-[2rem] h-[2rem] flex" src={arrow} alt="버튼" />
            </div>
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            ease: 'easeInOut',
            duration: 1,
            delay: 0.4,
          }}
        >
          <img className="w-[30rem] h-[30rem] flex mx-auto" src={object} alt="" />
        </motion.div>
      </div>
    </div>
  );
}
