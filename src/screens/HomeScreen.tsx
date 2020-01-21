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
        <ListItem label={"Functions"} />
        <ListSeparator label={"More"} />
        <ListItem label={"Analytics"} />
        <ListItem label={"Notifications"} />
        <ListItem label={"Remote Config"} />
        <ListItem label={"Dynamic Links"} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
