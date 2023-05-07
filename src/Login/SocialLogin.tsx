import {Image} from 'react-native/types';
import styled from 'styled-components/native';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';

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
  const googleSigninConfigure = () => {
    GoogleSignin.configure({
      webClientId:
        '690314374484-71nolahj4brgdci4upmoovinbuqv04sn.apps.googleusercontent.com',
      iosClientId:
        '690314374484-71nolahj4brgdci4upmoovinbuqv04sn.apps.googleusercontent.com',
    });
  };
  useEffect(() => {
    googleSigninConfigure();
  }, []);
  const [login, setLogin] = useState<string>();
  //   useEffect(() => {
  //     GoogleSignin.configure({
  //       webClientId:
  //         '690314374484-71nolahj4brgdci4upmoovinbuqv04sn.apps.googleusercontent.com',
  //     });
  //   }, []);

  const onPressGoogleBtn = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken} = await GoogleSignin.signIn();
      console.log('idToken : ', idToken);
      if (idToken) {
        setLogin(idToken);
      }
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      navigation.push('LogState');
    } catch (error) {
      console.log('Error during Google login:', error);
    }
  };

  return (
    <Top>
      <Total
        activeOpacity={1.0}
        onPress={() => {
          navigation.replace('SocialLogin');
        }}>
        <Test>소셜 로그인 부분</Test>
        <Btns>
          <Btn1>
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
