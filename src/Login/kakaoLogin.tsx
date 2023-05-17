import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  KakaoOAuthToken,
  getProfile as getKakaoProfile,
  getProfile,
  login,
} from '@react-native-seoul/kakao-login';
import axios from 'axios';
import Config from 'react-native-config';
import {useRecoilState} from 'recoil';
import {AtomLoginRequired} from '../stores/tokenStore';
import styled from 'styled-components/native';

const Btn1 = styled.TouchableOpacity`
  width: 340px;
  height: 46px;
  background: #fee500;
  border-radius: 8px;
  margin-bottom: 8px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Img = styled.Image`
  width: 16px;
  height: 16px;
  margin-right: 5px;
`;

const Name = styled.Text`
  font-weight: 500;
  font-size: 14px;
  color: #333333;
  margin-left: 5px;
`;

const KakaoLogin = ({navigation}: any) => {
  const [_, setLoginToken] = useRecoilState(AtomLoginRequired);
  const kakaoLogin = async ({navigation}: any): Promise<void> => {
    const deviceToken = (await AsyncStorage.getItem('fcmToken')) ?? '';
    console.log('deviceToken ', deviceToken);
    try {
      const token: KakaoOAuthToken = await login();
      const profile = await getProfile();
      console.log('kakao id : ', profile.id);
      setLoginToken({
        deviceToken: deviceToken,
        socialId: profile.id,
        socialType: 'kakao',
      });
      navigation.replace('WebViewPage', {lazy: true});
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Btn1
      onPress={() => {
        kakaoLogin({navigation});
      }}>
      <Img source={require('../assets/kakao.png')} />
      <Name>Kakao로 입장하기</Name>
    </Btn1>
  );
};

export default KakaoLogin;
