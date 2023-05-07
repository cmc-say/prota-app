import auth from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';
import styled from 'styled-components/native';

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
`;

const Name = styled.Text`
  font-weight: 500;
  font-size: 14px;
  color: #333333;
  margin-left: 5px;
`;

function LogState({navigation}: any) {
  const [login, setLogin] = useState<boolean>();
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
  return (
    <Top>
      <Total>
        <Word>로그인 된 상태!</Word>
        <Btn
          onPress={() => {
            auth().signOut();
            navigation.replace('SocialLogin');
          }}>
          <Name>로그아웃 하기</Name>
        </Btn>
      </Total>
    </Top>
  );
}

export default LogState;
