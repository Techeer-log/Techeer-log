import styled from "styled-components";
import NavBar from "../components/NavBar";
import { AiOutlineClockCircle } from "react-icons/ai";
import more from "../assets/More.png";
import line from "../assets/Line.png";
// import LoginModal from "../components/LoginModal";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import nopost from "../assets/NoPost.png";
import { motion } from "framer-motion";

const Background = styled.div`
  width: 100vw;
  background: #121212;
  background-repeat: repeat-y;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
`;

const BackgroundNone = styled.div`
  width: 100vw;
  background: #121212;
  height: 100vh;
  background-repeat: repeat-y;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
`;
const Header = styled.div`
  width: 100%;
  height: 51px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 6.5rem;
`;

const Headers = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  width: 14rem;
  height: 100%;
  margin-left: 85px;
  margin-bottom: 1rem;
  gap: 20px;
`;

const NewWord2 = styled.a`
  color: #ececec;
  text-align: center;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const ButtonLine = styled.div`
  position: absolute;
  width: 50%;
  height: 2px;
  background: #e0e0e0;
  bottom: 0;
`;

const Buttonleft = styled.button`
  background-color: transparent;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: none;
  gap: 10px;
`;

const More = styled.img`
  width: 30px;
  height: 30px;
  position: absolute;
  right: 70px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
  margin-top: 32px;

  margin-left: auto;
  margin-right: auto;
  gap: 40px 55px;
`;

const Box = styled(motion.div)`
  width: 310px;
  height: 380px;
  background-color: #1e1e1e;
  border-radius: 10px;
  cursor: pointer;
`;

const MainImg = styled.img`
  width: 310px;
  height: 175.75px;
  border-radius: 10px;
`;

const MainImgNone = styled.div`
  width: 310px;
  height: 175.75px;
  border-radius: 10px;
`;

const Bottom = styled.div`
  padding-top: 12px;
`;

const Title = styled.p`
  display: flex;
  width: 100%;
  height: 32px;
  flex-direction: column;
  color: #fff;
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding-left: 16px;
`;

const Info = styled.p`
  display: flex;
  width: 100%;
  height: 43px;
  flex-direction: column;
  justify-content: center;
  color: #acacac;
  font-family: Inter;
  font-size: 0.75rem;
  line-height: 1.5;
  font-style: normal;
  font-weight: 400;
  padding: 16px;
  margin-top: 50px;
`;

const Line = styled.img`
  width: 100%;
  height: 1px;
  background: #403f3f;
`;

const DetailUnder = styled.div`
  display: flex;
  line-height: 1.5;
  justify-content: space-between;
  align-items: center;
  padding: 0.425rem 1rem;
`;

const ProfileImg = styled.img`
  border-radius: 50%;
  width: 23px;
  height: 23px;
  border-radius: 0.8rem;
`;

const Like = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #cfcfcf;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Posts = styled.div`
  width: 100%;
  display: flex;
  position: absolute;
  align-items: center;
  margin-top: 20rem;
  flex-direction: column;
`;

const NoPostImg = styled.img`
  width: 20rem;
`;

const NoPostWord = styled.p`
  display: flex;
  width: 392px;
  height: 89px;
  flex-direction: column;
  justify-content: center;
  color: #acacac;
  text-align: center;
  font-family: Inter;
  font-size: 2rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 3rem;
  margin-bottom: 2rem;
`;

// const ModalWrapper = styled.div`
//   position: absolute;
//   z-index: 2;
// `;

interface FormType {
  title: string;
  nickname: string;
  createdAt: string;
  commentCount: number;
  likeCount: number;
  id: number;
  profileImageUrl: string;
  mainImageUrl: string;
}

function MainPage() {
  const [lastPost, setLastPost] = useState(-2);
  const [posts, setPosts] = useState<FormType[]>([]);
  const [ref, inView] = useInView();
  const [pagenum, setPagenum] = useState(0);
  const [islastPost, setIsLastPost] = useState(false);

  //첫 포스트 요청
  const getPostList = (): void => {
    axios
      .get("api/v1/posts/list/0", {
        params: { page: pagenum, size: 10, sort: "desc" },
      })
      .then((res) => {
        setLastPost(res.data.data.posts[0].id + 1);
        setIsLastPost(res.data.data.lastpage);
        setPosts(res.data.data.posts);
        setPagenum((prev) => prev + 1);
      })
      .catch((error) => {
        console.log(error);
        setLastPost(-2);
      });
  };
  useEffect(() => {
    getPostList();
  }, []);
  useEffect(() => {
    if (pagenum == 1) {
      getPostList2();
    }
  }, [pagenum]);

  //무한 스크롤 요청
  const getPostList2 = (): void => {
    axios
      .get("api/v1/posts/list/0", {
        params: { page: pagenum, size: 10, sort: "desc" },
      })
      .then((res) => {
        const postsData = res.data.data.posts;
        setPosts((posts) => [...posts, ...postsData]);
        setIsLastPost(res.data.data.lastpage);
      })
      .catch(() => {
        setLastPost(-2);
      });
  };
  useEffect(() => {
    if (inView && islastPost) {
      getPostList2();
      setPagenum((prev) => prev + 1);
    }
  }, [inView]);

  return (
    <>
      {lastPost < -1 ? (
        <BackgroundNone>
          <NavBar />

          <Posts>
            <NoPostImg src={nopost} />
            <NoPostWord>포스트가 없습니다.</NoPostWord>
          </Posts>
        </BackgroundNone>
      ) : (
        <Background>
          <NavBar />
          <Header>
            <Headers>
              <Buttonleft>
                <AiOutlineClockCircle size="24" color="#ececec" />
                <NewWord2>최신</NewWord2>
                <ButtonLine />
              </Buttonleft>
            </Headers>
            <More src={more} />
          </Header>
          <Row>
            {posts.length > 0 &&
              posts.map((data: FormType, index) => (
                <Link to={`/board/${data.id}`}>
                  <Box
                    key={index}
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {data.mainImageUrl ? (
                      <MainImg src={data.mainImageUrl} />
                    ) : (
                      <MainImgNone></MainImgNone>
                    )}
                    <Bottom>
                      <Title>{data.title}</Title>
                      <Info>
                        작성일 : {data.createdAt.replace("T", " ")} ·{" "}
                        {data.commentCount}개의 댓글
                      </Info>
                      <Line src={line} />
                      <DetailUnder>
                        <a style={{ display: "flex", paddingTop: "4px" }}>
                          <ProfileImg src={data.profileImageUrl} />
                          <span style={{ color: "#fff", paddingLeft: "8px" }}>
                            <b
                              style={{
                                color: "#ECECEC",
                                fontWeight: "bold",
                                paddingLeft: "5px",
                              }}
                            >
                              {data.nickname}
                            </b>
                          </span>
                        </a>
                        <Like>❤︎ {data.likeCount}</Like>
                      </DetailUnder>
                    </Bottom>
                  </Box>
                </Link>
              ))}
            <div ref={ref}></div>
          </Row>

          {/* <ModalWrapper>
        <LoginModal />
      </ModalWrapper> */}
        </Background>
      )}
    </>
  );
}

export default MainPage;
