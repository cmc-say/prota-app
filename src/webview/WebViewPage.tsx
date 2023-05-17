import {View, Text, BackHandler, KeyboardAvoidingView} from 'react-native';
import {WebView, WebViewMessageEvent} from 'react-native-webview';
import styled from 'styled-components/native';
import NavBar from './NavBar';
import React, {useEffect, useState} from 'react';
import {ParsedMessage, WebviewContainerProps} from './webview.type';
import {useRecoilState} from 'recoil';
import {NavStatus, navStat} from '../stores/navStore';
import {webviewGlobalRef} from '../stores/webviewStore';
import {AtomLoginRequired, loginStatus} from '../stores/tokenStore';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MessageType} from '../../message.type';
import {WEBVIEW_INJECTED_JAVASCRIPT} from './webview.constant';

const Top = styled.SafeAreaView`
  background-color: #15161c;
  flex: 1;
`;

const Box = styled.KeyboardAvoidingView`
  /* background-color: red; */
  flex: 1;
`;

const WebViewPage: React.FC<WebviewContainerProps> = ({}) => {
  const [navStatus, setNavStatus] = useRecoilState(navStat);
  const [webviewRef, setRef] = useRecoilState(webviewGlobalRef);
  const [loginRequired] = useRecoilState(AtomLoginRequired);
  const [canGoBack, setGoBack] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginStatus);

  const inset = useSafeAreaInsets();

  const onHardwareBackPress = () => {
    if (webviewRef && canGoBack) {
      webviewRef.goBack();
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onHardwareBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onHardwareBackPress);
    };
  }),
    [canGoBack];

  const actLogin = async (accessToken: string) => {
    await AsyncStorage.setItem('accessToken', accessToken);
  };

  const actLogout = async () => {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.setItem('isLoggedIn', 'false');
    setIsLoggedIn(false);
  };

  const navAction = (url: string) => {
    const urlToNavStatusMap: {[urlPattern: string]: NavStatus} = {
      '/home': NavStatus.HOME,
      '/mypage': NavStatus.MY_PAGE,
      '/world/search': NavStatus.SEARCH_WORLD,
      '/world/my-world': NavStatus.MY_WORLD,
    };

    const findMatchedNavStatus = Object.entries(urlToNavStatusMap).find(
      ([urlPattern]) =>
        url.includes(urlPattern) && !url.includes(`${urlPattern}/`),
    );

    if (findMatchedNavStatus) {
      const [, navStatusValue] = findMatchedNavStatus;
      setNavStatus(navStatusValue);
    } else {
      setNavStatus(NavStatus.NO_NAV);
    }
  };

  const parseMessage = (e: WebViewMessageEvent): ParsedMessage => {
    return JSON.parse(e.nativeEvent.data);
  };

  const getMessageHandlers = (
    setIsCanGoBack: (value: boolean) => void,
    navAction: (url: string) => void,
    actLogin: (accessToken: string) => void,
    actLogout: () => void,
  ) => {
    return {
      [MessageType.LOG_IN]: (message: string) => actLogin(message),
      [MessageType.LOG_OUT]: actLogout,
      [MessageType.ROUTE]: (url: string, canGoBack: boolean) => {
        setIsCanGoBack(canGoBack);
        navAction(url);
      },
    };
  };

  const onMessageReceived = (e: WebViewMessageEvent) => {
    const data = parseMessage(e);
    const messageHandlers = getMessageHandlers(
      setGoBack,
      navAction,
      actLogin,
      actLogout,
    );

    if (data.type in messageHandlers) {
      if (data.type === MessageType.ROUTE) {
        messageHandlers[data.type](e.nativeEvent.url, e.nativeEvent.canGoBack);
      } else {
        messageHandlers[data.type](data.message!);
      }
    }
  };
  return (
    <Top>
      <Box>
        <WebView
          style={{
            overflow: 'hidden',
            marginBottom:
              navStatus === NavStatus.NO_NAV ? inset.bottom : inset.bottom + 90,
          }}
          source={{uri: 'http://localhost:3000'}}
          ref={setRef}
          onLoad={() => {
            webviewRef?.postMessage('');
          }}
          onMessage={onMessageReceived}
          sharedCookiesEnabled={true}
          injectedJavaScriptBeforeContentLoaded={`(function(){ window.loginRequired = ${JSON.stringify(
            loginRequired,
          )}; document.loginRequired = ${JSON.stringify(loginRequired)}; })();`}
          injectedJavaScript={WEBVIEW_INJECTED_JAVASCRIPT}
          automaticallyAdjustContentInsets={true}
        />
      </Box>
      {navStatus === NavStatus.NO_NAV ? null : <NavBar />}
    </Top>
  );
};

export default WebViewPage;
