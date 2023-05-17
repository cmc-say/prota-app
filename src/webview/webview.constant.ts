export const BASE_URL = 'http://localhost:3000';

//https://prota-front.vercel.app

export const WEBVIEW_INJECTED_JAVASCRIPT = `
(function() {
  function wrap(fn) {
    return function wrapper() {
      var res = fn.apply(this, arguments);
      window.ReactNativeWebView.postMessage('{"type": "ROUTE"}');
      return res;
    };
  }

  history.pushState = wrap(history.pushState);
  history.replaceState = wrap(history.replaceState);
  window.addEventListener('popstate', function() {
    window.ReactNativeWebView.postMessage('{"type": "ROUTE"}');
  });
})();
`;
