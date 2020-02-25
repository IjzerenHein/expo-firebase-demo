import * as React from "react";
import { StyleSheet, ScrollView, AsyncStorage } from "react-native";
import {
  ListItem,
  ListSeparator,
  Button,
  Margins,
  showError,
  ModalHeader
} from "../../components";
import { firebase } from "../../firebase";
import { FirebaseRecaptchaVerifierModal } from "./recaptcha";

type PropsType = {
  navigation: any;
};
type StateType = {
  inProgress: "none" | "sendVerificationCode" | "confirmVerificationCode";
  phoneNumber: string;
  verificationId: string;
  verificationCode: string;
};

export default class SignInPhoneNumberScreen extends React.Component<
  PropsType,
  StateType
> {
  state: StateType = {
    inProgress: "none",
    phoneNumber: "",
    verificationId: "",
    verificationCode: ""
  };
  recaptchaVerifier: FirebaseRecaptchaVerifierModal;

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

  onChangePhoneNumber = async (phoneNumber: string) => {
    this.setState({
      phoneNumber
    });
  };

  onSetRecaptchaVerifier = recaptchaVerifier => {
    this.recaptchaVerifier = recaptchaVerifier;
  };

  onPressSendVerificationCode = async () => {
    try {
      const { phoneNumber } = this.state;
      this.setState({ inProgress: "sendVerificationCode" });
      var provider = new firebase.auth.PhoneAuthProvider();
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

      AsyncStorage.removeItem("firebasePhoneAuthVerificationId");

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
    } = this.state;
    return (
      <ScrollView style={styles.container}>
        <ModalHeader navigation={navigation} title="Sign In" />
        <ListItem
          label={"Phone Number"}
          value={phoneNumber}
          editable
          textInput={{
            autoFocus: true,
            autoCompleteType: "tel",
            keyboardType: "phone-pad",
            textContentType: "telephoneNumber"
          }}
          onChangeValue={this.onChangePhoneNumber}
        />
        <FirebaseRecaptchaVerifierModal
          ref={this.onSetRecaptchaVerifier}
          config={firebase.app().options}
        />
        <Button
          style={styles.button}
          label="Send verification code"
          onPress={this.onPressSendVerificationCode}
          disabled={!phoneNumber}
          loading={inProgress === "sendVerificationCode"}
        />
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
  }
});
