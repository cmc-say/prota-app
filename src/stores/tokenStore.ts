import {atom} from 'recoil';

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
