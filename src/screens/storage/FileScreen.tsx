import * as React from "react";
import { ScrollView, Alert, StyleSheet } from "react-native";
import {
  ListItem,
  Button,
  Margins,
  ListSeparator,
  Colors
} from "../../components";
import * as FileSystem from "expo-file-system";

type PropsType = {
  navigation: any;
  route: {
    params: {
      file: any;
      editable: boolean;
    };
  };
};
type StateType = {
  inProgress: "none" | "download" | "delete";
};

export default class FileScreen extends React.Component<PropsType, StateType> {
  state = {
    inProgress: "none"
  };

  onPressDelete = async () => {
    const { route, navigation } = this.props;
    const { file } = route.params;
    try {
      this.setState({
        inProgress: "delete"
      });
      await file.delete();
      this.setState({
        inProgress: "none"
      });
      navigation.goBack();
    } catch (err) {
      this.setState({
        inProgress: "none"
      });
      Alert.alert("Storage error", err.message);
    }
  };

  onPressDownload = async () => {
    const { route } = this.props;
    const { file } = route.params;
    try {
      this.setState({
        inProgress: "download"
      });
      const url = await file.getDownloadURL();
      const { uri } = await FileSystem.downloadAsync(
        url,
        FileSystem.documentDirectory + file.name
      );
      this.setState({
        inProgress: "none"
      });
      //Linking.openURL(uri);
      Alert.alert("Download complete", uri);
    } catch (err) {
      this.setState({
        inProgress: "none"
      });
      Alert.alert("Storage error", err.message);
    }
  };

  render() {
    const { navigation, route } = this.props;
    const { inProgress } = this.state;
    const { file, editable } = route.params;
    const { name, fullPath } = file;
    return (
      <ScrollView style={styles.container}>
        {/*editable ? (
          <React.Fragment>
            <ListSeparator label="Settings" />
            <ListItem
              editable
              label="Name"
              value={name}
              onChangeValue={this.onChangeName}
            />
            <ListItem
              label="Public"
              accessory={
                <Switch
                  value={isPublic || false}
                  onValueChange={this.onChangePublic}
                />
              }
            />
          </React.Fragment>
        ) : (
          undefined
        )*/}
        <ListItem label="Name" value={name} />
        <ListItem label="Full path" value={fullPath} />
        <ListSeparator label="Actions" />
        <Button
          style={styles.button}
          label="Download"
          onPress={this.onPressDownload}
          loading={inProgress === "download"}
          disabled={inProgress !== "none"}
        />
        {editable ? (
          <Button
            style={styles.button}
            color={Colors.darkYellow}
            label="Delete"
            onPress={this.onPressDelete}
            loading={inProgress === "delete"}
            disabled={inProgress !== "none"}
          />
        ) : (
          undefined
        )}
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
  },
  loader: {
    marginTop: Margins.regular,
    alignSelf: "center"
  }
});
