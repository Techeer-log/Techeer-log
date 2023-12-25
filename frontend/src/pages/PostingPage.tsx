import styled from "styled-components";
import { useState, ChangeEvent, useRef, useEffect } from "react";
import MarkdownPreview from "../components/MarkdownPreview";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Details, Titles, accessTokenState } from "../states/Atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { motion } from "framer-motion";

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: #0c0c0c;
  display: flex;
  flex-direction: row;
`;

const LeftBox = styled.div`
  width: 50vw;
  height: 100vh;
  background: #121212;
`;

const Title = styled.div`
  max-height: 540px;

  padding-top: 2rem;
  padding-left: 3rem;
  padding-right: 3rem;
`;

const TitleWrite = styled.textarea`
  background: transparent;
  display: block;
  padding: 0px;
  font-size: 2.75rem;
  width: 100%;
  resize: none;
  line-height: 1.5;
  outline: none;
  border: none;
  font-weight: bold;
  font-family: inherit;
  color: #ececec;
  height: 66px;
  &::placeholder {
    color: #aaaaaa;
  }
`;

const Underbar = styled.div`
  background: rgb(73, 80, 87);
  height: 6px;
  width: 4rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  border-radius: 1px;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  background: var(--bg-page2);
  z-index: 10;
  transition: all 0.125s ease-in 0s;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  padding-left: 3rem;
  padding-right: 3rem;
  width: auto;
`;

const Scale = styled(motion.button)`
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  color: #acacac;
  cursor: pointer;
  background: none;
  outline: none;
  border: none;
  padding: 0px;
`;

const Font = styled.div`
  font-size: 1rem;
  font-weight: bold;
  font-family: serif;
`;

const Line = styled.div`
  width: 1px;
  height: 1.25rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  background: #4d4d4d;
`;

const Inside = styled.div`
  color: #ececec;
  font-size: 1.125rem;
  display: flex;
  flex-wrap: wrap;

  padding-left: 3rem;
  padding-right: 3rem;
  width: auto;
`;

const UnderBox = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  height: 4rem;
  width: 50%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px;
  background: #2e2e2e;
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  bottom: 0px;
`;

const BackButton = styled.button`
  height: 2.5rem;
  padding: 0.5rem 1rem;
  align-items: center;
  background: none;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  display: flex;
  outline: none;
  color: #ececec;
`;
/*
const TempSaveBtn = styled.button`
  height: 2.5rem;
  font-size: 1.125rem;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  font-weight: bold;
  outline: none;
  border: none;
  background: none;
  color: #96f2d7;
  border-radius: 4px;
  padding: 0px 1.25rem;
`;
*/
const SaveBtn = styled(motion.button)`
  height: 2.5rem;
  font-size: 1.125rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  border: none;
  background: #96f2d7;
  color: #121212;
  border-radius: 4px;
  padding: 0px 1.25rem;
  margin-left: 0.75rem;
`;

const Textarea = styled.textarea`
  background: transparent;
  display: inline-flex;
  outline: none;
  cursor: text;
  font-family: "Fira Mono", monospace;
  font-size: 18px;
  margin-bottom: 0.75rem;
  min-width: 8rem;
  border: none;
  color: #abbabf;
  padding: 0 0.1px 0 0;
  width: 100%;
  max-width: 54rem;
  height: 38rem;
  outline: none;
  resize: none;
  caret-color: #61afef;
  line-height: 1.5;
`;

const RightBox = styled.div`
  word-break: break-word;
  padding: 3rem;
  flex: 1 1 0%;
  overflow-y: auto;
  color: #ececec;
`;

function PostingPage() {
  const navigate = useNavigate();
  const [markdown, setMarkdown] = useState("");
  const [title, setTitle] = useState("");
  const accesstoken = useRecoilValue(accessTokenState);
  const setTitles = useSetRecoilState(Titles);
  const setDetails = useSetRecoilState(Details);

  const formData = new FormData();

  const handleGoBack = () => {
    navigate(-1); // 뒤로가기
  };

  const handleTitleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };
  // Markdown 내용이 변경될 때 호출되는 함수
  const handleMarkdownChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value);
  };
  const handleButtonH1Change = () => {
    setMarkdown(markdown + "# ");
  };
  const handleButtonH2Change = () => {
    setMarkdown(markdown + "## ");
  };
  const handleButtonH3Change = () => {
    setMarkdown(markdown + "### ");
  };
  const handleButtonH4Change = () => {
    setMarkdown(markdown + "#### ");
  };
  const handleButtonBoldChange = () => {
    setMarkdown(markdown + "**텍스트**");
  };
  const handleButtonTiltChange = () => {
    setMarkdown(markdown + "_텍스트_");
  };
  const handleButtonStrikeThroughChange = () => {
    setMarkdown(markdown + "~~텍스트~~");
  };
  const handleButtonCodeChange = () => {
    setMarkdown(markdown + "```" + "\n" + "코드" + "\n" + "```");
  };
  const handleLinkTextChange = () => {
    setMarkdown(markdown + "[링크텍스트](이곳에 주소를 입력하세요.)");
  };
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files.length === 1) {
      setSelectedImage(files[0]);
    }
  };
  const handleImageUpload = async () => {
    if (fileInputRef.current)
      (fileInputRef.current as HTMLInputElement).click();
  };

  useEffect(() => {
    const uploadImage = async () => {
      if (selectedImage) {
        try {
          formData.append("multipartFile", selectedImage);

          const response = await axios.post("api/image/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              authorization: accesstoken,
            },
          });

          setMarkdown(markdown + `![](${response.data.data})`);
          setSelectedImage(null);
        } catch (error) {
          alert("더 작은 용량의 이미지를 업로드해주세요!");
        }
      }
    };

    uploadImage();
  }, [selectedImage]);
  const handleButtonQuoteChange = () => {
    setMarkdown(markdown + "\n" + "> ");
  };
  const onSubmit = async () => {
    try {
      setTitles(title);
      setDetails(markdown);
      navigate("/writing");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Background>
      <LeftBox>
        <Title>
          <TitleWrite
            value={title}
            onChange={handleTitleChange}
            placeholder="제목을 입력하세요"
          />
          <Underbar />
        </Title>
        <Buttons>
          <Scale onClick={handleButtonH1Change}>
            <Font>
              H<span style={{ fontSize: "0.75rem" }}>1</span>
            </Font>
          </Scale>
          <Scale onClick={handleButtonH2Change}>
            <Font>
              H<span style={{ fontSize: "0.75rem" }}>2</span>
            </Font>
          </Scale>
          <Scale onClick={handleButtonH3Change}>
            <Font>
              H<span style={{ fontSize: "0.75rem" }}>3</span>
            </Font>
          </Scale>
          <Scale onClick={handleButtonH4Change}>
            <Font>
              H<span style={{ fontSize: "0.75rem" }}>4</span>
            </Font>
          </Scale>
          <Line />
          <Scale onClick={handleButtonBoldChange}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="0"
            >
              <path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"></path>
            </svg>
          </Scale>
          <Scale onClick={handleButtonTiltChange}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="0"
            >
              <path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z"></path>
            </svg>
          </Scale>
          <Scale onClick={handleButtonStrikeThroughChange}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="0"
            >
              <path d="M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z"></path>
            </svg>
          </Scale>
          <Line />
          <Scale onClick={handleButtonQuoteChange}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="0"
            >
              <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"></path>
            </svg>
          </Scale>
          <Scale onClick={handleLinkTextChange}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="0"
            >
              <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"></path>
            </svg>
          </Scale>
          <input
            style={{ display: "none" }}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
          />
          <Scale onClick={handleImageUpload}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="0"
            >
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"></path>
            </svg>
          </Scale>
          <Scale onClick={handleButtonCodeChange}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="0"
            >
              <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"></path>
            </svg>
          </Scale>
        </Buttons>
        <Inside>
          <Textarea
            value={markdown}
            onChange={handleMarkdownChange}
            rows={10}
            cols={100}
            placeholder="당신의 이야기를 적어보세요..."
          />
        </Inside>
        <UnderBox>
          <BackButton onClick={handleGoBack}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="0"
              style={{
                fontSize: "1.25rem",
                marginRight: "0.5rem",
              }}
            >
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
            </svg>
            <span
              style={{
                fontSize: "1.125rem",
              }}
            >
              나가기
            </span>
          </BackButton>
          <div>
            <SaveBtn whileHover={{ background: "#63E6BE" }} onClick={onSubmit}>
              출간하기
            </SaveBtn>
          </div>
        </UnderBox>
      </LeftBox>
      <RightBox>
        <h1
          style={{
            fontSize: "2.5em",
            marginBottom: "4rem",
            marginTop: "26.8px",
            fontWeight: "800",
          }}
        >
          {title}
        </h1>
        <div>
          <MarkdownPreview markdown={markdown} />
        </div>
      </RightBox>
    </Background>
  );
}

export default PostingPage;
