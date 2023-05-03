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

function Login({navigation}: any) {
  return (
    <Top>
      <Total
        activeOpacity={1.0}
        onPress={() => {
          navigation.replace('SocialLogin', {lazy: true});
        }}>
        <Test>화면을 터치하세요!</Test>
      </Total>
    </Top>
  );
}

export default Login;
