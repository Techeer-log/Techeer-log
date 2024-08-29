import calendarImg from '../image/calendar.svg';
import dropdown from '../image/dropdown.svg';
import github from '../../../shared/assets/image/modalImg/github.svg';
import internet from '../../../shared/assets/image/modalImg/Internet.svg';
import blog from '../../../shared/assets/image/modalImg/bloglink.svg';
import { useEffect, useState } from 'react';
import useStore from '../../../shared/store/store';
import { Calendar } from './Calendar';
import moment from 'moment';
import * as projectWrite from '../../../shared/constants/index';

export const ProjectInfo = ({ setStep }: any) => {
  const {
    startDate,
    endDate,
    projectType,
    changeprojectType,
    year,
    changeyear,
    platform,
    changeplatform,
    semester,
    changesemester,
    projectStatus,
    changeprojectStatus,
    changegithubLink,
    changeblogLink,
    changewebsiteLink,
    changestartDate,
    changeendDate,
    blogLink,
    githubLink,
    websiteLink,
  } = useStore();

  // 다음, 이전 버튼
  const nextStep = () => {
    setStep('next');
  };
  const prevStep = () => {
    setStep('prev');
  };
  // 드롭다운
  const [isDropDownOpen1, setIsDropDownOpen1] = useState(false);
  const [isDropDownOpen2, setIsDropDownOpen2] = useState(false);
  const [isDropDownOpen3, setIsDropDownOpen3] = useState(false);
  const [isDropDownOpen4, setIsDropDownOpen4] = useState(false);
  const githubChange = (e: any) => {
    changegithubLink(e.target.value);
  };
  const blogChange = (e: any) => {
    changeblogLink(e.target.value);
  };
  const websiteChange = (e: any) => {
    changewebsiteLink(e.target.value);
  };
  const dropDownLeftGisu = () => {
    setIsDropDownOpen1(!isDropDownOpen1);
  };
  const dropDownRightGisu = () => {
    setIsDropDownOpen2(!isDropDownOpen2);
  };
  const dropDownLeftPlatform = () => {
    setIsDropDownOpen3(!isDropDownOpen3);
  };
  const dropDownRightPlatform = () => {
    setIsDropDownOpen4(!isDropDownOpen4);
  };
  const handleChangeProjectType1 = () => {
    changeprojectType('부트캠프');
    changesemester('동계');
    setIsDropDownOpen1(false);
  };
  const handleChangeProjectType2 = () => {
    changeprojectType('팀 프로젝트');
    changesemester('');
    setIsDropDownOpen1(false);
  };
  const handleChangeProjectType3 = () => {
    changeprojectType('개인 프로젝트');
    changesemester('');
    setIsDropDownOpen1(false);
  };
  const handleChangeYear1 = () => {
    changeyear('2024');
    changesemester('');
    setIsDropDownOpen2(false);
  };
  const handleChangeYear2 = () => {
    changeyear('2023');
    changesemester('');
    setIsDropDownOpen2(false);
  };
  const handleChangeYear3 = () => {
    changeyear('2022');
    changesemester('');
    setIsDropDownOpen2(false);
  };

  const handleChangeSemester1 = () => {
    changeyear('2024');
    changesemester('동계');
    setIsDropDownOpen2(false);
  };
  const handleChangeSemester2 = () => {
    changeyear('2024');
    changesemester('하계');
    setIsDropDownOpen2(false);
  };
  const handleChangeSemester3 = () => {
    changeyear('2023');
    changesemester('동계');
    setIsDropDownOpen2(false);
  };
  const handleChangeSemester4 = () => {
    changeyear('2023');
    changesemester('하계');
    setIsDropDownOpen2(false);
  };
  const handleChangeSemester5 = () => {
    changeyear('2022');
    changesemester('동계');
    setIsDropDownOpen2(false);
  };
  const handleChangeSemester6 = () => {
    changeyear('2022');
    changesemester('하계');
    setIsDropDownOpen2(false);
  };
  const handleChangePlatform1 = () => {
    changeplatform('웹');
    setIsDropDownOpen3(false);
  };
  const handleChangePlatform2 = () => {
    changeplatform('앱');
    setIsDropDownOpen3(false);
  };
  const handleChangePlatform3 = () => {
    changeplatform('웹 앱');
    setIsDropDownOpen3(false);
  };
  const handleChangeService1 = () => {
    changeprojectStatus('서비스 운영 중');
    setIsDropDownOpen4(false);
  };
  const handleChangeService2 = () => {
    changeprojectStatus('서비스 중단');
    setIsDropDownOpen4(false);
  };
  //달력
  const [isCalendarOpen1, setIsCalendarOpen1] = useState(false);
  const [isCalendarOpen2, setIsCalendarOpen2] = useState(false);

  const createDate = (date: string): Date => {
    return date === '' ? new Date() : new Date(date);
  };
  const projectDate1 = createDate(startDate);
  const projectDate2 = createDate(endDate);
  const [nowDate1, setNowDate1] = useState(moment(projectDate1).format('YYYY.MM.DD'));
  const [nowDate2, setNowDate2] = useState(moment(projectDate2).format('YYYY.MM.DD'));

  useEffect(() => {
    changestartDate(moment(projectDate1).format('YYYY.MM.DD'));
    changeendDate(moment(projectDate2).format('YYYY.MM.DD'));
    changeblogLink(blogLink);
    changegithubLink(githubLink);
    changewebsiteLink(websiteLink);
  }, []);

  const calendarOpen1 = () => {
    setIsCalendarOpen1(!isCalendarOpen1);
  };
  const handleDateChange1 = (selectedDate: any) => {
    setIsCalendarOpen1(false);
    setNowDate1(moment(selectedDate).format('YYYY.MM.DD'));
    changestartDate(moment(selectedDate).format('YYYY.MM.DD'));
  };
  const calendarOpen2 = () => {
    setIsCalendarOpen2(!isCalendarOpen2);
  };
  const handleDateChange2 = (selectedDate: any) => {
    setIsCalendarOpen2(false);
    setNowDate2(moment(selectedDate).format('YYYY.MM.DD'));
    changeendDate(moment(selectedDate).format('YYYY.MM.DD'));
  };

  useEffect(() => {
    const engChange = (platformName: any) => {
      const platform = projectWrite.projectWrite.find((item) => item.enum === platformName);
      return platform?.name;
    };
    const enumPlatform = engChange(platform);
    const enumProjectType = engChange(projectType);
    const enumSemester = engChange(semester);
    if (semester === 'ALL') changesemester('');
    const enumProjectStatus = engChange(projectStatus);
    if (enumPlatform !== undefined) changeplatform(enumPlatform);
    if (enumProjectType !== undefined) changeprojectType(enumProjectType);
    if (enumSemester !== undefined) changesemester(enumSemester);
    if (enumProjectStatus !== undefined) changeprojectStatus(enumProjectStatus);
  }, []);
  return (
    <div className="z-20 flex flex-col items-center justify-center w-screen h-screen bg-black bg-opacity-90">
      <div className="flex flex-row justify-center items-center font-['Pretendard'] bg-[#242424] rounded-2xl border-solid border-[#8a8991] border-[0.1rem] h-[42rem] w-[40rem] text-white box-border">
        <div className="flex flex-col gap-[2.5rem] items-center w-full h-full p-[1.8rem_0_1.8rem_0]">
          {/*상단 제목, 스텝퍼*/}
          <div className=" flex flex-row justify-between box-border w-[85%] h-fit">
            <div className="break-words font-['Pretendard'] font-semibold text-[1.3rem] leading-[1.3] text-[#F1EEF9]">
              프로젝트의 기본 정보를 입력해주세요.
            </div>
            <div className="flex flex-row items-center justify-center box-sizing-border">
              <div className="rounded-[0.6rem] bg-[#AEAEC0] w-[1.1rem] h-[1.1rem] flex justify-center items-center">
                <span className="break-words font-['Pretendard'] font-medium text-[0.5rem] leading-[3.25] text-[#FFFFFF]">
                  1
                </span>
              </div>
              <div className="bg-[#AEAEC0] mx-[0.2rem] w-[2rem] h-[0.04rem]"></div>
              <div className="rounded-[0.6rem] bg-[#454545] w-[1.1rem] h-[1.1rem] flex justify-center items-center">
                <span className="break-words font-['Pretendard'] font-medium text-[0.5rem] leading-[3.25] text-[#FFFFFF]">
                  2
                </span>
              </div>
              <div className="bg-[#AEAEC0] mx-[0.2rem] w-[2rem] h-[0.04rem]"></div>
              <div className="rounded-[0.6rem] bg-[#454545] w-[1.1rem] h-[1.1rem] flex justify-center items-center">
                <span className="break-words font-['Pretendard'] font-medium text-[0.5rem] leading-[3.25] text-[#FFFFFF]">
                  3
                </span>
              </div>
            </div>
          </div>
          {/* 하단 입력 정보 전체*/}
          <div className="flex flex-col gap-[1.7rem] w-[85%] h-fit">
            {/* 선택 부분 */}
            <div className="gap-6 flex flex-col w-[100%] box-sizing-border">
              {/* 1열 */}
              <div className="m-[0_0_0.4rem_0] flex flex-row justify-between w-full box-sizing-border">
                {/* 좌측 */}
                <div className="flex flex-col gap-2">
                  <div className="w-[16rem] break-words font-['Pretendard'] font-normal text-[0.9rem] leading-[1.286] text-[#ECEFF5]">
                    프로젝트 시작일
                  </div>
                  <div className="flex flex-row justify-between m-[0_0_0_0] w-[16rem] break-words font-['Pretendard','Roboto_Condensed'] text-[0.8rem] leading-[1.5] text-[#9492A0] border-b-[0.05rem] border-solid">
                    {nowDate1}
                    <div className="cursor-pointer" onClick={calendarOpen1}>
                      <img src={calendarImg} className="inline" />
                    </div>
                  </div>
                </div>
                {isCalendarOpen1 && <Calendar onChange={handleDateChange1} dateKey={'start'} />}
                {/* 우측 */}
                <div className="flex flex-col gap-2">
                  <div className="w-[16rem] break-words font-['Pretendard'] font-normal text-[0.9rem] leading-[1.286] text-[#ECEFF5]">
                    프로젝트 종료일
                  </div>
                  <div className="flex flex-row justify-between m-[0_0_0_0] w-[16rem] break-words font-['Pretendard','Roboto_Condensed'] text-[0.8rem] leading-[1.5] text-[#9492A0] border-b-[0.05rem] border-solid">
                    {nowDate2}
                    <div className="cursor-pointer" onClick={calendarOpen2}>
                      <img src={calendarImg} className="inline" />
                    </div>
                  </div>
                  {isCalendarOpen2 && <Calendar onChange={handleDateChange2} dateKey={'end'} />}
                </div>
              </div>
              {/* 2열 */}
              <div className="m-[0_0_0.4rem_0] flex flex-row justify-between w-full box-sizing-border">
                {/* 좌측 */}
                <div className="flex flex-col gap-2">
                  <div className="w-[16rem] break-words font-['Pretendard'] font-normal text-[0.9rem] leading-[1.286] text-[#ECEFF5]">
                    진행기수
                  </div>
                  <div
                    onClick={dropDownLeftGisu}
                    className="cursor-pointer flex flex-row justify-between m-[0_0_0_0] w-[16rem] break-words font-['Pretendard','Roboto_Condensed'] text-[0.8rem] leading-[1.5] text-[#9492A0] border-b-[0.05rem] border-solid pb-1 "
                  >
                    {projectType}
                    <div>
                      <img src={dropdown} className="inline " />
                    </div>
                  </div>

                  {isDropDownOpen1 && (
                    <div className="absolute mt-12 bg-[rgba(148,146,160,1)] shadow-lg rounded-sm border-[1px] border-solid w-[16rem]">
                      {/* Dropdown 내용 */}
                      <ul className="w-full text-[0.8rem]">
                        <li
                          className="px-4 py-2 cursor-pointer  hover:bg-gray-100 hover:text-[black]"
                          onClick={handleChangeProjectType1}
                        >
                          부트캠프
                        </li>
                        <li
                          onClick={handleChangeProjectType2}
                          className="px-4 py-2 hover:bg-gray-100 hover:text-[black]  cursor-pointer"
                        >
                          팀 프로젝트
                        </li>
                        <li
                          onClick={handleChangeProjectType3}
                          className="px-4 py-2 hover:bg-gray-100 hover:text-[black] cursor-pointer"
                        >
                          개인 프로젝트
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                {/* 우측 */}
                <div className="flex flex-col gap-2">
                  <div className="w-[16rem] break-words font-['Pretendard'] font-normal text-[0.9rem] leading-[1.286] text-[#242424]">
                    진행기수
                  </div>
                  <div
                    onClick={dropDownRightGisu}
                    className="flex cursor-pointer flex-row justify-between m-[0_0_0_0] w-[16rem] break-words font-['Pretendard','Roboto_Condensed'] text-[0.8rem] leading-[1.5] text-[#9492A0] border-b-[0.05rem] border-solid pb-1 "
                  >
                    {year} {semester}
                    <div>
                      <img src={dropdown} className="inline" />
                    </div>
                  </div>
                  {isDropDownOpen2 &&
                    (projectType === '부트캠프' ? (
                      <div className="absolute mt-12 bg-[rgba(148,146,160,1)] shadow-lg rounded-sm border-[1px] border-solid w-[16rem]">
                        {/* Dropdown 내용 */}
                        <ul className="w-full text-[0.8rem]">
                          <li
                            className="px-4 py-2 cursor-pointer fontsize-[1rem] hover:bg-gray-100 hover:text-[black]"
                            onClick={handleChangeSemester1}
                          >
                            2024 동계
                          </li>
                          <li
                            onClick={handleChangeSemester2}
                            className="px-4 py-2 hover:bg-gray-100 hover:text-[black] cursor-pointer"
                          >
                            2024 하계
                          </li>
                          <li
                            onClick={handleChangeSemester3}
                            className="px-4 py-2 hover:bg-gray-100 hover:text-[black] cursor-pointer"
                          >
                            2023 동계
                          </li>
                          <li
                            onClick={handleChangeSemester4}
                            className="px-4 py-2 hover:bg-gray-100 hover:text-[black] cursor-pointer"
                          >
                            2023 하계
                          </li>
                          <li
                            onClick={handleChangeSemester5}
                            className="px-4 py-2 hover:bg-gray-100 hover:text-[black] cursor-pointer"
                          >
                            2022 동계
                          </li>
                          <li
                            onClick={handleChangeSemester6}
                            className="px-4 py-2 hover:bg-gray-100 hover:text-[black] cursor-pointer"
                          >
                            2022 하계
                          </li>
                        </ul>
                      </div>
                    ) : (
                      <div className="absolute mt-12 bg-[rgba(148,146,160,1)] shadow-lg rounded-sm border-[1px] border-solid w-[16rem]">
                        {/* Dropdown 내용 */}
                        <ul className="w-full text-[0.8rem]">
                          <li
                            className="px-4 py-2 cursor-pointer fontsize-[1rem] hover:bg-gray-100"
                            onClick={handleChangeYear1}
                          >
                            2024
                          </li>
                          <li onClick={handleChangeYear2} className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                            2023
                          </li>
                          <li onClick={handleChangeYear3} className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                            2022
                          </li>
                        </ul>
                      </div>
                    ))}
                </div>
              </div>
              {/* 3열 */}
              <div className="m-[0_0_0.4rem_0] flex flex-row  justify-between w-full box-sizing-border">
                {/* 좌측 */}
                <div className="flex flex-col gap-2">
                  <div className="w-[16rem] break-words font-['Pretendard'] font-normal text-[0.9rem] leading-[1.286] text-[#ECEFF5]">
                    프로젝트 형태
                  </div>
                  <div
                    onClick={dropDownLeftPlatform}
                    className="cursor-pointer flex flex-row justify-between m-[0_0_0_0] w-[16rem] break-words font-['Pretendard','Roboto_Condensed'] text-[0.8rem] leading-[1.5] text-[#9492A0] border-b-[0.05rem] border-solid pb-1 "
                  >
                    {platform}
                    <div>
                      <img src={dropdown} className="inline" />
                    </div>
                    {isDropDownOpen3 && (
                      <div className="absolute mt-6 bg-[rgba(148,146,160,1)] shadow-lg rounded-sm border-[1px] border-solid w-[16rem] border-white">
                        {/* Dropdown 내용 */}
                        <ul className="w-full text-[0.8rem]">
                          <li
                            className="px-4 py-2 cursor-pointer  hover:bg-gray-100 hover:text-[black] text-white"
                            onClick={handleChangePlatform1}
                          >
                            웹
                          </li>
                          <li
                            onClick={handleChangePlatform2}
                            className="px-4 py-2 hover:bg-gray-100 hover:text-[black] cursor-pointer text-white"
                          >
                            앱
                          </li>
                          <li
                            onClick={handleChangePlatform3}
                            className="px-4 py-2 hover:bg-gray-100 hover:text-[black] cursor-pointer text-white"
                          >
                            웹 앱
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                {/* 우측 */}
                <div className="flex flex-col gap-2">
                  <div className="w-[16rem] break-words font-['Pretendard'] font-normal text-[0.9rem] leading-[1.286] text-[#ECEFF5]">
                    프로젝트 상태
                  </div>
                  <div
                    onClick={dropDownRightPlatform}
                    className="cursor-pointer flex flex-row justify-between m-[0_0_0_0] w-[16rem] break-words font-['Pretendard','Roboto_Condensed'] text-[0.8rem] leading-[1.5] text-[#9492A0] border-b-[0.05rem] border-solid pb-1 "
                  >
                    {projectStatus}
                    <div>
                      <img src={dropdown} className="inline" />
                    </div>
                    {isDropDownOpen4 && (
                      <div className="absolute mt-6 bg-[rgba(148,146,160,1)] shadow-lg rounded-sm border-[1px] border-solid w-[16rem] border-white">
                        {/* Dropdown 내용 */}
                        <ul className="w-full text-[0.8rem]">
                          <li
                            className="px-4 py-2 cursor-pointer hover:bg-gray-100 hover:text-[black] text-white"
                            onClick={handleChangeService1}
                          >
                            서비스 운영 중
                          </li>
                          <li
                            onClick={handleChangeService2}
                            className="px-4 py-2 hover:bg-gray-100 hover:text-[black] cursor-pointer text-white"
                          >
                            서비스 중단
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* 프로젝트 링크 */}
            <div className="gap-[0.7rem] flex flex-col w-[100%] box-sizing-border">
              <span className="text-[#ECEFF5] text-[0.9rem] font-normal">프로젝트 링크</span>
              <div className="flex flex-col w-full gap-2">
                <span className="text-[#9492A0] text-[0.9rem] font-normal">Github</span>
                <div className="flex flex-row">
                  <div className="flex justify-center items-center rounded-l-[0.4rem] bg-[#9492A0] w-[5.1rem] h-[2.1rem]">
                    <img src={github} className="w-[1.4rem] h-[1.4rem] rounded-[0.4rem] " />
                  </div>
                  <label className="block w-full">
                    <input
                      value={githubLink}
                      onChange={githubChange}
                      type="text"
                      name=""
                      placeholder={githubLink || 'Github 링크를 입력하세요'}
                      required
                      className="rounded-r-[0.4rem] border-[#9492A0] border-solid border-[0.08rem] w-[100%] -ml-[0.08rem] pl-2 h-[2.1rem] text-[#9492A0] text-[0.8rem] font-['Pretendard'] bg-transparent focus:border-white focus:text-white outline-none"
                    />
                  </label>
                </div>
              </div>
              <div className="flex flex-col w-full gap-2">
                <span className="text-[#9492A0] text-[0.9rem] font-normal">Blog</span>
                <div className="flex flex-row">
                  <div className="flex justify-center items-center rounded-l-[0.4rem] bg-[#9492A0] w-[5.1rem] h-[2.1rem]">
                    <img src={blog} className="w-[1.4rem] h-[1.4rem] rounded-[0.4rem] " />
                  </div>
                  <label className="block w-full">
                    <input
                      value={blogLink}
                      onChange={blogChange}
                      type="text"
                      name=""
                      placeholder={blogLink || 'Blog 링크를 입력하세요'}
                      className="rounded-r-[0.4rem] border-[#9492A0] border-solid border-[0.08rem] w-[100%] -ml-[0.08rem] pl-2 h-[2.1rem] text-[#9492A0] text-[0.8rem] font-['Pretendard'] bg-transparent focus:border-white focus:text-white outline-none"
                    />
                  </label>
                </div>
              </div>
              <div className="flex flex-col w-full gap-2">
                <span className="text-[#9492A0] text-[0.9rem] font-normal">Website</span>
                <div className="flex flex-row">
                  <div className="flex justify-center items-center rounded-l-[0.4rem] bg-[#9492A0] w-[5.1rem] h-[2.1rem]">
                    <img src={internet} className="w-[1.4rem] h-[1.4rem] rounded-[0.4rem] " />
                  </div>
                  <label className="block w-full">
                    <input
                      value={websiteLink}
                      type="text"
                      onChange={websiteChange}
                      name=""
                      placeholder={websiteLink || 'Website 링크를 입력하세요'}
                      className="rounded-r-[0.4rem] border-[#9492A0] border-solid border-[0.08rem] w-[100%] -ml-[0.08rem] pl-2 h-[2.1rem] text-[#9492A0] text-[0.8rem] font-['Pretendard'] bg-transparent focus:border-white focus:text-white outline-none"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* 하단 버튼 */}
          <div className="rounded-[0.3rem] flex flex-row w-[85%] gap-2 justify-end box-sizing-border">
            <div
              onClick={prevStep}
              className="rounded-[0.3rem] bg-[#333333] flex flex-row justify-center items-center w-[4.2rem] h-[2.1rem] box-sizing-border cursor-pointer"
            >
              <span className="break-words font-medium text-[0.9rem] leading-[1.286] text-[#F1EEF9]">취소</span>
            </div>
            <div
              onClick={nextStep}
              className="rounded-[0.3rem] bg-[#8A8991] flex flex-row justify-center items-center w-[4.2rem] h-[2.1rem] box-sizing-border cursor-pointer"
            >
              <span className="break-words font-medium text-[0.9rem] leading-[1.286] text-[#F1EEF9)]">다음</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
