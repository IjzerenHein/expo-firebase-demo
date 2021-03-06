import * as React from "react";
import { StyleSheet, View, Alert, Dimensions, Platform } from "react-native";
import {
  Margins,
  Button,
  Colors,
  Rounding,
  ModalHeader,
} from "../../components";
import { firebase } from "../../firebase";
import config from "../../config";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";
import * as AppleAuthentication from "expo-apple-authentication";
import GoogleSignInButton from "./GoogleSignInButton";

type PropsType = {
  navigation: any;
  label: string;
};
type StateType = {
  inProgress: "none" | "facebookSignin" | "googleSignin";
};

export default class SignInScreen extends React.Component<PropsType> {
  state = {
    inProgress: "none",
  };

  /**
   * Facebook Sign in
   */
  onPressFacebook = async () => {
    const { navigation } = this.props;
    try {
      this.setState({ inProgress: "facebookSignin" });

      await Facebook.initializeAsync(
        config.facebook.appId,
        config.facebook.appName
      );

      // @ts-ignore
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"]
      });

      if (type !== "success") {
        this.setState({ inProgress: "none" });
        return;
      }

      // Build Firebase credential with the Facebook access token.
      const credential = firebase.auth.FacebookAuthProvider.credential(token);

      // Sign in with credential from the Facebook user.
      const authResult = await firebase.auth().signInWithCredential(credential);
      console.log("authResult: ", authResult);

      navigation.goBack();
    } catch (err) {
      this.setState({ inProgress: "none" });
      Alert.alert("Facebook Login", err.message);
    }
  };

  /**
   * Google sign in.
   */
  onPressGoogle = async () => {
    const { navigation } = this.props;
    try {
      this.setState({ inProgress: "googleSignin" });

      // Login with google
      // @ts-ignore
      const { type, accessToken, idToken } = await Google.logInAsync({
        ...config.google,
        scopes: ["profile", "email"]
      });
      if (type !== "success") {
        this.setState({ inProgress: "none" });
        return;
      }

      // Build Firebase credential with the id & access token.
      const credential = firebase.auth.GoogleAuthProvider.credential(
        idToken,
        accessToken
      );

      // Sign in with credential from the Google user.
      const authResult = await firebase.auth().signInWithCredential(credential);
      console.log("authResult: ", authResult);

      navigation.goBack();
    } catch (err) {
      this.setState({ inProgress: "none" });
      Alert.alert("Google Login", err.message);
    }
  };

  /**
   * Phone number sign in.
   */
  onPressPhoneNumber = async () => {
    const { navigation } = this.props;
    navigation.navigate("SignInPhoneNumber");
  };

  /**
   * Apple sign in.
   */
  onPressApple = async () => {
    try {
      throw new Error("Not yet supported");
      this.setState({ inProgress: "appleSignin" });

      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL
        ]
      });

      // Build Firebase credential with the id & access token.
      /*const credential = firebase.auth.AppleAuthProvider.credential(
        idToken,
        accessToken
      );*/
    } catch (err) {
      this.setState({ inProgress: "none" });
      if (err.code === "ERR_CANCELED") {
        // handle that the user canceled the sign-in flow
      } else {
        Alert.alert("Apple Login", err.message);
      }
    }
  };

  render() {
    const { navigation } = this.props;
    const { inProgress } = this.state;
    return (
      <View style={styles.container}>
        <ModalHeader navigation={navigation} title="Sign In" />
        <Button
          style={styles.button}
          color={Colors.facebookBlue}
          label={"Sign in with Facebook"}
          loading={inProgress === "facebookSignin"}
          disabled={inProgress !== "none"}
          onPress={this.onPressFacebook}
        />
        <Button
          style={styles.button}
          color={Colors.googleRed}
          //textColor={Colors.black}
          label={"Sign in with Google (google-app-auth)"}
          loading={inProgress === "googleSignin"}
          disabled={inProgress !== "none"}
          onPress={this.onPressGoogle}
        />
        <GoogleSignInButton
          style={styles.button}
          label={"Sign in with Google (auth-session)"}
        />
        <Button
          style={styles.button}
          color={Colors.white}
          textColor={Colors.black}
          label={"Sign in with Phone number"}
          disabled={inProgress !== "none"}
          onPress={this.onPressPhoneNumber}
        />
        {Platform.OS === "ios" ? (
          <AppleAuthentication.AppleAuthenticationButton
            buttonType={
              AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
            }
            buttonStyle={
              AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
            }
            cornerRadius={Rounding.regular}
            style={styles.appleButton}
            onPress={this.onPressApple}
          />
        ) : undefined}
        {/*<Button
          style={styles.button}
          color={Colors.white}
          textColor={Colors.black}
          label={"Sign in with Apple"}
          loading={inProgress === "appleSignin"}
          disabled={inProgress !== "none"}
          onPress={this.onPressApple}
        />*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    //backgroundColor: Colors.blue
  },
  button: {
    margin: Margins.regular,
    marginBottom: 0
  },
  appleButton: {
    margin: Margins.regular,
    marginBottom: 0,
    width: Dimensions.get("window").width - Margins.regular - Margins.regular,
    height: Button.HEIGHT
  }
});
