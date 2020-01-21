import * as React from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Heading2, Margins, Button, Icon, Colors } from "../../components";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";
import { firebase } from "../../firebase";
import config from "../../config";

type PropsType = {
  navigation: any;
  label: string;
};
type StateType = {
  inProgress: "none" | "facebookSignin" | "googleSignin";
};

export default class SignInScreen extends React.Component<PropsType> {
  state = {
    inProgress: "none"
  };

  onPressClose = () => {
    this.props.navigation.goBack();
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

      // Build Firebase credential with the Google access token.
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
   * Apple sign in.
   */
  onPressApple = async () => {
    // TODO
  };

  render() {
    const { inProgress } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerItem}
            onPress={this.onPressClose}
          >
            <Icon
              style={styles.close}
              name="ios-close"
              color={Colors.darkGray}
            />
          </TouchableOpacity>
          <Heading2 style={styles.title}>{"Sign In"}</Heading2>
          <View style={styles.headerItem} />
        </View>
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
          label={"Sign in with Google"}
          loading={inProgress === "googleSignin"}
          disabled={inProgress !== "none"}
          onPress={this.onPressGoogle}
        />
        <Button
          style={styles.button}
          color={Colors.white}
          textColor={Colors.black}
          label={"Sign in with Apple"}
          loading={inProgress === "appleSignin"}
          disabled={inProgress !== "none"}
          onPress={this.onPressApple}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    //backgroundColor: Colors.blue
  },
  header: {
    height: 66,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerItem: {
    width: Margins.regular + 32 + Margins.regular,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    textAlign: "center"
    //color: Colors.white
  },
  close: {},
  button: {
    margin: Margins.regular,
    marginBottom: 0
  }
});
