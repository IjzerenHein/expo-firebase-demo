import * as React from "react";
import { StyleSheet, View } from "react-native";
import { ListItem, ListSeparator } from "../components";
import { firebase } from "../firebase";
import { getTestModules } from "../tests/TestUtil";

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

  onPressRunTests = () => {
    this.props.navigation.navigate("Tests", {
      selected: getTestModules()
    });
  };

  onPressAuth = () => {
    const { currentUser } = firebase.auth();
    if (currentUser) {
      this.props.navigation.navigate("Auth");
    } else {
      this.props.navigation.navigate("SignIn");
    }
  };

  render() {
    const { navigation } = this.props;
    const { currentUser } = firebase.auth();
    return (
      <View style={styles.container}>
        <ListItem label={"Run tests"} onPress={this.onPressRunTests} />
        <ListSeparator label="Interactive" />
        <ListItem
          label={"Authentication"}
          value={currentUser ? currentUser.displayName : "Not signed in"}
          onPress={this.onPressAuth}
        />
        <ListItem
          label={"Database (Firestore)"}
          onPress={() => navigation.navigate("TodoLists")}
        />
        <ListItem
          label={"Storage"}
          onPress={() => navigation.navigate("Files")}
        />
        <ListItem
          label={"Functions"}
          onPress={() => navigation.navigate("Echo")}
        />
        <ListItem
          label={"Analytics"}
          onPress={() => navigation.navigate("LogEvent")}
        />
        <ListItem
          label={"Remote Config"}
          onPress={() => navigation.navigate("RemoteConfig")}
        />
        <ListItem
          label={"Messaging"}
          onPress={() => navigation.navigate("Messaging")}
        />
        <ListItem
          label={"Performance"}
          onPress={() => navigation.navigate("Performance")}
        />
        {/*<ListSeparator label={"Not yet supported"} />
        <ListItem label={"Notifications"} disabled />
    <ListItem label={"Dynamic Links"} disabled />*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
