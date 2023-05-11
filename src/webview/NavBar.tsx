import styled from 'styled-components/native';

const Total = styled.View`
  background: #222738;
  width: 100%;
  height: 90px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  /* border-radius: 20 20 0 0; */
`;
const BtnBox = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  width: 22%;
  /* background-color: red; */
`;
const Img = styled.Image`
  width: 30px;
  height: 30px;
`;

const Name = styled.Text`
  font-weight: 600;
  font-size: 12px;
  color: #6a7395;
`;

function NavBar() {
  return (
    <Total>
      <BtnBox>
        <Img source={require('../assets/home_nav_icon.png')} />
        <Name>홈</Name>
      </BtnBox>
      <BtnBox>
        <Img source={require('../assets/search_world_nav_icon.png')} />
        <Name>세계관 탐색</Name>
      </BtnBox>
      <BtnBox>
        <Img source={require('../assets/my_world_nav_icon.png')} />
        <Name>내 세계관</Name>
      </BtnBox>
      <BtnBox>
        <Img source={require('../assets/my_page_nav_icon.png')} />
        <Name>마이페이지</Name>
      </BtnBox>
    </Total>
  );
}

export default NavBar;
