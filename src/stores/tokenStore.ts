import {atom} from 'recoil';

export const loginStatus = atom({
  key: 'loginStatus',
  default: false,
});

type LoginRequired = {
  deviceToken: string;
  socialId: string;
  socialType: 'kakao' | 'apple' | 'google';
};

export const AtomLoginRequired = atom<LoginRequired>({
  key: 'tokenRequired',
  default: {
    deviceToken: '',
    socialId: '',
    socialType: 'kakao',
  },
});

export const AtomAccessToken = atom<string | undefined>({
  key: 'accessToken',
  default: undefined,
});
