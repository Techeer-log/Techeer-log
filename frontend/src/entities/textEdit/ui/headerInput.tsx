/* 상단 제목, 한 줄 소개 */

import { ChangeEvent, useState } from 'react';
import useStore from '../../../shared/store/store';

export const HeaderInput = () => {
  const { changeTitle, changeSubtitle } = useStore();
  const preTitle = useStore.getState().title;
  const preSubTitle = useStore.getState().subtitle;
  const [title, setTitle] = useState<string>(preTitle);
  const [subtitle, setSubtitle] = useState<string>(preSubTitle);

  const titleonchange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    changeTitle(e.target.value);
  };
  const subonChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSubtitle(e.target.value);
    changeSubtitle(e.target.value);
  };

  return (
    <div className="flex flex-col w-full h-[11.5rem] gap-2 font-['Pretendard'] p-[2.5rem_3.5rem_1rem_3.5rem] box-sizing-border">
      <label className="block w-full">
        <input
          value={title}
          onChange={titleonchange}
          type="text"
          name=""
          placeholder={preTitle || '프로젝트 명을 작성하세요.'}
          required
          className="w-[100%] h-[4rem] text-[#9492A0] text-[2rem] font-['Pretendard'] font-medium bg-transparent focus:text-white outline-none"
        />
      </label>
      <label className="block w-full">
        <input
          value={subtitle}
          onChange={subonChange}
          type="text"
          name=""
          placeholder={preSubTitle || '프로젝트를 한 줄로 소개해보세요.'}
          required
          className="w-[100%] h-[3rem] text-[#9492A0] text-[1.3rem] font-['Pretendard'] bg-transparent focus:text-white outline-none"
        />
      </label>
    </div>
  );
};
