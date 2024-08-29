import { create } from 'zustand';

type AuthState = {
  loginId: string | null;
  nickname: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  setLoginId: (loginId: string) => void;
  setNickname: (nickname: string) => void;
  login: (loginId: string, accessToken: string, refreshToken: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  loginId: sessionStorage.getItem('loginId'),
  nickname: sessionStorage.getItem('nickname'),
  accessToken: sessionStorage.getItem('accessToken'),
  refreshToken: sessionStorage.getItem('refreshToken'),
  setLoginId: (loginId) => {
    set({ loginId });

    sessionStorage.setItem('loginId', loginId);
  },
  setNickname: (nickname) => {
    set({ nickname });

    sessionStorage.setItem('nickname', nickname);
  },
  login: (loginId: string, accessToken: string, refreshToken: string) => {
    set({ loginId, accessToken, refreshToken });

    sessionStorage.setItem('loginId', loginId);
    sessionStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('refreshToken', refreshToken);
  },
  logout: () => {
    set({ loginId: null, accessToken: null, refreshToken: null });

    sessionStorage.removeItem('loginId');
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    sessionStorage.removeItem('nickname');
  },
}));
