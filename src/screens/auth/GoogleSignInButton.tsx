import * as React from "react";
import { Platform } from "react-native";
import { Button, Colors } from "../../components";
import {
  makeRedirectUri,
  ResponseType,
  useAuthRequest,
  useAutoDiscovery,
} from "expo-auth-session";
import { firebase } from "../../firebase";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

type Props = any;

export default function GoogleSignInButton(props: Props) {
  const useProxy = Platform.select({ web: false, default: true });
  const discovery = useAutoDiscovery("https://accounts.google.com");
  // Request
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: Platform.select({
        web:
          "192261076942-3e612e3e9607pidjb9hsj892hjv07a6q.apps.googleusercontent.com",
        default: "you do not have this yet",
      }),
      redirectUri: makeRedirectUri({
        // For usage in bare and standalone
        native: "you do not have this yet",
        useProxy,
      }),
      usePKCE: false,
      responseType: ResponseType.Token,
      scopes: ["openid", "profile"],
    },
    discovery
  );

  React.useEffect(() => {
    if (response && response.type === "success") {
      const credential = new firebase.auth.GoogleAuthProvider.credential(
        null, // Pass the access_token as the second property
        response.params.access_token
      );
      firebase.auth().signInWithCredential(credential);
    }
  }, [response]);

  return (
    <Button
      color={Colors.googleRed}
      //textColor={Colors.black}
      label={"Sign in with Google"}
      {...props}
      //loading={inProgress === "googleSignin"}
      disabled={!request}
      onPress={() => promptAsync({ useProxy })}
    />
  );
}
