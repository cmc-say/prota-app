import React, {useCallback, useEffect} from 'react';
import {RecoilRoot} from 'recoil';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StatusBar} from 'react-native';
import SocialLogin from './src/Login/SocialLogin';
import LogState from './src/Login/LogState';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import WebViewPage from './src/webview/WebViewPage';

const Stack = createStackNavigator();

function App(): JSX.Element {
  StatusBar.setBarStyle('light-content');
  const getFcmToken = useCallback(async () => {
    const tokenExist = await AsyncStorage.getItem('fcmToken');
    console.log(tokenExist);
    if (!tokenExist) {
      const fcmToken = await messaging().getToken();
      AsyncStorage.setItem('fcmToken', fcmToken);
    }
  }, []);
  getFcmToken();
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            animationEnabled: false,
          }}>
          <Stack.Screen name="SocialLogin" component={SocialLogin} />
          <Stack.Screen name="LogState" component={LogState} />
          <Stack.Screen name="WebViewPage" component={WebViewPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
}

export default App;
