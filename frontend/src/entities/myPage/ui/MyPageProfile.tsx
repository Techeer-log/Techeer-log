import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProfile, ProfileModal } from '../index.ts';

export const MyPageProfile = () => {
  const [isModal, setIsModal] = useState(false);

  // 프로필 수정 모달
  const modalOpen = () => {
    setIsModal(true);
  };

  //프로필 불러오기
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => getProfile(),
  });

  if (isLoading) {
    return <div className="w-full h-full bg-transparent">Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (data) {
    return (
      <div className="flex flex-col items-center">
        {!isModal ? (
          <>
            <div className="rounded-[16.3rem] flex flex-row w-[100%] box-sizing-border justify-center">
              <button className="cursor-default rounded-[16.3rem] border bg-[50%_50%] bg-cover bg-no-repeat m-[1rem_5.6rem_0_0] w-[9.4rem] h-[9.4rem]">
                <img className="w-full h-full rounded-[16.3rem]" src={data.profileImageUrl}></img>
              </button>
              <div className="m-[0_0_0.1rem_0] flex flex-col box-sizing-border">
                <div className="m-[0_0_1.1rem_0] inline-block self-start break-words font-['Pre-S'] font-semibold text-[2.5rem] text-[#0047FF]">
                  {data.loginId}
                </div>
                <div className="m-[0_0_0.7rem_0] flex flex-row self-start w-[fit-content] box-sizing-border">
                  <span className="m-[0_0.7rem_0_0] break-words font-['Pre-S'] font-semibold text-[1.5rem] text-[#B3B3B3]">
                    {data.nickname}
                  </span>
                </div>
                <span className="w-[20rem] h-[5rem] break-words font-['Pre-R'] font-normal text-[1.6rem] text-[#EDEDED]">
                  {data.introduction}
                </span>
              </div>
            </div>
            <div
              onClick={modalOpen}
              className="rounded-[0.3rem] m-[3.8rem_7rem_11.1rem_0] bg-[#8A8991] flex flex-row justify-center items-center w-[8rem] h-[2.1rem] box-sizing-border cursor-pointer"
            >
              <span className="break-words font-medium text-[0.9rem] leading-[1.286] text-[#F1EEF9)]">
                프로필 수정하기
              </span>
            </div>
          </>
        ) : (
          <ProfileModal setIsModal={setIsModal} id={data.loginId} />
        )}
      </div>
    );
  }
};
