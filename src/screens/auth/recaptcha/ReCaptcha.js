import * as React from "react";
import { Platform, Linking } from "react-native";
import MessageWebView from "./MessageWebView";

const RECAPTCHA_SUB_STR = "https://www.google.com/recaptcha/api2/anchor?";
const RECAPTCHA_SUB_STR_FRAME = "https://www.google.com/recaptcha/api2/bframe";

export const type = Object.freeze({ invisible: 1, normal: 2 });

const getInvisibleRecaptchaContent = (siteKey, action, onReady) => {
  const webForm =
    "<!DOCTYPE html><html><head> " +
    "<style>  .text-xs-center { text-align: center; } .g-recaptcha { display: inline-block; } </style> " +
    '<script src="https://www.google.com/recaptcha/api.js?render=' +
    siteKey +
    '"></script> ' +
    '<script type="text/javascript"> ' +
    "grecaptcha.ready(function() { " +
    `(${String(onReady)})(); ` +
    "grecaptcha.execute('" +
    siteKey +
    "', {action: '" +
    action +
    "'}).then( " +
    "function (responseToken) { window.postMessage(responseToken);  } " +
    " ); " +
    "}); " +
    "</script>" +
    "</head></html>";
  return webForm;
};

const getNormalRecaptchaContent = config => {
  console.log("config: ", config);
  const webForm =
    "<!DOCTYPE html><html><head> " +
    "<style>  .text-xs-center { text-align: center; } .g-recaptcha { display: inline-block; margin-right: 40px; float: right;} </style> " +
    '<script src="https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js"></script> ' +
    '<script src="https://www.gstatic.com/firebasejs/7.9.1/firebase-auth.js"></script> ' +
    '<script type="text/javascript"> firebase.initializeApp(' +
    JSON.stringify(config) +
    "); " +
    '</script><script src="https://www.google.com/recaptcha/api.js"></script> ' +
    "</head> " +
    '<body><div id="recaptcha-cont" class="g-recaptcha"></div>' +
    "<script> " +
    "function onloadCallback() { " +
    'window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-cont", ' +
    '{size: "normal", callback: function(response) { window.ReactNativeWebView.postMessage(response); }}); ' +
    "window.recaptchaVerifier.render(); " +
    "} " +
    "</script>" +
    '<script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit"></script>' +
    "</body> </html>";
  return webForm;
};

export class ReCaptcha extends React.Component {
  /*static propTypes = {
    onMessage: PropTypes.func,
    containerStyle: PropTypes.any,
    siteKey: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    action: PropTypes.string,
    onReady: PropTypes.func,
    onExecute: PropTypes.func,
    customWebRecaptcha: PropTypes.func,
    reCaptchaType: PropTypes.oneOf(Object.values(type)).isRequired
  };*/

  static defaultProps = {
    onReady: () => {},
    onExecute: () => {},
    action: "",
    containerStyle: {
      width: "100%",
      height: "100%",
      zIndex: -1,
      position: "relative",
      marginBottom: 20
    },
    reCaptchaType: type.invisible
  };

  onShouldStartLoadWithRequest = event => {
    /*const { config, url } = this.props;
    if (
      event.url === url ||
      event.url.indexOf(RECAPTCHA_SUB_STR) !== -1 ||
      (!!config && event.url.indexOf(config.authDomain) !== -1) ||
      event.url.indexOf(RECAPTCHA_SUB_STR_FRAME) !== -1
    ) {
      return true;
    }
    Linking.canOpenURL(event.url).then(supported => {
      if (!supported) {
        console.log("Can't handle url: " + url);
      } else {
        return Linking.openURL(event.url);
      }
    });*/
    //return false;
    return true;
  };

  onNavigationStateChange = event => {
    if (Platform.OS === "android") {
      const { url } = this.props;
      if (
        url !== event.url &&
        event.url.indexOf(RECAPTCHA_SUB_STR) === -1 &&
        !!event.canGoBack &&
        !event.loading
      ) {
        Linking.canOpenURL(event.url).then(supported => {
          if (!supported) {
            console.log("Can't handle url: " + url);
          } else {
            return Linking.openUrl(event.url);
          }
        });
      }

      if (!!event.canGoBack) {
        this.webview.getWebViewHandle().goBack();
      }
    }
  };

  onSetRef = ref => {
    this.webview = ref;
  };

  onMessage = message => {
    this.props.onExecute(message);
  };

  render() {
    const {
      containerStyle,
      siteKey,
      action,
      onReady,
      config,
      reCaptchaType,
      url
    } = this.props;

    return (
      <MessageWebView
        ref={this.onSetRef}
        scalesPageToFit={true}
        mixedContentMode={"always"}
        containerStyle={containerStyle}
        onMessage={this.onMessage}
        source={{
          html:
            reCaptchaType == type.invisible
              ? getInvisibleRecaptchaContent(siteKey, action, onReady)
              : getNormalRecaptchaContent(config),
          baseUrl: url
        }}
        onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
        onNavigationStateChange={this.onNavigationStateChange}
      />
    );
  }
}
