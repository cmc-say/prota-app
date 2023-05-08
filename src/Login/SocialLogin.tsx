import {Image} from 'react-native/types';
import styled from 'styled-components/native';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';
import {
  KakaoOAuthToken,
  getProfile as getKakaoProfile,
  login,
} from '@react-native-seoul/kakao-login';

const Test = styled.Text`
  margin-top: 200px;
  color: white;
`;

const Total = styled.TouchableOpacity`
  background-color: #15161c;
  flex: 1;
`;

const Top = styled.SafeAreaView`
  background-color: #15161c;
  flex: 1;
`;

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

const Btn2 = styled.TouchableOpacity`
  width: 340px;
  height: 46px;
  background: #ffffff;
  border-radius: 8px;
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
const Btns = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function SocialLogin({navigation}: any) {
  const [logins, setLogin] = useState<boolean>();
  const googleSigninConfigure = () => {
    GoogleSignin.configure({
      webClientId:
        '690314374484-5q7c7kbrr5n9434qu0n5n7gidahgfo8t.apps.googleusercontent.com',
    });
  };
  useEffect(() => {
    const checkLoggedIn = () => {
      auth().onAuthStateChanged(user => {
        if (user) {
          setLogin(true);
          console.log('loggedIn');
        } else {
          setLogin(false);
          console.log('loggedOut');
        }
      });
    };
    checkLoggedIn();
    googleSigninConfigure();
  }, []);
  const [loginResult, setLoginResult] = useState<string>('');

  const onPressGoogleBtn = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken} = await GoogleSignin.signIn();
      console.log('idToken : ', idToken);
      if (idToken) {
        setLoginResult(idToken);
      }
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      navigation.push('LogState');
    } catch (error) {
      console.log('Error during Google login:', error);
    }
  };

  const signInWithKakao = async (): Promise<void> => {
    try {
      const token: KakaoOAuthToken = await login();
      console.log('kakao token : ', token);
      setLoginResult(JSON.stringify(token));
      navigation.push('LogState');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Top>
      <Total
        activeOpacity={1.0}
        onPress={() => {
          navigation.replace('SocialLogin');
        }}>
        <Test>소셜 로그인</Test>
        <Btns>
          <Btn1
            onPress={() => {
              signInWithKakao();
            }}>
            <Img source={require('../assets/kakao.png')} />
            <Name>Kakao로 입장하기</Name>
          </Btn1>
          <Btn2
            onPress={() => {
              onPressGoogleBtn();
              console.log('clicked');
            }}>
            <Img source={require('../assets/Google.png')} />
            <Name>Google로 입장하기</Name>
          </Btn2>
        </Btns>
      </Total>
    </Top>
  );
}

export default SocialLogin;
