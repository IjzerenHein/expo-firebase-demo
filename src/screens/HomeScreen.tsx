import * as React from "react";
import { StyleSheet, View } from "react-native";
import { ListItem, ListSeparator, Colors } from "../components";
import { firebase } from "../firebase";
import { getTestModules } from "../tests";

type PropsType = {
  navigation: any;
};

export default class HomeScreen extends React.Component<PropsType> {
  _authListener: any;

  onAuthStateChanged = user => {
    console.log("AuthUserChanged: ", user);
    this.forceUpdate();
  };

  componentDidMount() {
    if (firebase.auth) {
      this._authListener = firebase
        .auth()
        .onAuthStateChanged(this.onAuthStateChanged);
    }
  }

  componentWillUnmount() {
    if (this._authListener) {
      this._authListener();
    }
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

  getAuthenticationValue(currentUser) {
    if (!currentUser) return "Not Signed in";
    return (
      'Signed in with "' +
      currentUser.providerData.map(({ providerId }) => providerId).join(", ") +
      '"'
    );
  }

  render() {
    const { navigation } = this.props;
    const currentUser = firebase.auth ? firebase.auth().currentUser : undefined;

    return (
      <View style={styles.container}>
        <ListItem label={"Run tests"} onPress={this.onPressRunTests} />
        <ListSeparator label="Interactive" />
        <ListItem
          label={"Authentication"}
          value={this.getAuthenticationValue(currentUser)}
          valueColor={!currentUser ? Colors.darkGray : undefined}
          onPress={this.onPressAuth}
          disabled={!firebase.auth}
        />
        <ListItem
          label={"Database (Firestore)"}
          onPress={() => navigation.navigate("TodoLists")}
          disabled={!firebase.firestore}
        />
        <ListItem
          label={"Storage"}
          onPress={() => navigation.navigate("Files")}
          disabled={!firebase.storage}
        />
        <ListItem
          label={"Functions"}
          onPress={() => navigation.navigate("Echo")}
          disabled={!firebase.functions}
        />
        <ListItem
          label={"Analytics"}
          onPress={() => navigation.navigate("LogEvent")}
          disabled={!firebase.analytics}
        />
        <ListItem
          label={"Remote Config"}
          onPress={() => navigation.navigate("RemoteConfig")}
          disabled={!firebase.remoteConfig}
        />
        <ListItem
          label={"Messaging"}
          onPress={() => navigation.navigate("Messaging")}
          disabled={!firebase.messaging}
        />
        <ListItem
          label={"Performance"}
          onPress={() => navigation.navigate("Performance")}
          disabled={!firebase.performance}
        />
        <ListItem
          label={"MLVision"}
          onPress={() => navigation.navigate("FaceDetector")}
          disabled
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
