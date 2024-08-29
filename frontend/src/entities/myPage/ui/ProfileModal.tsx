import * as textEdit from '../../textEdit/index.ts';
import { useMutation } from '@tanstack/react-query';
import { changeProfile } from '../index.ts';
import { useRef, useState } from 'react';
import TextField from '@mui/material/TextField';

type ProfileModalProps = {
  setIsModal: (value: boolean) => void;
  id: string;
};
export const ProfileModal = ({ setIsModal, id }: ProfileModalProps) => {
  const fileInputRef = useRef(null);
  const [newNickname, setNewNickname] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [newProfileImageUrl, setNewProfileImageUrl] = useState('');
  const [nowImage, setNowImage] = useState<File | null>(null);

  // 프로필 이미지 설정
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files.length === 1) {
      uploadImageMutation.mutate(files[0]);
      setNowImage(files[0]);
    }
  };
  const handleImageUpload = async () => {
    if (fileInputRef.current) (fileInputRef.current as HTMLInputElement).click();
  };

  const uploadImageMutation = useMutation({
    mutationFn: (selectedImage: File) => textEdit.uploadImage(selectedImage),
    onSuccess: (response: any) => {
      setNewProfileImageUrl(response);
    },
    onError: (error: any) => {
      console.error(error);
      alert('이미지 업로드에 실패하였습니다.');
    },
  });

  const submitProfileChange = () => {
    if (newNickname === '' || introduction === '') {
      alert('닉네임과 한 줄 소개를 입력해주세요.');
    } else {
      const formData = new FormData();
      const data = {
        nickname: newNickname,
        introduction: introduction,
      };
      const jsonData = JSON.stringify(data);
      formData.append('data', jsonData);
      if (nowImage) {
        formData.append('part', nowImage);
      }
      changeProfileMutation.mutate(formData);
      setIsModal(false);
    }
  };
  // 프로필 수정
  const changeProfileMutation = useMutation({
    mutationFn: (formData: any) => changeProfile(formData),
    onSuccess: () => {
      alert('프로필 수정이 완료되었습니다.');
      window.location.reload();
    },
    onError: (error: any) => {
      console.error(error);
      alert('이미지 업로드에 실패하였습니다.');
    },
  });
  return (
    <>
      <div className="rounded-[16.3rem] flex flex-row w-[100%] box-sizing-border justify-center">
        <input
          style={{ display: 'none' }}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
        />
        <button
          onClick={handleImageUpload}
          className="rounded-[16.3rem] border bg-[50%_50%] bg-cover bg-no-repeat m-[1rem_5.6rem_0_0] w-[9.4rem] h-[9.4rem]"
        >
          {newProfileImageUrl !== '' ? (
            <img className="w-full h-full rounded-[16.3rem]" src={newProfileImageUrl}></img>
          ) : (
            <div className="text-white">이미지 변경하기</div>
          )}
        </button>
        <div className="flex flex-col box-sizing-border">
          <div className="m-[0_0_1rem_0] inline-block self-start break-words font-['Pre-S'] font-semibold text-[2.5rem] text-[#0047FF]">
            {id}
          </div>
          <div className="m-[0_0_1rem_0] flex flex-row self-start w-[fit-content] box-sizing-border">
            <TextField
              label="닉네임"
              autoComplete="off"
              value={newNickname}
              onChange={(e) => setNewNickname(e.target.value)}
              InputLabelProps={{ style: { color: '#CCCCCC' } }}
              InputProps={{
                sx: {
                  color: '#CCCCCC',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#CCCCCC',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#AAAAAA', // hover 시 border 색상
                  },
                },
              }}
            />
          </div>
          <TextField
            label="한 줄 소개"
            autoComplete="off"
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            InputLabelProps={{ style: { color: '#CCCCCC' } }}
            InputProps={{
              sx: {
                width: '20rem',
                color: '#CCCCCC',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#CCCCCC',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#AAAAAA', // hover 시 border 색상
                },
              },
            }}
          />
        </div>
      </div>
      <div className="flex flex-row gap-[1rem] ml-[-3rem]">
        <div
          onClick={() => setIsModal(false)}
          className="rounded-[0.3rem] m-[2.8rem_0rem_0_0] bg-[#8A8991] flex flex-row justify-center items-center w-[8rem] h-[2.1rem] box-sizing-border cursor-pointer"
        >
          <span className="break-words font-medium text-[0.9rem] leading-[1.286] text-[#F1EEF9)]">취소</span>
        </div>
        <div
          onClick={() => submitProfileChange()}
          className="rounded-[0.3rem] m-[2.8rem_0rem_10.4rem_0] bg-[#8A8991] flex flex-row justify-center items-center w-[8rem] h-[2.1rem] box-sizing-border cursor-pointer"
        >
          <span className="break-words font-medium text-[0.9rem] leading-[1.286] text-[#F1EEF9)]">프로필 수정완료</span>
        </div>
      </div>
    </>
  );
};
