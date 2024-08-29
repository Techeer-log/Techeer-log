import { useState } from 'react';
import check from '../../../shared/assets/image/modalImg/check.svg';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import useStore from '../../../shared/store/store';
import infoIcon from '../../../shared/assets/image/infoIcon.png';

export const TechStackInfo = ({ setStep }: any) => {
  const [trigger1, setTrigger1] = useState<boolean>(false);
  const [trigger2, setTrigger2] = useState<boolean>(false);
  const {
    changefrontframeworkRequestList,
    changebackframeworkRequestList,
    frontframeworkRequestList,
    backframeworkRequestList,
  } = useStore();

  const [fronttags, setFrontTags] = useState<string[]>(frontframeworkRequestList);
  const [backtags, setBackTags] = useState<string[]>(backframeworkRequestList);

  const nextStep = () => {
    changefrontframeworkRequestList(fronttags);
    changebackframeworkRequestList(backtags);
    setStep('next');
  };
  const prevStep = () => {
    changefrontframeworkRequestList(fronttags);
    changebackframeworkRequestList(backtags);
    setStep('prev');
  };
  const handleFrontChange = (tag: string[]) => {
    const koreanRegex = /[\uac00-\ud7a3\u3131-\u318E\u1100-\u11FF]/;
    if (koreanRegex.test(tag[tag.length - 1]) && !trigger1) {
      setTrigger1(true);
    } else if (koreanRegex.test(tag[tag.length - 1]) && trigger1) {
      tag.pop();
      setTrigger1(false);
    }
    setFrontTags(tag);
  };
  const handleBackChange = (tag: string[]) => {
    const koreanRegex = /[\uac00-\ud7a3\u3131-\u318E\u1100-\u11FF]/;
    if (koreanRegex.test(tag[tag.length - 1]) && !trigger2) {
      setTrigger2(true);
    } else if (koreanRegex.test(tag[tag.length - 1]) && trigger2) {
      tag.pop();
      setTrigger2(false);
    }
    setBackTags(tag);
  };
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-black bg-opacity-90">
      <div className="flex flex-row justify-center items-center font-['Pretendard'] bg-[#242424] rounded-2xl border-solid border-[#8a8991] border-[0.1rem] h-[42rem] w-[40rem] text-white box-border">
        <div className="relative flex flex-col gap-[2.5rem] items-center w-[85%] h-[91%]">
          {/*상단 제목, 스텝퍼*/}
          <div className="flex flex-row justify-between box-border w-[100%] h-fit">
            <div className="break-words font-['Pretendard'] font-semibold text-[1.3rem] leading-[1.3] text-[#F1EEF9]">
              프로젝트에 사용한 기술을 입력해주세요.
            </div>
            <div className="flex flex-row items-center justify-center box-sizing-border">
              <div className="rounded-[0.6rem] bg-[#454545] w-[1.1rem] h-[1.1rem] flex justify-center items-center">
                <img src={check} className="flex items-center justify-center" />
              </div>
              <div className="bg-[#AEAEC0] mx-[0.2rem] w-[2rem] h-[0.04rem]"></div>
              <div className="rounded-[0.6rem] bg-[#AEAEC0] w-[1.1rem] h-[1.1rem] flex justify-center items-center">
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
          <div className="flex flex-wrap content-start w-[100%] mb-[-1rem] items-center">
            <img src={infoIcon} className="w-[1.2rem] h-[1.2rem]"></img>
            <div className="break-words font-['Pretendard'] font-semibold text-[1rem] leading-[1] ml-[0.3rem] text-[#5cd5bc]">
              각 기술에서 가장 처음에 등록된 태그가 대표 기술로 등록됩니다.
            </div>
          </div>
          {/* 하단 입력 정보 전체*/}
          <div className="flex flex-col gap-[1.7rem] w-[100%] h-fit">
            <div className="flex flex-col w-full gap-2">
              <span className="text-[#ECEFF5] text-[0.9rem] font-normal">Backend</span>
              <label className="block w-full">
                <TagsInput
                  value={backtags}
                  onChange={handleBackChange}
                  className="rounded-[0.4rem] border-[#9492A0] border-solid border-[0.08rem] w-[100%] pl-[0.3rem] h-[6.1rem] text-[#9492A0] text-[0.8rem] font-['Pretendard'] bg-transparent focus:border-white focus:text-white outline-none"
                  inputProps={{ placeholder: '백엔드 사용 기술을 입력 후 엔터를 눌러주세요.' }}
                />
              </label>
            </div>
            <div className="flex flex-col w-full gap-2">
              <span className="text-[#ECEFF5] text-[0.9rem] font-normal">Frontend</span>
              <label className="block w-full">
                <TagsInput
                  value={fronttags}
                  onChange={handleFrontChange}
                  className="rounded-[0.4rem] border-[#9492A0] border-solid border-[0.08rem] w-[100%] pl-[0.3rem] h-[6.1rem] text-[#9492A0] text-[0.8rem] font-['Pretendard'] bg-transparent focus:border-white focus:text-white outline-none"
                  inputProps={{ placeholder: '프론트엔드 사용 기술을 입력 후 엔터를 눌러주세요.' }}
                />
              </label>
            </div>
          </div>
          {/* 하단 버튼 */}
          <div className="absolute right-0 bottom-0 rounded-[0.3rem] flex flex-row w-[100%] gap-2 justify-end box-sizing-border">
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
