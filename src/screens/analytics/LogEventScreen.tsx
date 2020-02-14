import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";
import {
  ListItem,
  Button,
  Margins,
  ListSeparator,
  showError
} from "../../components";
import { firebase } from "../../firebase";
import customTrackerFirebase from "./firebase";

type PropsType = {
  navigation: any;
};
type StateType = {
  eventName: string;
  eventParams: {
    [key: string]: string | number | boolean;
  };
  userId: string;
  userPropertiesKey: string;
  userProperties: {
    [key: string]: string | number | boolean;
  };
  inProgress: "none" | "logevent" | "setuserid" | "setuserproperties";
  firebase: any;
};

const EVENTS = {
  add_to_cart: {
    title: "Expo Analytics",
    currency: "USD",
    value: 10000
  },
  begin_checkout: {
    currency: "USD",
    value: 10000,
    coupon: "spring_fun"
  },
  event_name: {
    foo: "bar",
    country: "NL"
  },
  exception: {
    description: "Whoops",
    fatal: false
  },
  purchase: {
    transaction_id: "T12345",
    currency: "USD",
    value: 10000,
    coupon: "spring_fun",
    tax: 2.43,
    shipping: 5.99
  },
  screen_view: {
    screen_name: "Analytics Demo"
  },
  search: {
    search_term: "kweougel"
  },
  sign_up: {
    method: "Facebook"
  },
  share: {
    method: "Twitter",
    content_type: "article",
    content_id: "article-8704"
  }
};

const USERPROPS = {
  a: {
    age: 30,
    sex: "male"
  },
  b: {
    age: 60,
    sex: "female"
  },
  c: {}
};

export default class LogEventScreen extends React.Component<
  PropsType,
  StateType
> {
  // @ts-ignore
  state = {
    eventName: "add_to_cart",
    eventParams: EVENTS.add_to_cart,
    userId: "",
    userPropertiesKey: "a",
    userProperties: USERPROPS.a,
    inProgress: "none",
    firebase
  };

  onPressCustomTracker = () => {
    this.setState({
      firebase:
        this.state.firebase === firebase ? customTrackerFirebase : firebase
    });
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
      this.setState({ inProgress: "logevent" });
      const { firebase, eventName, eventParams } = this.state;
      await firebase.analytics().logEvent(eventName, eventParams);
      this.setState({ inProgress: "none" });
    } catch (err) {
      this.setState({ inProgress: "none" });
      showError(err);
    }
  };

  onPressUserId = () => {
    const { userId } = this.state;
    switch (userId) {
      case "hendrik":
        this.setState({ userId: "frederik" });
        break;
      case "frederik":
        this.setState({ userId: "" });
        break;
      default:
        this.setState({ userId: "hendrik" });
        break;
    }
  };

  onPressSetUserId = async () => {
    try {
      this.setState({ inProgress: "setuserid" });
      const { firebase, userId } = this.state;
      await firebase.analytics().setUserId(userId);
      this.setState({ inProgress: "none" });
    } catch (err) {
      this.setState({ inProgress: "none" });
      showError(err);
    }
  };

  onPressUserProperties = () => {
    const keys = Object.keys(USERPROPS);
    const idx = (keys.indexOf(this.state.userPropertiesKey) + 1) % keys.length;
    const key = keys[idx];
    this.setState({
      userPropertiesKey: key,
      userProperties: USERPROPS[key]
    });
  };

  onPressSetUserProperties = async () => {
    try {
      this.setState({ inProgress: "setuserproperties" });
      const { firebase, userProperties } = this.state;
      await firebase.analytics().setUserProperties(userProperties);
      this.setState({ inProgress: "none" });
    } catch (err) {
      this.setState({ inProgress: "none" });
      showError(err);
    }
  };

  render() {
    const {
      inProgress,
      eventName,
      eventParams,
      firebase,
      userId,
      userPropertiesKey,
      userProperties
    } = this.state;
    return (
      <ScrollView style={styles.container}>
        <ListItem
          label="Custom Tracker"
          onPress={this.onPressCustomTracker}
          // @ts-ignore
          value={firebase === customTrackerFirebase}
        />
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
        <ListSeparator label="Press 'User Id' to switch user ids" />
        <ListItem label="User Id" value={userId} onPress={this.onPressUserId} />
        <Button
          style={styles.button}
          label="Set User Id"
          onPress={this.onPressSetUserId}
          loading={inProgress === "setuserid"}
        />
        <ListSeparator label="Press 'User Properties' to switch user properties" />
        <ListItem
          label="User Properties"
          value={`Set "${userPropertiesKey}"`}
          onPress={this.onPressUserProperties}
        />
        {Object.keys(userProperties).map(key => (
          <ListItem key={key} label={key} value={userProperties[key]} />
        ))}
        <Button
          style={styles.button}
          label="Set User Properties"
          onPress={this.onPressSetUserProperties}
          loading={inProgress === "setuserproperties"}
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
