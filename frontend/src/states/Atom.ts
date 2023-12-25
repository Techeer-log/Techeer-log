import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "sessionStorage",
  storage: sessionStorage,
});

export const accessTokenState = atom({
  key: "accessTokenState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const editTitle = atom({
  key: "editTitle",
  default: "",
});

export const editDetail = atom({
  key: "editDetail",
  default: "",
});

export const Titles = atom({
  key: "Titles",
  default: "",
});

export const Details = atom({
  key: "Details",
  default: "",
});

export const PostId = atom<string | undefined>({
  key: "PostId",
  default: "",
});

export const isLoggedInSelector = selector({
  key: "isLoggedInSelector",
  get: ({ get }) => {
    const accessToken = get(accessTokenState);
    return !!accessToken; // accessToken이 참일 때 true를 반환하고, 그렇지 않으면 false를 반환합니다.
  },
});

export const refreshTokenState = atom({
  key: 'refreshTokenState',
  default: '',
  effects_UNSTABLE:[persistAtom],
});

export const profileImageUrl = atom({
  key:'profileImageUrl',
  default:'',
  effects_UNSTABLE:[persistAtom],
})
