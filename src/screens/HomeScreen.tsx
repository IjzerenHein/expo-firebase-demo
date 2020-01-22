import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Margins, ListItem, ListSeparator } from "../components";
import { firebase } from "../firebase";

type PropsType = {
  navigation: any;
};

export default class HomeScreen extends React.Component<PropsType> {
  _authListener: any;

  onAuthStateChanged = user => {
    this.forceUpdate();
  };

  componentDidMount() {
    this._authListener = firebase
      .auth()
      .onAuthStateChanged(this.onAuthStateChanged);
  }

  componentWillUnmount() {
    this._authListener();
  }

  onPressAuth = () => {
    const { currentUser } = firebase.auth();
    if (currentUser) {
      this.props.navigation.navigate("Auth");
    } else {
      this.props.navigation.navigate("SignIn");
    }
  };

  onPressDatabase = () => {
    this.props.navigation.navigate("TodoLists");
  };

  onPressStorage = () => {
    this.props.navigation.navigate("Files");
  };

  onPressFunctions = () => {
    this.props.navigation.navigate("Echo");
  };

  onPressAnalytics = () => {
    this.props.navigation.navigate("LogEvent");
  };

  render() {
    const { navigation } = this.props;
    const { currentUser } = firebase.auth();
    return (
      <View style={styles.container}>
        <ListItem
          label={"Authentication"}
          value={currentUser ? currentUser.displayName : "Not signed in"}
          onPress={this.onPressAuth}
        />
        <ListItem
          label={"Database (Firestore)"}
          onPress={this.onPressDatabase}
        />
        <ListItem label={"Storage"} onPress={this.onPressStorage} />
        <ListItem label={"Functions"} onPress={this.onPressFunctions} />
        <ListItem label={"Analytics"} onPress={this.onPressAnalytics} />
        <ListSeparator label={"Not yet supported"} />
        <ListItem label={"Notifications"} disabled />
        <ListItem label={"Remote Config"} disabled />
        <ListItem label={"Dynamic Links"} disabled />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
