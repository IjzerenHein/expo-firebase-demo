import * as React from "react";
import { ScrollView, Alert, StyleSheet } from "react-native";
import { ListItem, Margins } from "../../components";
import { firebase } from "../../firebase";

type PropsType = {
  navigation: any;
};
type StateType = {
  inProgress: "none" | "datacollection" | "instrumentation";
};

export default class PerformanceScreen extends React.Component<
  PropsType,
  StateType
> {
  state: StateType = {
    inProgress: "none"
  };

  onPressDataCollectionEnabled = async () => {
    try {
      this.setState({ inProgress: "datacollection" });
      firebase.performance().dataCollectionEnabled = !firebase.performance()
        .dataCollectionEnabled;
      this.setState({ inProgress: "none" });
    } catch (err) {
      this.setState({ inProgress: "none" });
      Alert.alert("Performance error", err.message);
    }
  };

  onPressInstrumentationEnabled = async () => {
    try {
      this.setState({ inProgress: "instrumentation" });
      firebase.performance().instrumentationEnabled = !firebase.performance()
        .instrumentationEnabled;
      this.setState({ inProgress: "none" });
    } catch (err) {
      this.setState({ inProgress: "none" });
      Alert.alert("Performance error", err.message);
    }
  };

  render() {
    const { inProgress } = this.state;
    const {
      dataCollectionEnabled,
      instrumentationEnabled
    } = firebase.performance();
    return (
      <ScrollView style={styles.container}>
        <ListItem
          label="Data collection enabled"
          value={dataCollectionEnabled}
          loading={inProgress === "datacollection"}
          disabled={inProgress !== "none"}
          onPress={this.onPressDataCollectionEnabled}
        />
        <ListItem
          label="Instrumentation enabled"
          value={instrumentationEnabled}
          loading={inProgress === "instrumentation"}
          disabled={inProgress !== "none"}
          onPress={this.onPressInstrumentationEnabled}
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
