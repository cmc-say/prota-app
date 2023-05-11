import {View, Text} from 'react-native';
import WebView from 'react-native-webview';
import styled from 'styled-components/native';
import NavBar from './NavBar';

const Top = styled.SafeAreaView`
  background-color: #15161c;
`;

const Box = styled.View`
  background-color: red;
  flex: 1;
`;

function WebViewPage() {
  return (
    <Top>
      <Box>
        <WebView source={{uri: 'https://www.naver.com/'}} />
      </Box>
      <NavBar />
    </Top>
  );
}

export default WebViewPage;
