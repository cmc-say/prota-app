import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  KakaoOAuthToken,
  getProfile as getKakaoProfile,
  getProfile,
  login,
} from '@react-native-seoul/kakao-login';
import axios from 'axios';
import Config from 'react-native-config';

export const kakaoLogin = async ({navigation}: any): Promise<void> => {
  const deviceToken = await AsyncStorage.getItem('fcmToken');
  console.log('deviceToken ', deviceToken);
  try {
    const token: KakaoOAuthToken = await login();
    const profile = await getProfile();
    console.log('kakao id : ', profile.id);
    axios({
      method: 'post',
      url: `${Config.API_URL}/api/v1/auth/login`,
      data: {
        deviceToken: deviceToken,
        socialId: profile.id,
        socialType: 'kakao',
      },
    })
      .then(function (response) {
        console.log(response.data.data.accessToken);
        AsyncStorage.setItem('accessToken', response.data.data.accessToken);
        navigation.replace('WebViewPage', {lazy: true});
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (err) {
    console.log(err);
  }
};
