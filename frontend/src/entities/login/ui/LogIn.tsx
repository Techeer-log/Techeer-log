import { useState } from 'react';
import { useAuthStore } from '../../../shared/store/authStore';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../shared/api/axiosInstance.ts';
import idIcon from '../../../shared/assets/image/loginImg/Icon-Id.png';
import passwordIcon from '../../../shared/assets/image/loginImg/Icon-Password.png';

export function LogIn() {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginId(event.target.value);
  };

  const passwordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleClickLogin();
    }
  };

  const { login, setNickname, setLoginId: setAuthLoginId } = useAuthStore();
  const handleNickname = async () => {
    try {
      const response = await axiosInstance.get('/api/v1/members/profile');
      setNickname(response.data.data.nickname);
      setLoginId(response.data.data.loginId);
      navigate('/');
    } catch (error) {
      console.error('닉네임 정보를 가져오는데 실패했습니다', error);
    }
  };

  const handleLogin = async () => {
    try {
      // console.log('handleLogin: ', loginId, password);
      const response = await axiosInstance.post('/api/v1/auth/login', {
        loginId,
        password,
      });

      // 응답 헤더에서 토큰 정보 추출
      const newAccessToken = response.headers['authorization'];
      const newRefreshToken = response.headers['refresh-token'];

      login(loginId, newAccessToken, newRefreshToken);
      setAuthLoginId(loginId); // 추가: loginId를 상태로 설정

      handleNickname();
    } catch (error) {
      alert('로그인 정보를 확인해주세요.');
    }
  };

  const handleClickLogin = async () => {
    await handleLogin();
  };

  return (
    // 전체 배경
    <div className="bg-[#111111] bg-opacity-90 flex w-screen h-screen justify-center items-center">
      {/* 모달 이미지 배경 */}
      <div className="rounded-[1.25rem] bg-cover bg-[url('/src/shared/assets/image/loginImg/Background-Login.png')] bg-no-repeat flex flex-row w-[60rem] h-[37.5rem]">
        {/* 왼쪽 박스 텍스트 그룹 */}
        <div className="flex flex-col justify-center ml-8 box-sizing-border w-[55%] gap-2">
          <p className="break-words font-['Bayon'] font-normal text-[3rem] text-[#FFFFFF]">Techeer.log</p>
          <p className="break-words font-['Pretendard'] font-light text-[1rem] text-[#FFFFFF]">
            테커에서 진행한 <span className="font-['Pretendard-SemiBold']">다양한 프로젝트를 한눈에</span>
          </p>
        </div>
        {/* 오른쪽 박스 블러 배경 */}
        {/* 로그인 폼 */}
        <div className="gap-4 backdrop-blur-[1.25rem] rounded-r-[1.25rem] bg-[rgba(0,1,58,0.7)] flex flex-col justify-center items-center w-[31.875rem]">
          <div className="m-[0_0_4.625rem_0] inline-block break-words font-['Pretendard'] font-semibold text-[2.25rem] tracking-[0.044rem] leading-[1.333] text-[#F0F0F0]">
            로그인
          </div>
          {/* 아이디 입력 Input */}
          <div className="rounded-[0.375rem] border border-solid border-[#E2E2E2] border-1 relative flex flex-row w-[18.25rem] h-[3.125rem]">
            <div className="flex flex-row justify-center items-center p-[0.625rem]">
              <img className="w-[1.125rem] h-[1.125rem]" src={idIcon} />
            </div>
            {/* <span className="break-words font-['Pretendard'] font-normal text-[1rem] tracking-[0.019rem] leading-[3] text-[#BABABA]">
              아이디
            </span> */}
            <input
              type="text"
              name="id"
              placeholder="아이디"
              required
              className="w-[11.25rem] m-[0.625rem] bg-transparent font-['Pretendard'] text-[1rem] text-[#E2E2E2] focus:outline-none"
              value={loginId}
              onChange={loginIdChange}
              onKeyDown={handleKeyPress}
            />
          </div>
          {/* 비밀번호 입력 Input */}
          <div className="rounded-[0.375rem] border border-solid border-[#E2E2E2] border-1 relative flex flex-row w-[18.25rem] h-[3.125rem]">
            <div className="flex flex-row justify-center items-center p-[0.625rem]">
              <img className="w-[1.125rem] h-[1.125rem]" src={passwordIcon} />
            </div>
            {/* <span className="break-words font-['Pretendard'] font-normal text-[1rem] tracking-[0.019rem] leading-[3] text-[#BABABA]">
              비밀번호
            </span> */}
            <input
              type="password"
              name="password"
              placeholder="비밀번호"
              required
              className="w-[11.25rem] m-[0.625rem] bg-transparent font-['Pretendard'] text-[1rem] text-[#E2E2E2] focus:outline-none"
              value={password}
              onChange={passwordChange}
              onKeyDown={handleKeyPress}
            />
          </div>
          {/* 로그인 버튼 */}
          <div
            onClick={handleClickLogin}
            className="cursor-pointer rounded-[0.375rem] bg-[#4344E0] relative flex flex-row justify-center w-[292px]"
          >
            <button
              type="submit"
              className="relative break-words font-['Pretendard'] font-normal text-[1rem] tracking-[0.019rem] leading-[3] text-[#FFFFFF]"
            >
              로그인
            </button>
          </div>
          <span
            onClick={() => {
              navigate('/signup');
            }}
            className="cursor-pointer m-[0_0_0_0.063rem] break-words font-['Pretendard'] font-normal text-[1rem] underline tracking-[0.019rem] leading-[3] text-[#757575]"
          >
            회원가입
          </span>
        </div>
      </div>
    </div>
  );
}
