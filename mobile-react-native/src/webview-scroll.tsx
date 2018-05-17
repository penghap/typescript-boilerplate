import * as React from 'react';
import {WebView, WebViewMessageEventData, NativeSyntheticEvent, NavState, WebViewStatic, ScrollView} from 'react-native';
// const WKWebView: typeof WebView = require('react-native-wkwebview');

const url = `https://android-developers.googleblog.com/2018/05/faster-adoption-with-project-treble.html`;

// const url = `https://raw.githubusercontent.com/BYVoid/OpenCC/master/CMakeLists.txt`;
const emitScroll = `
(function() {

})();
`;

const patchPostMessageFunction = () => {
  const originalPostMessage = window.postMessage;
  const patchedPostMessage = function (message, targetOrigin, transfer) {
    originalPostMessage(message, targetOrigin, transfer);
  };

  patchedPostMessage.toString = () => {
    return String(Object.hasOwnProperty).replace(
            'hasOwnProperty',
            'postMessage',
        );
  };
  window.postMessage = patchedPostMessage;

  function postJSON(v) {
    postMessage(JSON.stringify(v));
  }

  let timer = 0;
  let lastTop = -1;
  let idleCount = 0;
  function startMeasure(ev) {

    // if (1) {
    //   postJSON({ type: ev.type || "UNKNOWN", constructor: ev.constructor && ev.constructor.name });
    //   return;
    // }
    if (timer) return;
    postJSON("scrollT started");
    timer = setInterval(() => {
      const scrollTop = window.scrollY;
      if (scrollTop !== lastTop) {
        idleCount = 0;
        lastTop = scrollTop;
        postJSON({
          scrollTop,
          scrollHeight: document.body.scrollHeight,
        });
      } else if (++idleCount > 100) {
        idleCount = 0;
        lastTop = -1;
        stopMeasure();
      }
    }, 0.01e3);
  }

  function stopMeasure() {
    if (!timer) return;
      postJSON("scrollT stopped");
      clearInterval(timer);
    timer = 0;
  }

  document.addEventListener('scroll', startMeasure);
  document.addEventListener('touchmove', startMeasure);
  document.addEventListener('touchstart', startMeasure);
    document.addEventListener('touchend', startMeasure);

postJSON("scrollT installed");
};

const patchJS = `(${patchPostMessageFunction.toString()})()`;

function onMessage(event: NativeSyntheticEvent<WebViewMessageEventData>) {
  const { data: msgStr } = event.nativeEvent;
  console.log('onMessage', JSON.parse(msgStr));
}

export class WebViewDetect extends React.Component<{}> {

  private _webview!: WebViewStatic;

  onRef = (ref: any) => {
    this._webview = ref;
  }

  onNavigationStateChange(ev: NavState) {
    if (!ev.loading && this._webview) {
      this._webview.injectJavaScript(emitScroll);
    }
  }

  render() {
    return           <WebView
                source={{ uri: url }}
                injectedJavaScript={patchJS}
                onMessage={onMessage}
            />;
  }
}
