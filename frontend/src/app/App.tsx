import '../index.css';
import { RecoilRoot } from 'recoil';
import { GlobalStyle } from './style/globalStyle.ts';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { QueryProvider } from './QueryProvider.tsx';
import { anonymousToken } from '../shared/api';
import { useEffect, useState } from 'react';
import { setAccessToken } from '../shared/authorization/getToken.ts';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import NotOpen from '../shared/ui/NotOpen.tsx';

const initializeAnonymousToken = async () => {
  const accessToken = sessionStorage.getItem('accessToken');
  if (!accessToken) {
    const token = await anonymousToken();

    setAccessToken(token);
  }
};
function App() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isNotOpenTime, setIsNotOpenTime] = useState(false);

  // 시간으로 사이트 열고 닫기 설정 (시간 실정시 주석 해제)
  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const koreaTime = new Date(now.getTime() + now.getTimezoneOffset() * 60000 + 9 * 3600000); // UTC + 9
      const hours = koreaTime.getHours();

      if (hours >= 3 && hours <= 8) {
        setIsNotOpenTime(true);
      } else {
        setIsNotOpenTime(false);
        const init = async () => {
          await initializeAnonymousToken();
          setIsInitialized(true);
        };

        init();
      }
      //setIsNotOpenTime(false);
    };
    checkTime();
  }, []);

  if (isNotOpenTime) {
    return <NotOpen />;
  }

  if (!isInitialized) {
    return <div className="w-screen h-screen bg-[#111111]"></div>;
  }

  return (
    <RecoilRoot>
      <QueryProvider>
        <ReactQueryDevtools initialIsOpen={true} />
        <GlobalStyle />
        <RouterProvider router={router} />
      </QueryProvider>
    </RecoilRoot>
  );
}

export default App;
