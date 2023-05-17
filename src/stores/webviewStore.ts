import WebView from 'react-native-webview';
import {atom} from 'recoil';

export const webviewGlobalRef = atom<WebView | null>({
  key: 'webviewGlobal',
  default: null,
});
