import * as React from "react";
import {
  StyleSheet,
  Modal,
  Button,
  View,
  SafeAreaView,
  Text
} from "react-native";
import { CodedError } from "@unimodules/core";
import { IFirebaseAuthApplicationVerifier } from "./FirebaseAuthRecaptcha.types";
import FirebaseAuthRecaptcha from "./FirebaseAuthRecaptcha";

type PropsType = React.ComponentProps<typeof FirebaseAuthRecaptcha> & {
  title?: string;
  cancelLabel?: string;
};
type StateType = {
  token: string;
  visible: boolean;
  resolve?: (token: string) => void;
  reject?: (error: Error) => void;
};

export default class FirebaseRecaptchaVerifierModal
  extends React.Component<PropsType, StateType>
  implements IFirebaseAuthApplicationVerifier {
  static defaultProps = {
    title: "reCAPTCHA",
    cancelLabel: "Cancel"
  };

  state: StateType = {
    token: "",
    visible: false,
    resolve: undefined,
    reject: undefined
  };

  get type(): string {
    return "recaptcha";
  }

  async verify(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.setState({
        token: "",
        visible: true,
        resolve,
        reject
      });
    });
  }

  private onVerify = (token: string) => {
    const { resolve } = this.state;
    if (resolve) {
      resolve(token);
    }
    this.setState({
      visible: false
    });
  };

  cancel = () => {
    const { reject } = this.state;
    if (reject) {
      reject(
        new CodedError("ERR_FIREBASE_RECAPTCHA_CANCEL", "Cancelled by user")
      );
    }
    this.setState({
      visible: false
    });
  };

  render() {
    const { title, cancelLabel, ...otherProps } = this.props;
    const { visible } = this.state;
    return (
      <Modal
        visible={visible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={this.cancel}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.cancel}>
              <Button title={cancelLabel} onPress={this.cancel} />
            </View>
          </View>
          <FirebaseAuthRecaptcha
            style={styles.container}
            onVerify={this.onVerify}
            {...otherProps}
          />
        </SafeAreaView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: "#FBFBFB",
    height: 44,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#CECECE",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  cancel: {
    position: "absolute",
    left: 8,
    justifyContent: "center"
  },
  title: {
    fontWeight: "bold"
  }
});
