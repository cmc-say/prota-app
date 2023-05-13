import {useState} from 'react';
import styled from 'styled-components/native';

const Total = styled.View`
  background: #222738;
  width: 100%;
  height: 90px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  position: absolute;
  bottom: 0;
`;
const BtnBox = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  width: 22%;
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

const ClickedName = styled.Text`
  font-weight: 00;
  font-size: 12px;
  color: #efefef;
`;

function NavBar() {
  const [clicked, setClicked] = useState([true, false, false, false]);

  const onPressBtn = (id: number) => {
    const emptyArr = new Array(4).fill(false);
    emptyArr[id] = true;
    setClicked(emptyArr);
  };
  return (
    <Total>
      {clicked[0] ? (
        <BtnBox
          onPress={() => {
            onPressBtn(0);
          }}>
          <Img source={require('../assets/selected_home_nav_icon.png')} />
          <ClickedName>홈</ClickedName>
        </BtnBox>
      ) : (
        <BtnBox
          onPress={() => {
            onPressBtn(0);
          }}>
          <Img source={require('../assets/home_nav_icon.png')} />
          <Name>홈</Name>
        </BtnBox>
      )}
      {clicked[1] ? (
        <BtnBox
          onPress={() => {
            onPressBtn(1);
          }}>
          <Img
            source={require('../assets/selected_search_world_nav_icon.png')}
          />
          <ClickedName>세계관 탐색</ClickedName>
        </BtnBox>
      ) : (
        <BtnBox
          onPress={() => {
            onPressBtn(1);
          }}>
          <Img source={require('../assets/search_world_nav_icon.png')} />
          <Name>세계관 탐색</Name>
        </BtnBox>
      )}
      {clicked[2] ? (
        <BtnBox
          onPress={() => {
            onPressBtn(2);
          }}>
          <Img source={require('../assets/selected_my_world_nav_icon.png')} />
          <ClickedName>내 세계관</ClickedName>
        </BtnBox>
      ) : (
        <BtnBox
          onPress={() => {
            onPressBtn(2);
          }}>
          <Img source={require('../assets/my_world_nav_icon.png')} />
          <Name>내 세계관</Name>
        </BtnBox>
      )}
      {clicked[3] ? (
        <BtnBox
          onPress={() => {
            onPressBtn(3);
          }}>
          <Img source={require('../assets/selected_my_page_nav_icon.png')} />
          <ClickedName>마이페이지</ClickedName>
        </BtnBox>
      ) : (
        <BtnBox
          onPress={() => {
            onPressBtn(3);
          }}>
          <Img source={require('../assets/my_page_nav_icon.png')} />
          <Name>마이페이지</Name>
        </BtnBox>
      )}
    </Total>
  );
}

export default NavBar;
