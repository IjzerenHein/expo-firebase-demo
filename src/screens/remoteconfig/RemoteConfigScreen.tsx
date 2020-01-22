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
  inProgress: "none" | "fetch" | "activate";
};

export default class RemoteConfigScreen extends React.Component<
  PropsType,
  StateType
> {
  // @ts-ignore
  state = {
    inProgress: "none"
  };

  onPressFetch = async () => {
    try {
      this.setState({ inProgress: "fetch" });
      await firebase.remoteConfig().fetch();
      this.setState({ inProgress: "none" });
    } catch (err) {
      this.setState({ inProgress: "none" });
      Alert.alert("RemoteConfig error", err.message);
    }
  };

  onPressActivate = async () => {
    try {
      this.setState({ inProgress: "activate" });
      const result = await firebase.remoteConfig().activate();
      if (!result) throw new Error("Already activated");
      this.setState({ inProgress: "none" });
    } catch (err) {
      this.setState({ inProgress: "none" });
      Alert.alert("RemoteConfig error", err.message);
    }
  };

  render() {
    const { inProgress } = this.state;
    const remoteConfig = firebase.remoteConfig();
    const { fetchTimeMillis, lastFetchStatus } = remoteConfig;
    const config = remoteConfig.getAll();
    return (
      <ScrollView style={styles.container}>
        <ListItem label="Last fetch time" value={fetchTimeMillis + ""} />
        <ListItem label="Last fetch status" value={lastFetchStatus} />
        <Button
          style={styles.button}
          label="Fetch"
          onPress={this.onPressFetch}
          loading={inProgress === "fetch"}
          disabled={inProgress !== "none"}
        />
        <Button
          style={styles.button}
          label="Activate"
          onPress={this.onPressActivate}
          loading={inProgress === "activate"}
          disabled={inProgress !== "none"}
        />
        <ListSeparator label="Configuration" />
        {Object.keys(config).map(key => (
          <ListItem key={key} label={key} value={config[key].asString()} />
        ))}
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
