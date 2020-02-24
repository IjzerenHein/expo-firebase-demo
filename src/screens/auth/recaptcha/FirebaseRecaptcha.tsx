import * as React from "react";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

type PropsType = React.ComponentProps<typeof WebView> & {
  config: object;
  onVerify: (token: string) => any;
};

function getWebviewSource(config, version?: string) {
  version = version || "7.9.1";
  return {
    baseUrl: `https://${config.authDomain}`,
    html: `
<!DOCTYPE html><html>
<head>
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="HandheldFriendly" content="true">
    <script src="https://www.gstatic.com/firebasejs/${version}/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/${version}/firebase-auth.js"></script>
    <script type="text/javascript">firebase.initializeApp(${JSON.stringify(
      config
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

export function FirebaseRecaptcha(props: PropsType) {
  const { config, onVerify, ...otherProps } = props;
  return (
    <WebView
      //ref={this.onSetRef}
      javaScriptEnabled
      automaticallyAdjustContentInsets
      scalesPageToFit
      startInLoadingState
      mixedContentMode={"always"}
      source={getWebviewSource(config)}
      onMessage={event => onVerify(event.nativeEvent.data)}
      //onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
      //onNavigationStateChange={this.onNavigationStateChange}
      {...otherProps}
    />
  );
}

const styles = StyleSheet.create({
  container: {}
});
