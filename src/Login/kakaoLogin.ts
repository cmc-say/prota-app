import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  KakaoOAuthToken,
  getProfile as getKakaoProfile,
  getProfile,
  login,
} from '@react-native-seoul/kakao-login';
import axios from 'axios';

export const kakaoLogin = async ({navigation}: any): Promise<void> => {
  const deviceToken = await AsyncStorage.getItem('fcmToken');
  console.log('deviceToken ', deviceToken);
  try {
    const token: KakaoOAuthToken = await login();
    const profile = await getProfile();
    console.log('kakao token : ', token);
    console.log('kakao id : ', profile.id);
    axios({
      method: 'post',
      url: 'http://ec2-3-36-175-96.ap-northeast-2.compute.amazonaws.com:8080/api/v1/auth/login',
      data: {
        deviceToken: deviceToken,
        socialId: profile.id,
        socialType: 'kakao',
      },
    })
      .then(function (response) {
        console.log(response.data.data.accessToken);
        AsyncStorage.setItem('accessToken', response.data.data.accessToken);
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (err) {
    console.log(err);
  }
};
