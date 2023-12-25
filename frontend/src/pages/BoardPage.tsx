import styled from "styled-components";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
// import boardimg from "../assets/BoardImg.png";
import heartline from "../assets/Heart.png";
// import github from "../assets/GitHub.png";
// import mail from "../assets/Mail.png";
import { useNavigate, useParams } from "react-router-dom";
import MarkdownPreview from "../components/MarkdownPreview";
import axios from "axios";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { accessTokenState, editDetail, editTitle } from "../states/Atom";
import { motion } from "framer-motion";


const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: #121212;
  overflow-x: hidden;
`;

const Body = styled.div`
  /* background: #121212; */
  /* width: 100%; */
  height: 100vh;
  margin: 5% 20%;
  display: flex;
  flex-direction: column;
  /* overflow-x: hidden; */
`;

const Header = styled.div`
  margin: 20px 10px;
  justify-content: left;
`;

const Title = styled.div`
  color: #ececec;
  font-size: 50px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 45px;
`;

const BoardInfo = styled.div`
  display: flex;
  flex-direction: column;
  height: 30px;
  vertical-align: middle;
`;

const User = styled.p`
  color: #fff;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  /* line-height: normal; */
  margin-right: 10px;
`;

const DateTime = styled.p`
  color: #fff;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 200;
  /* line-height: normal; */
`;

const Views = styled.p`
  color: #fff;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 200;
  margin-top: 10px;
  /* line-height: normal; */
`;
// const KeyWord = styled.a`
//   border-radius: 20px;
//   background: #414141;
//   padding: 0.4rem 1rem;
//   margin-right: 20px;

//   color: #96f2d7;
//   font-size: 16px;
//   font-style: normal;
//   font-weight: 600;
//   line-height: normal;
// `;

// const KeyWordBox = styled.div`
//   display: flex;
//   flex-direction: row;
//   /* justify-content: center; */
//   align-items: center;
//   margin-top: 10px;
// `;

const Main = styled.div`
  margin-top: 5%;
  box-sizing: inherit;
  display: block;
  align-items: center;
`;

const Sentence = styled.p`
  box-sizing: inherit;
  margin: 5px 10px;
  color: #fff;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 1.6px;
`;

// const BoardImage = styled.img`
//   margin: auto;
//   display: block;
//   margin-bottom: 10%;
//   width: 546px;
//   height: 327px;
// `;

const Box = styled.div`
  box-sizing: inherit;
  display: block;
  position: relative;
  /* margin-top: 1rem; */
`;
const SideBox = styled.div`
  position: absolute;
  left: -7rem;
  box-sizing: inherit;
  //
`;
// const AbsoluteBox = styled.div`
//   position: absolute;
//   left: 100%;
//   box-sizing: inherit;
// `;
// const SideBoxRight = styled.div`
//   box-sizing: inherit;
//   display: flex;
//   flex-direction: column;
//   position: fixed;
//   width: 240px;
//   margin-left: 5rem;
//   border-left: 2px solid #2a2a2a;
//   padding: 0.25rem 0.75rem;
//   color: #acacac;
// `;

// const Summary = styled.p`
//   display: block;
//   margin-bottom: 8px;
//   font-size: 15px;
//   font-style: normal;
//   font-weight: 400;
//   line-height: normal;
// `;

const SideBoxLeft = styled.div`
  position: fixed;
  width: 4rem;
  background: #1e1e1e;
  border: 1px solid #2a2a2a;
  border-radius: 2rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CircleBox = styled(motion.div)`
  box-sizing: inherit;
  height: 3rem;
  width: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1e1e1e;
  border: 1px solid #4d4d4d;
  border-radius: 1.5rem;
  /* color: #acacac; */
  cursor: pointer;
  z-index: 5;
`;

const LikeNum = styled.div`
  margin-top: 0.5rem;
  color: #d9d9d9;
  line-height: 1;
  font-size: 0.75rem;
  font-weight: bold;
`;

const Like = styled(motion.img)`
  width: 24px;
  height: 24px;
`;

const Bottom = styled.div`
  box-sizing: inherit;
  margin-top: 30%;
  margin-bottom: 2rem;
  /* margin-left: auto;
    margin-right: auto; */
  display: block;
`;

const ProfileBox = styled.div`
  box-sizing: inherit;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;
const Profile = styled.div`
  display: flex;
  align-items: center;
`;

const UserBox = styled.div`
  box-sizing: inherit;
  height: 6rem;
  width: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 1.5rem;
  margin: 10px;
`;
const UserImg = styled.img`
  border-radius: 50%;
  width: 135px;
  height: 135px;
  border-radius: 4rem;
`;
const UserText = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
`;
const UserName = styled.p`
  margin-bottom: 10px;
  color: #ececec;
  font-size: 21px;
  font-style: normal;
  font-weight: 700;
`;

/* const HorizonLine = styled.div`
  width: 100%;
  height: 1px;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  background: #252525;
`;
const UserLink = styled.div`
  display: flex;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;
const GitHub = styled.img`
  margin: 0px 15px;
  margin-left: 0px;
  width: 35px;
  height: 35px;
  fill: #c0c0c0;
`;
const Mail = styled.img`
  margin: auto 10px;
  margin-top: 5px;
  margin-left: 0px;
  width: 38px;
  height: 32px;
`; */

const CommentArea = styled.div`
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
`;
const InputBox = styled.div`
  display: block;
`;
const CommentCnt = styled.p`
  color: #ececec;
  font-size: 19px;
  font-style: normal;
  font-weight: 600;
`;
const Input = styled.textarea`
  margin: 1.5rem 0px;
  height: 70px;
  width: 100%;
  padding: 1rem 1rem 1.5rem;
  outline: none;
  border: 1px solid #2a2a2a;
  border-radius: 4px;
  font-size: 1rem;
  color: #ececec;
  background: #1e1e1e;
  line-height: 1.75;
  min-height: 6rem;
  resize: none;
`;
const BtnWrapper = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 10px;
`;
const InputBtn = styled(motion.button)`
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background: #96f2d7;
  height: 2.5rem;
  padding: 0 1.5rem;

  color: #121212;
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  cursor: pointer;
`;

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3rem 0;
  border-bottom: 1px solid #2a2a2a;
`;

const CommentUserBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const CommentImg = styled.img`
  border-radius: 50%;
  width: 57px;
  height: 57px;
`;
const CommentInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 1rem;
`;
const CommentUser = styled.p`
  margin-bottom: 4px;
  color: #ececec;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
`;
const CommentTime = styled.p`
  color: #b8b8b8;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
`;
const EditBtn = styled.p`
  color: #b8b8b8;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  margin-right: 7px;
  cursor: pointer;

  &:hover{
    text-decoration: underline;
  }

`;
const DeleteBtn = styled.p`
  color: #b8b8b8;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  cursor: pointer;

  &:hover{
    text-decoration: underline;
  }

`;

const Comment = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 2.5rem;
`;

const CommentLine = styled.p`
  color: #ececec;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 0.5rem;
`;

const LikeBtn = styled.p`
  color: #b8b8b8;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  cursor: pointer;
  &:active{
    color: red;
  }

`;

const LikeCnt = styled.p`
  color: #b8b8b8;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  margin: 1rem 0rem;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: -1.25rem;
`;

const PutDelete = styled.button`
  margin-left: 0.5rem;
  padding: 0px;
  outline: none;
  border: none;
  background: none;
  font-size: inherit;
  cursor: pointer;
  color: #acacac;
`;

export default function BoardPage() {
  const { postId } = useParams();
  const [markdown, setMarkdown] = useState("");
  const [title, setTitle] = useState("");
  const [writer, setWriter] = useState("");
  const [date, setDate] = useState("");
  const [views, setViews] = useState(0);
  const [like, setLike] = useState(0);
  const [nickname, setNickname] = useState("");
  // const [profileImage, setProfileImage] = useState("");
  const accesstoken = useRecoilValue(accessTokenState);
  const seteditTitle = useSetRecoilState(editTitle);
  const seteditDetail = useSetRecoilState(editDetail);
  const [input, setInput] = useState("");
  const [editinput, setEditInput] = useState("");
  const [comments, setComments] = useState<Comments[]>([]);
  const [totalComments, setTotalComments] = useState(0);
  const [editcomment, setEditComment] = useState(false);
  const [editCommentId, setEditCommentId] = useState(0);
  const [imageURL, setImageURL] = useState("");
  // const [likecomment, setLikeComment] = useState(0);
  // const [likeornot, setLikeOrNot] = useState(false);

  // const imageURL = useRecoilValue(profileImageUrl);
  const navigate = useNavigate();

  const getNickName = (): void => {
    axios
      .get("/api/v1/members/profile", {
        headers: {
          authorization: accesstoken,
        },
      })
      .then((res) => {
        setNickname(res.data.data.nickname);
        // setImageURL(res.data.data.profileImageUrl);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getPost = (): void => {
    axios
      .get(`/api/v1/posts/${postId}`)
      .then((res) => {
        console.log(res.data.data.content);
        setMarkdown(res.data.data.content);
        setTitle(res.data.data.title);
        setWriter(res.data.data.nickname);
        setDate(res.data.data.createdAt);
        setViews(res.data.data.viewCount);
        setLike(res.data.data.likeCount);
        setImageURL(res.data.data.profileImageUrl);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getPost();
    getNickName();
    getComments();
  }, []);

  // useEffect(() => {
  //   // getComments();
  // }, [comments[].content]);

  const LikeCounting = async (): Promise<void> => {
    try {
      const response = await axios.put(
        `/api/v1/posts/${postId}/like`,
        {
          id: postId,
        },
        {
          headers: {
            authorization: accesstoken,
          },
        }
      );
      setLike(response.data.data.likeCount);
    } catch (error) {
      console.log(error);
    }
  };
  const LikeCounter = async (): Promise<void> => {
    try {
      await LikeCounting();
    } catch (error) {
      console.log(error);
    }
  };

  type Comments = {
      "commentId": number,
      "nickname": string,
      "content": string,
      "createdAt": string,
      "likeCount": number,
      "like": boolean,
      "profileImageUrl":string,
      "replies": Replies[],
  }

  type Replies = {
      "replyId": number,
      "nickname": string,
      "content": string,
      "createdAt": string,
      "likeCount": number,
      "like": boolean,
  }

  const onCommentSubmit = async()=>{
      // e.preventDefault();
      try {
          await axios.post(
              `/api/v1/posts/${postId}/comments`, 
              {"content": input}, 
              {
                  headers: {
                      authorization: accesstoken,
                  },
              }
          );

          getComments();

          setInput("");

      } catch (error) {
          console.log(error);
      }
  };

  const onEditComment = async(id:number)=>{
    try {
      await axios.put(
          `/api/v1/comments/${id}`, 
          {
            content: editinput,
          }, 
          {
            headers: {
              authorization: accesstoken,
            },
          }
        );

        setEditComment(false);
        setInput("");
        getComments();

    } catch (error) {
        console.log(error);
    }
};

// 수정버튼이 눌린 댓글의 아이디 저장 및 수정 모드 토글
const handleEditClick = (commentId:number) => {

  if( editCommentId==0 || editCommentId == commentId){
    //현재 수정 중인 댓글과 클릭된 댓글의 ID가 동일한 경우
    setEditCommentId(commentId); 
    setEditComment((prev) => !prev); 
  }else {
    //현재 수정 중인 댓글과 클릭된 댓글의 ID가 다른 경우
    setEditInput("");
    setEditCommentId(commentId); //현재 수정중인 댓글아이디 저장
    setEditComment(true); 
  }
  
}


  const getComments = async()=>{
    try {
      const response = await axios.get(`/api/v1/posts/${postId}/comments`);
      const commentsData = response.data.data.comments;
      setTotalComments(response.data.data.totalCount);
  
      if (commentsData.length > 0) {
        setComments(commentsData);
      } else {
        // 데이터가 비어있는 경우, 초기값인 빈 배열 []을 설정하여 UI에 빈 목록을 표시
        setComments([]);
      }
    } catch (error) {
      console.error('댓글 가져오기 실패:', error);
    }
  };

  const onDelete = async(commentId:number)=>{
    try{
      await axios.delete(`/api/v1/comments/${commentId}`,{          
        headers:{
          "Authorization": accesstoken,
        },
      });
      
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.commentId !== commentId)
      );
    } catch(error) {
      console.error("댓글 삭제 실패:",error);
    }
  }; 

  const onLikeComment = async (id:number): Promise<void> => {
    try{
        await axios.put(
        `/api/v1/comments/${id}/like`,
        {id},
        {
          headers: {
            authorization: accesstoken,
          },
        }
      );
      // setLikeOrNot(true);
      // console.log(response.data);
      // setLikeComment((prev) => prev + 1);
      getComments();

    }catch(error){
      console.log(error);
    }


  };
  
  const PutPost = (): void => {
    seteditTitle(title);
    seteditDetail(markdown);
    navigate(`/edit/${postId}`);
  };
  const DeletePost = (): void => {
    axios
      .delete(`/api/v1/posts/${postId}`, {
        headers: {
          authorization: accesstoken,
        },
      })
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Background>
      <NavBar />

      <Body>
        <Header>
          <Title>{title}</Title>
          {nickname !== writer ? (
            <BoardInfo>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <User>{writer} · </User>
                <DateTime>{date.replace("T", " ")}</DateTime>
              </div>
              <Views>조회 수 : {views}</Views>
            </BoardInfo>
          ) : (
            <BoardInfo>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <User>{writer} · </User>
                  <DateTime>{date.replace("T", " ")}</DateTime>
                </div>
                <Buttons>
                  <PutDelete onClick={PutPost}>수정</PutDelete>
                  <PutDelete onClick={DeletePost}>삭제</PutDelete>
                </Buttons>
              </div>
              <Views>조회 수 : {views / 2}</Views>
            </BoardInfo>
          )}

          {/* <KeyWordBox>
            <KeyWord>Javascript</KeyWord>
            <KeyWord>Javascript</KeyWord>
            <KeyWord>Javascript</KeyWord>
          </KeyWordBox> */}
          <Box>
            <SideBox>
              <SideBoxLeft>
                <CircleBox
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  onClick={LikeCounter}
                >
                  <Like src={heartline} />
                </CircleBox>
                <LikeNum>{like}</LikeNum>
              </SideBoxLeft>
            </SideBox>
          </Box>
          {/* <Box>
            <AbsoluteBox>
              <SideBoxRight>
                <Summary>사이드 프로젝트란 무엇일까?</Summary>
                <Summary>promise를 생성하는 방법</Summary>
                <Summary>promise를 생성하는 방법</Summary>
                <Summary>promise를 생성하는 방법</Summary>
              </SideBoxRight>
            </AbsoluteBox>
          </Box>  */}
        </Header>

        <Main>
          <Sentence>
            <MarkdownPreview markdown={markdown} />
          </Sentence>
        </Main>

        <Bottom>
          <ProfileBox>
            <Profile>
              <UserBox>
                <UserImg src={imageURL}></UserImg>
              </UserBox>
              <UserText>
                <UserName>{writer}</UserName>
              </UserText>
            </Profile>
            {/* <HorizonLine />
            <UserLink>
              <GitHub src={github} />
              <Mail src={mail} />
            </UserLink> */}
          </ProfileBox>
        </Bottom>

        <CommentArea>
            <InputBox>
                <CommentCnt>{totalComments}개의 댓글</CommentCnt>
                <Input 
                    placeholder="댓글을 작성하세요"
                    value={input}
                    onChange={(e)=>setInput(e.target.value)}
                />
                <BtnWrapper>
                    <InputBtn onClick={onCommentSubmit}>댓글 작성</InputBtn>
                </BtnWrapper>
            </InputBox>
            <div>
                {comments && comments.map((comment)=>(
                    <CommentBox key={comment.commentId}>
                        <CommentUserBox>
                          <div style={{ display: "flex", flexDirection: "row", alignItems:"center"}}>
                            <CommentImg src={comment.profileImageUrl}/>
                            <CommentInfo>
                                <CommentUser>{comment.nickname}</CommentUser>
                                <CommentTime>{comment.createdAt.replace("T", " ")}</CommentTime>
                            </CommentInfo>
                          </div>
                          <div style={comment.nickname == nickname ? ({ display: "flex", flexDirection: "row" }):({display: "none"})}>
                              <EditBtn onClick={()=>handleEditClick(comment.commentId)}>수정</EditBtn>
                              <DeleteBtn onClick={()=>onDelete(comment.commentId)}>삭제</DeleteBtn>
                          </div>
                        </CommentUserBox>

                        {(!editcomment || editCommentId !== comment.commentId) ? (
                          <div style={{ display: "flex", flexDirection: "column"} }>
                            <Comment>
                              <CommentLine>{comment.content}</CommentLine>
                              <LikeBtn onClick={()=>onLikeComment(comment.commentId)}>❤︎</LikeBtn>
                            </Comment>
                            <div>
                              <LikeCnt>공감 {comment.likeCount}</LikeCnt>
                            </div>
                          </div>
                          
                        ):(
                          <InputBox>
                            <Input 
                                placeholder="댓글을 작성하세요"
                                value={editinput}
                                onChange={(e)=>setEditInput(e.target.value)}
                            />
                            <BtnWrapper>
                                <InputBtn onClick={()=>onEditComment(comment.commentId)}>댓글 작성</InputBtn>
                            </BtnWrapper>
                          </InputBox>
                        )}
                        
                    </CommentBox>
                ))}
            </div>
            
        </CommentArea>
      </Body>
    </Background>
  );
}
