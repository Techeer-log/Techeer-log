import { useState, ChangeEvent, useEffect } from 'react';
import code from '/src/shared/assets/image/markdownImg/code.svg';
import quote from '/src/shared/assets/image/markdownImg/Get Quote.svg';
import link from '/src/shared/assets/image/markdownImg/Link.svg';
import strikethrough from '/src/shared/assets/image/markdownImg/Strikethrough.svg';
import italic from '/src/shared/assets/image/markdownImg/Italic.svg';
import * as textEdit from '../../entities/textEdit/index';
import { ImageUpload } from '../../entities/textEdit/ui/ImageUpload';
import { MarkdownView } from '.';
import useStore from '../../shared/store/store';

export const ProjectWrite = ({ setStep }: any) => {
  const [markdown, setMarkdown] = useState('');
  const {
    content,
    mainImageUrl,
    changecontent,
    leader,
    changenonRegisterProjectMemberRequestList,
    changeframeworkResponseList,
    frontframeworkRequestList,
    backframeworkRequestList,
    frontprojectMemberList,
    backprojectMemberList,
  } = useStore();

  const [projectMemberRequestList2, setProjectMemberRequestList2] = useState<any>([]);
  const [projectMemberRequestList3, setProjectMemberRequestList3] = useState<any>([]);
  const [projectFrameworkList2, setProjectFrameworkList2] = useState<any>([]);
  const [projectFrameworkList3, setProjectFrameworkList3] = useState<any>([]);
  useEffect(() => {
    setProjectMemberRequestList2([]);
    setProjectMemberRequestList3([]);
    frontprojectMemberList.map((item: any) => {
      projectMemberRequestList2.push({ name: item, projectMemberTypeEnum: 'FRONTEND' });
    });
    backprojectMemberList.map((item: any) => {
      projectMemberRequestList3.push({ name: item, projectMemberTypeEnum: 'BACKEND' });
    });
    changenonRegisterProjectMemberRequestList([
      ...projectMemberRequestList2,
      ...projectMemberRequestList3,
      { name: leader, projectMemberTypeEnum: 'LEADER' },
    ]);
    setProjectFrameworkList2([]);
    setProjectFrameworkList3([]);
    frontframeworkRequestList.map((item: any) => {
      projectFrameworkList2.push({ name: item, frameworkTypeEnum: 'FRONTEND' });
    });
    backframeworkRequestList.map((item: any) => {
      projectFrameworkList3.push({ name: item, frameworkTypeEnum: 'BACKEND' });
    });
    changeframeworkResponseList([...projectFrameworkList2, ...projectFrameworkList3]);

    if (mainImageUrl) {
      setMarkdown(`![](${mainImageUrl})` + '\n' + content);
      changecontent(`![](${mainImageUrl})` + '\n' + content);
    } else {
      setMarkdown(content);
      changecontent(content);
    }
  }, []);

  useEffect(() => {
    changecontent(markdown);
  }, [markdown]);

  // Markdown 내용이 변경될 때 호출되는 함수
  const onsetImageurl = (markdown: string) => {
    setMarkdown((prev) => prev + markdown);
  };
  const handleMarkdownChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value);
    changecontent(e.target.value);
  };
  const handleButtonH1Change = () => {
    if (markdown === '') setMarkdown('# ');
    else setMarkdown(markdown + '\n# ');
  };
  const handleButtonH2Change = () => {
    if (markdown === '') setMarkdown('## ');
    else setMarkdown(markdown + '\n## ');
  };
  const handleButtonH3Change = () => {
    if (markdown === '') setMarkdown('### ');
    else setMarkdown(markdown + '\n### ');
  };
  const handleButtonH4Change = () => {
    if (markdown === '') setMarkdown('#### ');
    else setMarkdown(markdown + '\n#### ');
  };
  const handleButtonBoldChange = () => {
    if (markdown === '') setMarkdown('**텍스트**');
    else setMarkdown(markdown + '\n**텍스트**');
  };
  const handleButtonTiltChange = () => {
    if (markdown === '') setMarkdown('_텍스트_');
    else setMarkdown(markdown + '\n_텍스트_');
  };
  const handleButtonStrikeThroughChange = () => {
    if (markdown === '') setMarkdown('~~텍스트~~');
    else setMarkdown(markdown + '\n~~텍스트~~');
  };
  const handleButtonCodeChange = () => {
    if (markdown === '') setMarkdown(markdown + '```' + '\n' + '코드' + '\n' + '```');
    else setMarkdown(markdown + '\n```' + '\n' + '코드' + '\n' + '```');
  };
  const handleLinkTextChange = () => {
    if (markdown === '') setMarkdown(markdown + '[링크텍스트](이곳에 주소를 입력하세요.)');
    else setMarkdown(markdown + '\n[링크텍스트](이곳에 주소를 입력하세요.)');
  };
  const handleButtonQuoteChange = () => {
    if (markdown === '') setMarkdown('> ');
    else setMarkdown(markdown + '\n' + '> ');
  };

  return (
    <div>
      <div className="flex flex-row items-center w-full h-[2.5rem] bg-[#212121] pl-[2.7rem]">
        <button
          onClick={handleButtonH1Change}
          className="w-12 h-fit flex items-center justify-center text-[#ACACAC] cursor-pointer bg-transparent outline-none border-none pt-[0.2rem]"
        >
          <div className="text-[1.125rem] font-bold">H1</div>
        </button>
        <button
          onClick={handleButtonH2Change}
          className="w-12 h-fit flex items-center justify-center text-[#ACACAC] cursor-pointer bg-transparent outline-none border-none pt-[0.2rem]"
        >
          <div className="text-[1.125rem] font-bold">H2</div>
        </button>
        <button
          onClick={handleButtonH3Change}
          className="w-12 h-fit flex items-center justify-center text-[#ACACAC] cursor-pointer bg-transparent outline-none border-none pt-[0.2rem]"
        >
          <div className="text-[1.125rem] font-bold">H3</div>
        </button>
        <button
          onClick={handleButtonH4Change}
          className="w-12 h-fit flex items-center justify-center text-[#ACACAC] cursor-pointer bg-transparent outline-none border-none pt-[0.2rem]"
        >
          <div className="text-[1.125rem] font-bold">H4</div>
        </button>
        <div className="h-[60%] ml-[0.6rem] w-0.5 bg-[#4D4D4D] mx-2"></div>
        <button
          onClick={handleButtonBoldChange}
          className="w-12 h-fit flex items-center justify-center text-[#ACACAC] cursor-pointer bg-transparent outline-none border-none pt-[0.2rem]"
        >
          <div className="text-[1.2rem] font-extrabold">B</div>
        </button>
        <button
          onClick={handleButtonTiltChange}
          className="flex items-center justify-center w-12 bg-transparent border-none outline-none cursor-pointer h-fit"
        >
          <img src={italic} className="flex w-[1.2rem]" />
        </button>
        <button
          onClick={handleButtonStrikeThroughChange}
          className="flex items-center justify-center w-12 bg-transparent border-none outline-none cursor-pointer h-fit"
        >
          <img src={strikethrough} className="flex w-[1.2rem]" />
        </button>
        <div className="h-[60%] w-0.5 bg-[#4D4D4D] mx-2"></div>
        <button
          onClick={handleButtonQuoteChange}
          className="flex items-center justify-center w-12 bg-transparent border-none outline-none cursor-pointer h-fit"
        >
          <img src={quote} className="flex w-[1.4rem]" />
        </button>
        <button
          onClick={handleLinkTextChange}
          className="flex items-center justify-center w-12 bg-transparent border-none outline-none cursor-pointer h-fit"
        >
          <img src={link} className="flex w-[1.3rem]" />
        </button>
        <ImageUpload setImageurl={onsetImageurl} />
        <button
          onClick={handleButtonCodeChange}
          className="flex items-center justify-center w-12 bg-transparent border-none outline-none cursor-pointer h-fit"
        >
          <img src={code} className="flex w-[1.3rem]" />
        </button>
      </div>
      {/* 텍스트 상자 */}
      <div className="flex flex-wrap w-auto h-[74vh]">
        {/* 왼쪽 박스 - editor */}
        <div className="flex flex-col w-1/2 border-solid border-r-[0.3rem] border-[#212121] h-full font-['Pretendard'] p-[2.5rem_3.5rem]">
          <textarea
            value={markdown}
            onChange={handleMarkdownChange}
            placeholder={'내용을 입력하세요. 가장 처음에 첨부된 이미지가 썸네일 이미지로 지정됩니다.'}
            className="bg-transparent inline-flex text-[1.2rem] outline-none cursor-text border-none text-gray-400 focus:text-white px-1 h-full w-full resize-none leading-6 overflow-y-auto"
          />
        </div>
        {/* 오른쪽 박스 - preview */}
        <div className="flex flex-col w-1/2 h-full font-['Pretendard'] p-[2.5rem_3.5rem] whitespace-pre-wrap overflow-y-scroll">
          <MarkdownView markdown={markdown} />
        </div>
      </div>
      <textEdit.bottomButtons setStep={setStep} />
    </div>
  );
};
