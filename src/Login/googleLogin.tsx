import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useEffect} from 'react';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Config from 'react-native-config';
import {useRecoilState} from 'recoil';
import {AtomLoginRequired} from '../stores/tokenStore';

const Btn2 = styled.TouchableOpacity`
  width: 340px;
  height: 46px;
  background: #ffffff;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
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

const GoogleLogin = ({navigation}: any) => {
  const googleSigninConfigure = () => {
    GoogleSignin.configure({
      webClientId: Config.GOOGLE_CLIENT_ID,
    });
  };
  const [_, setLoginToken] = useRecoilState(AtomLoginRequired);

  const googleSignIn = async (): Promise<boolean> => {
    const deviceToken = (await AsyncStorage.getItem('fcmToken')) ?? '';
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken, user} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      console.log('google user id : ', user.id);
      setLoginToken({
        deviceToken: deviceToken,
        socialId: user.id,
        socialType: 'google',
      });
      navigation.replace('WebViewPage', {lazy: true});
      return true;
    } catch (error) {
      console.log('Error during Google login:', error);
      return false;
    }
  };
  useEffect(() => {
    googleSigninConfigure();
  }, []);

  return (
    <Btn2
      onPress={() => {
        googleSignIn();
        console.log('clicked');
      }}>
      <Img source={require('../assets/Google.png')} />
      <Name>Google로 입장하기</Name>
    </Btn2>
  );
};

export default GoogleLogin;
