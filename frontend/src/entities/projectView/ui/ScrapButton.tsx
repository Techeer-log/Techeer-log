import { useState } from 'react';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa6';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postScrap, deleteScrap } from '../api/scrap.ts';
import { useAuthStore } from '../../../shared/store/authStore.ts';

export const ScrapButton = ({ projectId, scraped }: { projectId: number; scraped: boolean }) => {
  const [isScrapped, setIsScrapped] = useState<boolean>(scraped);
  const queryClient = useQueryClient();

  const postMutation = useMutation({
    mutationFn: (projectId: number) => postScrap(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projectData'] });
      //optimitic update적용 예정
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (projectId: number) => deleteScrap(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projectData'] });
    },
  });

  const { nickname } = useAuthStore();
  const handleClick = () => {
    if (!nickname) {
      alert('로그인이 필요합니다.');
      return;
    }
    setIsScrapped(!isScrapped);
    handleScrapCheck(!isScrapped);
  };
  const handleScrapCheck = (isScrapped: boolean) => {
    isScrapped ? postMutation.mutate(projectId) : deleteMutation.mutate(projectId);
  };

  return (
    <div
      onClick={handleClick}
      style={{ color: '#CCCCCC', fontSize: '1.5rem' }}
      className="cursor-pointer m-[0.1rem_0.2rem_0_0]"
    >
      {isScrapped ? <FaBookmark /> : <FaRegBookmark />}
    </div>
  );
};
