import {Image} from 'react-native/types';
import styled from 'styled-components/native';

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
          <Btn2>
            <Img source={require('../assets/Google.png')} />
            <Name>Google로 입장하기</Name>
          </Btn2>
        </Btns>
      </Total>
    </Top>
  );
}

export default SocialLogin;
