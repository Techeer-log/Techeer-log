import { useEffect, useRef, useState } from 'react';
import * as api from '../index';
import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import cancelSearch from '../../../shared/assets/image/searchImg/Cancel-Search.svg';
import iconSearch from '../../../shared/assets/image/searchImg/Icon-Search.png';

export function Search({ setResult }: any) {
  const [searchresult, setSearchresult] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search') || '';
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const onSubmitSearch = (e: any) => {
    if (e.key === 'Enter' || e.key === 'Click' || e.type === 'click') {
      if (searchresult === '') {
        navigate('/');
      } else {
        navigate(`?search=${searchresult}`);
      }
    }
  };
  useEffect(() => {
    if (searchQuery) {
      setSearchresult(searchQuery);
    }
    searchMutation.mutate();
  }, [searchQuery]);

  const onChangeSearch = (e: any) => {
    setSearchresult(e.target.value);
  };
  const handleBlurContainer = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 200);
  };
  const searchMutation = useMutation({
    mutationFn: async () => {
      const response = await api.projectSearch(searchQuery);
      return response;
    },
    onSuccess: (data) => {
      setResult(data);
      if (searchQuery !== '') {
        const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
        const updatedSearches = [searchQuery, ...recentSearches.filter((item: string) => item !== searchQuery)];
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
      }
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  return (
    <>
      <div className="rounded-[6.25rem] w-[30rem] h-[3rem] m-[1.5rem_0_0_0] flex justify-center items-center border border-1 border-solid border-white border-opacity-90 bg-[#111111] bg-opacity-60 backdrop-blur-[24px]">
        <img
          onClick={() => searchMutation.mutate()}
          src={iconSearch}
          className="w-[0.938rem] h-[0.938rem] m-[0_0.625rem_0_0.625rem] cursor-pointer"
        />
        <input
          autoComplete="off"
          ref={inputRef}
          value={searchresult}
          onKeyDown={onSubmitSearch}
          onChange={onChangeSearch}
          type="text"
          name="search"
          placeholder="검색하실 내용을 입력해 주세요."
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlurContainer}
          className="w-[93%] h-[30px] bg-transparent font-['Pretendard-Light'] text-[15px] text-[#FFFFFF] placeholder-white placeholder-font-['Pretendard-Light'] focus:outline-none"
        />
        {isFocused && <api.DropdownSearch />}
        {searchresult.length > 0 && (
          <img
            onClick={() => {
              setSearchresult('');
              navigate('/');
            }}
            src={cancelSearch}
            className="w-[1.2rem] h-[1.2rem] m-[0_0.625rem_0_0] cursor-pointer"
          />
        )}
      </div>
    </>
  );
}
