import { useRef } from 'react';
import imgfile from '/src/shared/assets/image/markdownImg/Image.svg';
import * as textEdit from '../index';
import { useMutation } from '@tanstack/react-query';

export const ImageUpload = ({ setImageurl }: any) => {
  //const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files.length === 1) {
      // console.log(files[0]);
      uploadImageMutation.mutate(files[0]);
    }
  };
  const handleImageUpload = async () => {
    if (fileInputRef.current) (fileInputRef.current as HTMLInputElement).click();
  };

  const uploadImageMutation = useMutation({
    mutationFn: (selectedImage: File) => textEdit.uploadImage(selectedImage),
    onSuccess: (response: any) => {
      setImageurl(`![](${response})`);
    },
    onError: (error: any) => {
      console.error(error);
      alert('이미지 업로드에 실패하였습니다.');
    },
  });
  /* useEffect(() => {
    textEdit.uploadImage(selectedImage, formData, setSelectedImage, setImageurl, accessToken);
  }, [selectedImage]); */
  return (
    <>
      <>
        <input
          style={{ display: 'none' }}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
        />
        <button
          onClick={handleImageUpload}
          className="flex items-center justify-center w-12 bg-transparent border-none outline-none cursor-pointer h-fit"
        >
          <img src={imgfile} className="flex w-[1.4rem]" />
        </button>
      </>
    </>
  );
};
