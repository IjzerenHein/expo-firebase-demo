import * as React from "react";
import {
  StyleSheet,
  Modal,
  Button,
  View,
  SafeAreaView,
  Text
} from "react-native";
import { IFirebaseRecaptchaVerifier } from "./FirebaseRecaptchaVerifier";
import { FirebaseRecaptcha } from "./FirebaseRecaptcha";

type PropsType = {
  config: object;
  title?: string;
  closeLabel?: string;
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
    closeLabel: "Close"
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

  close = () => {
    const { reject } = this.state;
    if (reject) {
      reject(new Error("Closed by user"));
    }
    this.setState({
      visible: false
    });
  };

  render() {
    const { config, title, closeLabel } = this.props;
    const { visible } = this.state;
    return (
      <Modal
        visible={visible}
        animationType="slide"
        onRequestClose={this.close}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text>{title}</Text>
            <Button title={closeLabel} onPress={this.close} />
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
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 20,
    marginVertical: 4,
    alignItems: "center"
  }
});
