import * as React from "react";
import { ScrollView, Alert, StyleSheet } from "react-native";
import {
  ListItem,
  Button,
  Margins,
  ListSeparator,
  Colors
} from "../../components";
import { firebase } from "../../firebase";

type PropsType = {
  navigation: any;
};
type StateType = {
  sendMessage: string;
  inProgress: boolean;
  receivedMessage: string;
};

export default class EchoScreen extends React.Component<PropsType, StateType> {
  state = {
    sendMessage: "",
    inProgress: false,
    receivedMessage: ""
  };

  onChangMessage = async (value: string) => {
    this.setState({
      sendMessage: value
    });
  };

  onPressSend = async () => {
    try {
      this.setState({
        inProgress: true
      });

      const sendMessage = this.state.sendMessage || "";
      const echoMessage = firebase.functions().httpsCallable("echoMessage");
      const response = await echoMessage({ message: sendMessage });
      const { message } = response.data;

      this.setState({
        inProgress: false,
        receivedMessage: message
      });
    } catch (err) {
      this.setState({
        inProgress: false
      });
      Alert.alert("Function error", err.message);
    }
  };

  render() {
    const { inProgress, receivedMessage, sendMessage } = this.state;
    return (
      <ScrollView style={styles.container}>
        <ListSeparator label="Send" />
        <ListItem
          value={sendMessage}
          label="Message"
          editable
          onChangeValue={this.onChangMessage}
        />
        <Button
          style={styles.button}
          label="Send"
          onPress={this.onPressSend}
          loading={inProgress}
        />
        <ListSeparator label="Response" />
        <ListItem
          label="No message received"
          value={receivedMessage}
          editable
          disabled
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    margin: Margins.regular,
    marginBottom: 0
  }
});
