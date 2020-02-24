import * as React from "react";
import { StyleSheet, ScrollView, Dimensions, AsyncStorage } from "react-native";
import {
  ListItem,
  ListSeparator,
  Button,
  Margins,
  showError,
  ModalHeader
} from "../../components";
import { firebase } from "../../firebase";
import {
  ReCaptcha,
  FirebaseRecaptchaVerifier,
  FirebaseRecaptcha,
  FirebaseRecaptchaVerifierModal
} from "./recaptcha";

type PropsType = {
  navigation: any;
};
type StateType = {
  inProgress: "none" | "sendVerificationCode" | "confirmVerificationCode";
  phoneNumber: string;
  //recaptchaToken: string;
  verificationId: string;
  verificationCode: string;
};

export default class SignInPhoneNumberScreen extends React.Component<
  PropsType,
  StateType
> {
  state: StateType = {
    inProgress: "none",
    //phoneNumber: "+31651663732",
    phoneNumber: "",
    //recaptchaToken: "",
    verificationId: "",
    verificationCode: ""
  };
  recaptchaVerifier: FirebaseRecaptchaVerifierModal;

  /*onVerifyRecaptcha = (token: string) => {
    this.setState({
      recaptchaToken: token
    });
  };*/

  async componentDidMount() {
    const verificationId = await AsyncStorage.getItem(
      "firebasePhoneAuthVerificationId"
    );
    if (verificationId) {
      this.setState({
        verificationId
      });
    }
  }

  onChangePhoneNumber = (phoneNumber: string) => {
    this.setState({
      phoneNumber
    });
  };

  onSetRecaptchaVerifier = recaptchaVerifier => {
    this.recaptchaVerifier = recaptchaVerifier;
  };

  onPressSendVerificationCode = async () => {
    try {
      const { navigation } = this.props;
      const { phoneNumber, recaptchaToken } = this.state;
      this.setState({ inProgress: "sendVerificationCode" });
      var provider = new firebase.auth.PhoneAuthProvider();
      //const applicationVerifier = new FirebaseRecaptchaVerifier(recaptchaToken);
      const verificationId = await provider.verifyPhoneNumber(
        phoneNumber,
        this.recaptchaVerifier
      );
      console.log("verificationId: ", verificationId);
      this.setState({
        inProgress: "none",
        verificationId
      });
      AsyncStorage.setItem("firebasePhoneAuthVerificationId", verificationId);
    } catch (err) {
      this.setState({ inProgress: "none" });
      showError(err);
    }
  };

  onChangeVerificationCode = async (verificationCode: string) => {
    this.setState({
      verificationCode
    });
  };

  onPressConfirmVerificationCode = async () => {
    const { navigation } = this.props;
    try {
      const { verificationId, verificationCode } = this.state;
      this.setState({ inProgress: "confirmVerificationCode" });

      // Create credential
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );

      // Sign in with credential
      const authResult = await firebase.auth().signInWithCredential(credential);
      console.log("authResult: ", authResult);

      navigation.goBack();
      navigation.goBack();
    } catch (err) {
      this.setState({ inProgress: "none" });
      showError(err);
    }
  };

  render() {
    const { navigation } = this.props;
    const {
      phoneNumber,
      inProgress,
      verificationId,
      verificationCode
      //recaptchaToken
    } = this.state;
    return (
      <ScrollView style={styles.container}>
        <ModalHeader navigation={navigation} title="Sign In" />
        <ListItem
          label={"Phone Number"}
          value={phoneNumber}
          editable
          textInput={{
            autoFocus: true
          }}
          onChangeValue={this.onChangePhoneNumber}
        />
        {/*<ReCaptcha
          containerStyle={
            recaptchaToken ? styles.recaptchaSmall : styles.recaptchaLarge
          }
          url={"https://expo-firebase-demo.firebaseapp.com"}
          action={"verify"}
          reCaptchaType={2}
          config={firebase.app().options}
          onExecute={this.onVerifyRecaptcha}
        />*/}

        <FirebaseRecaptchaVerifierModal
          ref={this.onSetRecaptchaVerifier}
          config={firebase.app().options}
        />
        {
          /*-!recaptchaToken ? (
          <React.Fragment>
            <ListSeparator label="Verify that you are not a bot" />
            <FirebaseRecaptcha
              style={styles.recaptcha}
              containerStyle={styles.recaptchaContainer}
              config={firebase.app().options}
              onVerify={this.onVerifyRecaptcha}
            />
          </React.Fragment>
        ) : (*/
          <Button
            style={styles.button}
            label="Send verification code"
            onPress={this.onPressSendVerificationCode}
            loading={inProgress === "sendVerificationCode"}
            //disabled={!recaptchaToken}
          />
          //)
        }
        {verificationId ? (
          <React.Fragment>
            <ListSeparator label="Verification" />
            <ListItem
              label={"Verification Code"}
              value={verificationCode}
              editable
              textInput={{
                autoFocus: true
              }}
              onChangeValue={this.onChangeVerificationCode}
            />
            <Button
              style={styles.button}
              label="Confirm verification code"
              onPress={this.onPressConfirmVerificationCode}
              loading={inProgress === "confirmVerificationCode"}
            />
          </React.Fragment>
        ) : (
          undefined
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    margin: Margins.regular
  },
  recaptcha: {
    height: Dimensions.get("window").height
  },
  recaptchaContainer: {
    width: "100%",
    height: "100%"
  },
  recaptchaSmall: {
    width: "100%",
    height: 100
  },
  recaptchaLarge: {
    width: "100%",
    height: "100%"
  }
});
