import { createBrowserRouter } from 'react-router-dom';
import MainPage from '../../pages/MainPage.tsx';
import { MyPage } from '../../entities/myPage';
import { SignUp } from '../../entities/signup';
import { LogIn } from '../../entities/login';
import { ProjectInfo } from '../../entities/projectInputModal';
import { ProjectPage, ProjectWritePage } from '../../pages';
import { ProjectEditPage } from '../../pages/ProjectEditPage.tsx';
import { BootCampPage } from '../../pages/bootcamp/BootCampPage.tsx';
import { BootCampProjectPage } from '../../pages/bootcamp/BootCampProjectPage.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/mypage',
    element: <MyPage />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/login',
    element: <LogIn />,
  },
  {
    path: '/projectview/:param',
    element: <ProjectPage />,
  },
  {
    path: '/modal',
    element: <ProjectInfo />,
  },
  {
    path: '/projectwrite',
    element: <ProjectWritePage />,
  },
  {
    path: '/project/edit/:param',
    element: <ProjectEditPage />,
  },
  {
    path: '/2024-summer-bootcamp/:param',
    element: <BootCampPage />,
  },
  {
    path: '/2024-summer-bootcamp/project/:param',
    element: <BootCampProjectPage />,
  },
]);
