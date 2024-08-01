import { useParams } from 'react-router-dom';
import { Header } from './ui/Header.tsx';
import { Project } from '../Project/ui/Project.tsx';
import Footer from '../../shared/ui/Footer.tsx';

export const BootCampProjectPage = () => {
  const { param } = useParams<string>();
  if (!param) {
    console.log('Project ID not found');
    return <div>404 not found</div>;
  }

  const projectId = parseInt(param, 10);

  return (
    <>
      <Header />
      <div className="bg-[#111111] h-[2rem]" />
      <Project projectId={projectId} />
      <Footer />
    </>
  );
};
