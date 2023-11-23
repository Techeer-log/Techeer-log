import styled from "styled-components";
import logo from "../assets/logo.png";
import moon from "../assets/Moon.png";
import magnifyingglass from "../assets/MagnifyingGlass.png";
import miniprofile from "../assets/MiniProfile.png";
import underpolygon from "../assets/UnderTri.png";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import LoginModal from "../components/LoginModal";
import { isLoggedInSelector,  } from "../states/Atom";
import { useState } from "react";
import Dropdown from "./Dropdown";

const Background = styled.div`
  width: 100vw;
  height: 5%;
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  position: relative;
  top: 20px;
`;

const Logo = styled.img`
  width: 28px;
  height: 28px;
`;

const Title = styled.p`
  display: flex;
  width: 130px;
  height: 25px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #ececec;
  text-align: center;
  font-family: Fira Mono;
  font-size: 1.3125rem;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
`;

const Theme = styled.img`
  width: 28px;
  height: 28px;
`;

const Search = styled.img`
  width: 28px;
  height: 28px;
`;
const WriteButton = styled.button`
  width: 111px;
  height: 41px;
  border-radius: 20px;
  border: 1px solid #ececec;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: transparent;
`;

const Button = styled.div`
  display: flex;
  width: 97px;
  height: 25px;
  flex-direction: column;
  justify-content: center;
  color: #ececec;
  text-align: center;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const MiniProfile = styled.img`
  width: 41px;
  height: 41px;
  border-radius: 41px;
  background: lightgray 50% / cover no-repeat;
  /* margin-right: 10%; */
`;

const Menu = styled.img`
  width: 15px;
  height: 8px;
  fill: #acacac;
  margin-top: 25%;
  /* margin-bottom: 25%; */
`;

const Left = styled.div`
  display: flex;
  flex-direction: row;
  left: 80px;
  gap: 18px;
  position: absolute;
`;

const Right = styled.div`
  display: flex;
  /* width: 100%; */
  right: 80px;
  gap: 18px;
  flex-direction: row;
  position: absolute;
  align-items: center;
  justify-content: center;
`;

const ModalWrapper = styled.div`
  position: absolute;
  z-index: 2;
`;

function NavBar() {
  const[showDropdown, setshowDropdown] = useState(false);
  const isLoggedIn = useRecoilValue(isLoggedInSelector);
  const [showLoginModal, setShowLoginModal] = useState(false); // 모달 보이기/감추기 상태

  // 로그인 모달을 보여주는 함수
  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  // 로그인 모달을 닫는 함수
  const handleCloseModal = () => {
    setShowLoginModal(false);
  };



  return (
    <Background>
      <Link to={"/"}>
        <Left>
          <Logo src={logo} />
          <Title>Console.log</Title>
        </Left>
      </Link>
      <Right>
        <Theme src={moon} />
        <Search src={magnifyingglass} />
        {isLoggedIn ? (
          <>
            <WriteButton>
              <Link to={"/posting"}>
                <Button>새 글 작성</Button>
              </Link>
            </WriteButton>
            <div style={{ display : "flex", gap:"1rem"}} onClick={()=>{setshowDropdown((prev)=>!prev)}}>
              <MiniProfile src={miniprofile} />
              <Menu src={underpolygon} />
            </div>
            {showDropdown && <Dropdown/>}
          </>
        ) : (
          <WriteButton onClick={handleLoginClick}>
              <Button>로그인</Button>
          </WriteButton>
        )}
      </Right>
      {showLoginModal && <ModalWrapper><LoginModal onClose={handleCloseModal} /></ModalWrapper>}
    </Background>
  );
}

export default NavBar;
