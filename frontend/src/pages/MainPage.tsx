import NavBar from '../shared/ui/NavBar.tsx';
import React, { useEffect, useRef, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import Bootcamp from '../entities/onboarding/ui/Bootcamp.tsx';
import Project from '../entities/onboarding/ui/Project.tsx';
import circle1 from '../entities/onboarding/image/circle1.png';
import circle2 from '../entities/onboarding/image/circle2.png';
import { motion } from 'framer-motion';
import arrow from '../entities/onboarding/image/arrow.png';

import Swiper from '../entities/onboarding/ui/Swiper.tsx';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Count from '../entities/onboarding/ui/Count.tsx';

export default function MainPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search') || '';

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (searchQuery) {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [searchQuery]);

  const Footer = React.lazy(() => import('../shared/ui/Footer.tsx'));

  return (
    <div className="bg-[#111111] flex flex-col w-screen justify-center items-center">
      <NavBar />
      {/* 메인페이지-소개 */}
      {/* <div className="w-[100vw] h-[908px] flex flex-col justify-center items-center"> */}
      <div className="relative flex w-[100vw] h-[710px] bg-black">
        {/** 비디오 영역 */}
        <div className="absolute z-0 flex justify-center w-full h-full pt-[5rem] top-1/2 left-1/2 z-1 bg-transparent -translate-x-1/2 -translate-y-1/2">
          <video autoPlay muted className=" " src="/intro.mp4"></video>
        </div>
      </div>
      {/* </div> */}

      <Count />

      {/** 테커 소개 */}
      <div className="w-[100vw] h-[20rem] flex flex-col justify-center items-center mt-[3rem] font-['Pretendard-Regular'] font-normal text-[#FFFFFF]">
        <span className="font-['Pretendard-Black'] text-[5rem]">TECHEER</span>
        <span className="font-['Pretendard-Thin'] text-[1.5rem]">
          실리콘밸리에서 직접 운영하는{' '}
          <a className="font-['Pretendard-Medium'] text-blue-500">
            {'{'} 실리콘밸리식 프로젝트와 멘토 시스템 {'}'}
          </a>{' '}
          으로 운영되는 코딩스쿨
        </span>
      </div>
      {/** 활동 사진 영역 */}
      <Swiper />

      {/* 부트캠프 소개*/}
      <Bootcamp />

      {/* 프로젝트 소개*/}
      <Project />

      {/* 테커 */}
      <div className="w-[100vw] h-[100w] flex flex-col relative">
        <motion.div
          initial={{ opacity: 0, x: -30, y: -30 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: false }}
          transition={{
            ease: 'easeInOut',
            duration: 1.5,
          }}
        >
          <img className="w-[25rem] h-[36rem] flex" src={circle1} alt="원" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{
            ease: 'easeInOut',
            duration: 1,
          }}
        >
          <div className="flex flex-col items-center justify-center mb-[20rem]">
            <span className="font-['Pretendard-Medium'] text-white text-[2rem]">실리콘밸리 성장 코딩스쿨 </span>
            <span
              className="font-['Pre-S'] text-white text-[11rem] "
              style={{
                backgroundImage: 'linear-gradient(to bottom, #E4EDFF, #0047FF',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Techeer
            </span>
            <motion.div
              className="mx-auto mb-[3rem] rounded-[3rem] border-solid border-[1px] border-black shadow-[0_35px_60px_-15px_rgba(146, 146, 146, 0.3)]"
              style={{
                boxShadow: '0px 4px 4px -2px rgba(146, 146, 146, 0.49)',
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{
                ease: 'easeInOut',
                duration: 1,
                delay: 0.5,
              }}
            >
              <a href="https://techeer.net" target="_blank" rel="noopener noreferrer">
                <div className="flex w-[15rem] h-[3rem] justify-center items-center gap-[1rem]">
                  <span className="font-['Pretendard-Medium'] text-[1.3rem] text-white">테커 소개 보러가기</span>
                  <img className="w-[2rem] h-[2rem] flex" src={arrow} alt="버튼" />
                </div>
              </a>
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{
            ease: 'easeInOut',
            duration: 1,
            delay: 0.2,
          }}
        >
          <img className="w-[35rem] h-[43rem] flex -right-0 bottom-0 absolute" src={circle2} alt="원" />
        </motion.div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
    </div>
  );
}
