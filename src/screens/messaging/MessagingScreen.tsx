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
type StateType = {};

export default class MessagingScreen extends React.Component<
  PropsType,
  StateType
> {
  render() {
    const isSupported = firebase.messaging.isSupported() ? true : false;
    return (
      <ScrollView style={styles.container}>
        <ListItem label="Is supported" value={isSupported} />
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
