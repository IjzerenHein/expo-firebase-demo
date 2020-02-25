import * as React from "react";
import { DEFAULT_WEB_APP_OPTIONS, IFirebaseOptions } from "expo-firebase-core";
import { WebView } from "react-native-webview";

type PropsType = React.ComponentProps<typeof WebView> & {
  firebaseConfig?: IFirebaseOptions;
  firebaseVersion?: string;
  onVerify: (token: string) => any;
};

function getWebviewSource(
  firebaseConfig: IFirebaseOptions,
  firebaseVersion?: string
) {
  firebaseVersion = firebaseVersion || "7.9.1";
  return {
    baseUrl: `https://${firebaseConfig.authDomain}`,
    html: `
<!DOCTYPE html><html>
<head>
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="HandheldFriendly" content="true">
    <script src="https://www.gstatic.com/firebasejs/${firebaseVersion}/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/${firebaseVersion}/firebase-auth.js"></script>
    <script type="text/javascript">firebase.initializeApp(${JSON.stringify(
      firebaseConfig
    )});</script>
    <script src="https://www.google.com/recaptcha/api.js"></script>
</head>
<body>
    <div id="recaptcha-cont" class="g-recaptcha"></div>
    <script>
    function onloadCallback() {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-cont", {
        size: "normal",
        callback: function(response) {
            window.ReactNativeWebView.postMessage(response);
        }
        });
        window.recaptchaVerifier.render();
    }
    </script>
    <script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit"></script>
</body></html>`
  };
}

export default function FirebaseAuthRecaptcha(props: PropsType) {
  const { firebaseConfig, firebaseVersion, onVerify, ...otherProps } = props;
  return (
    <WebView
      javaScriptEnabled
      automaticallyAdjustContentInsets
      scalesPageToFit
      startInLoadingState
      mixedContentMode={"always"}
      source={getWebviewSource(firebaseConfig, firebaseVersion)}
      onMessage={event => onVerify(event.nativeEvent.data)}
      {...otherProps}
    />
  );
}

FirebaseAuthRecaptcha.defaultProps = {
  firebaseConfig: DEFAULT_WEB_APP_OPTIONS
};
