import {Image, Platform} from 'react-native';
import styled from 'styled-components/native';
import {lazy, useEffect, useState} from 'react';
import Lottie from 'lottie-react-native';
import {useAnimateHandler} from './Login.animation';
import {useRecoilState} from 'recoil';
import {AtomLoginRequired} from '../stores/tokenStore';
import {kakaoLogin} from './kakaoLogin';
import GoogleLogin from './googleLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';

const Total = styled.TouchableOpacity`
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
const Btns = styled.View`
  position: absolute;
  bottom: 90px;
  width: 100%;
  z-index: 3000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function SocialLogin({navigation}: any) {
  const [isTouched, setIsTouched] = useState(false);

  const {animationProgress, handleOnPress: handleAnimationClicked} =
    useAnimateHandler();
  const handleOnPress = async () => {
    const deviceToken = await AsyncStorage.getItem('accessToken');
    if (deviceToken) {
      navigation.replace('WebViewPage', {lazy: true});
    } else {
      setIsTouched(true);
      handleAnimationClicked();
    }
  };

  // const urlTest = Config.API_URL;
  // console.log('urlTest is : ', urlTest);

  return (
    <Total
      activeOpacity={1}
      onPress={() => {
        handleOnPress();
      }}>
      <Lottie
        style={{width: '100%'}}
        progress={animationProgress}
        source={require('../assets/lottie/splash.json')}
        loop={false}
        autoPlay
      />
      {isTouched && (
        <Btns>
          <Btn1
            onPress={() => {
              kakaoLogin({navigation});
            }}>
            <Img source={require('../assets/kakao.png')} />
            <Name>Kakao로 입장하기</Name>
          </Btn1>
          <GoogleLogin navigation={navigation} />
          {Platform.OS === 'ios' && (
            <Btn2
              onPress={() => {
                console.log('clicked');
              }}>
              <Img source={require('../assets/Apple.png')} />
              <Name>Apple로 입장하기</Name>
            </Btn2>
          )}
        </Btns>
      )}
    </Total>
  );
}

export default SocialLogin;
