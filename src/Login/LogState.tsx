import auth from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {
  KakaoOAuthToken,
  getProfile as getKakaoProfile,
  logout,
  login,
  KakaoProfile,
  getProfile,
} from '@react-native-seoul/kakao-login';

const Total = styled.TouchableOpacity`
  background-color: #15161c;
  flex: 1;
`;

const Top = styled.SafeAreaView`
  background-color: #15161c;
  flex: 1;
`;
const Word = styled.Text`
  margin-top: 200px;
  color: white;
`;
const Btn = styled.TouchableOpacity`
  width: 340px;
  height: 46px;
  background: #ffffff;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const Name = styled.Text`
  font-weight: 500;
  font-size: 14px;
  color: #333333;
  margin-left: 5px;
`;

function LogState({navigation}: any) {
  const [login, setLogin] = useState<boolean>();
  const [result, setResult] = useState<string>();
  const [profile, setProfile] = useState<string>();

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
  }, []);

  const signOutWithKakao = async (): Promise<void> => {
    const message = await logout();

    setResult(message);
  };

  const getKakaoProfile = async (): Promise<void> => {
    const profile: KakaoProfile = await getProfile();
    setProfile(JSON.stringify(profile));
  };
  console.log(profile);
  return (
    <Top>
      <Total>
        <Word>로그인 된 상태!</Word>
        <Word>{profile}</Word>
        <Btn
          onPress={() => {
            auth().signOut();
            navigation.replace('SocialLogin');
          }}>
          <Name>로그아웃 하기</Name>
        </Btn>
        <Btn
          onPress={() => {
            signOutWithKakao();
            navigation.replace('SocialLogin');
          }}>
          <Name>카카오 로그아웃 하기</Name>
        </Btn>
        <Btn
          onPress={() => {
            getKakaoProfile();
            console.log('clicked');
          }}>
          <Name>카카오톡 프로필 정보 가져와줘</Name>
        </Btn>
      </Total>
    </Top>
  );
}

export default LogState;
