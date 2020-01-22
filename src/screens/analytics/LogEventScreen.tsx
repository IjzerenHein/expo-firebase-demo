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
  eventName: string;
  eventParams: {
    [key: string]: string | number | boolean;
  };
  inProgress: "none" | "logevent";
};

const EVENTS = {
  add_to_cart: {
    title: "Expo Analytics",
    currency: "USD",
    value: 10000
  },
  exception: {
    description: "Whoops",
    fatal: false
  }
};

export default class LogEventScreen extends React.Component<
  PropsType,
  StateType
> {
  // @ts-ignore
  state = {
    eventName: "add_to_cart",
    eventParams: EVENTS.add_to_cart,
    inProgress: "none"
  };

  onPressEventName = () => {
    const keys = Object.keys(EVENTS);
    const idx = (keys.indexOf(this.state.eventName) + 1) % keys.length;
    const eventName = keys[idx];
    this.setState({
      eventName,
      eventParams: EVENTS[eventName]
    });
  };

  onPressLogEvent = async () => {
    try {
      this.setState({
        inProgress: "logevent"
      });

      const { eventName, eventParams } = this.state;
      await firebase.analytics().logEvent(eventName, eventParams);

      this.setState({
        inProgress: "none"
      });
    } catch (err) {
      this.setState({
        inProgress: "none"
      });
      Alert.alert("Analytics error", err.message);
    }
  };

  render() {
    const { inProgress, eventName, eventParams } = this.state;
    return (
      <ScrollView style={styles.container}>
        <ListSeparator label="Press 'Event name' to switch events" />
        <ListItem
          label="Event name"
          value={eventName}
          onPress={this.onPressEventName}
        />
        <ListSeparator label="Event parameters" />
        {Object.keys(eventParams).map(key => (
          <ListItem key={key} label={key} value={eventParams[key]} />
        ))}
        <Button
          style={styles.button}
          label="Log event"
          onPress={this.onPressLogEvent}
          loading={inProgress === "logEvent"}
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
