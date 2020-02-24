import * as React from "react";
import { StyleSheet, ScrollView, Alert } from "react-native";
import {
  ListItem,
  ListSeparator,
  Colors,
  Button,
  Margins
} from "../../components";
import { firebase } from "../../firebase";

type PropsType = {
  navigation: any;
};

export default class AuthScreen extends React.Component<PropsType> {
  onPressSignout = async () => {
    try {
      await firebase.auth().signOut();
      this.props.navigation.goBack();
    } catch (err) {
      Alert.alert("Signout Error", err.message);
    }
  };

  render() {
    const { currentUser } = firebase.auth();
    if (!currentUser) return null;
    return (
      <ScrollView style={styles.container}>
        <ListSeparator label="Current user" />
        <ListItem label={"Display name"} value={currentUser.displayName} />
        <ListItem label={"Email"} value={currentUser.email} />
        <ListItem label={"Email verified"} value={currentUser.emailVerified} />
        <ListItem label={"Phone number"} value={currentUser.phoneNumber} />
        <ListItem
          label="Provider(s)"
          value={currentUser.providerData
            .map(({ providerId }) => providerId)
            .join(", ")}
        />
        {/*<ListSeparator label="Actions" />*/}
        <Button
          style={styles.button}
          label="Sign out"
          color={Colors.darkYellow}
          onPress={this.onPressSignout}
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
    margin: Margins.regular
  }
});
