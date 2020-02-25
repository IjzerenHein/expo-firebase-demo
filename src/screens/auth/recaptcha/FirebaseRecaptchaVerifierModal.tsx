import * as React from "react";
import {
  StyleSheet,
  Modal,
  Button,
  View,
  SafeAreaView,
  Text
} from "react-native";
// import { Appearance } from 'react-native-appearance';
import { IFirebaseRecaptchaVerifier } from "./FirebaseRecaptchaVerifier";
import { FirebaseRecaptcha } from "./FirebaseRecaptcha";

type PropsType = {
  config: object;
  title?: string;
  cancelLabel?: string;
};
type StateType = {
  token: string;
  visible: boolean;
  resolve?: (token: string) => void;
  reject?: (error: Error) => void;
};

export class FirebaseRecaptchaVerifierModal
  extends React.Component<PropsType, StateType>
  implements IFirebaseRecaptchaVerifier {
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
      reject(new Error("Cancelled by user"));
    }
    this.setState({
      visible: false
    });
  };

  render() {
    const { config, title, cancelLabel } = this.props;
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
          <FirebaseRecaptcha
            style={styles.container}
            config={config}
            onVerify={this.onVerify}
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
