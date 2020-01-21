import * as React from "react";
import { StyleSheet, ScrollView, Alert, RefreshControl } from "react-native";
import { ListSeparator, Button, Margins } from "../../components";
import { firebase } from "../../firebase";
import FileListItem from "./FileListItem";

type PropsType = {
  navigation: any;
  label: string;
};
type StateType = {
  refreshing: boolean;
  inProgress: "none" | "upload";
  myFiles: any[];
  publicFiles: any[];
};

export default class FilesScreen extends React.Component<PropsType> {
  state = {
    inProgress: "none",
    refreshing: false,
    myFiles: [],
    publicFiles: []
  };

  componentDidMount() {
    this.onRefresh();
  }

  onRefresh = async () => {
    try {
      this.setState({
        refreshing: true
      });

      // Fetch files
      const { currentUser } = firebase.auth();
      const response = await Promise.all([
        firebase
          .storage()
          .ref("public")
          .listAll(),
        currentUser
          ? firebase
              .storage()
              .ref(`users/${currentUser.uid}`)
              .listAll()
          : Promise.resolve({ items: [] })
      ]);
      const [publicFiles, myFiles] = response.map(({ items }) => items);
      this.setState({
        publicFiles,
        myFiles,
        refreshing: false
      });
    } catch (err) {
      console.warn("Storage refresh failed: ", err);
      this.setState({
        refreshing: false
      });
    }
  };

  onPressUpload = async () => {
    try {
      this.setState({
        inProgress: "upload"
      });
      const { currentUser } = firebase.auth();
      const suffix = new Date().toISOString().replace(/\D/g, "");
      const fileContent = new ArrayBuffer(1000);
      const ref = firebase
        .storage()
        .ref(`users/${currentUser.uid}`)
        .child(`file_${suffix}`);
      // @ts-ignore
      const uploadTask = ref.putFile
        ? ref.putFile(fileContent) // react-native-firebase
        : ref.put(fileContent); // firebase-js
      await new Promise((resolve, reject) => {
        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          snapshot => {},
          reject,
          resolve
        );
      });
      this.setState({
        inProgress: "none"
      });
      this.onRefresh();
    } catch (err) {
      this.setState({
        inProgress: "none"
      });
      Alert.alert("Storage error", err.message);
    }
  };

  render() {
    const { currentUser } = firebase.auth();
    const { navigation } = this.props;
    const { refreshing, myFiles, publicFiles, inProgress } = this.state;
    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />
        }
      >
        <ListSeparator label="My files" />
        {currentUser
          ? myFiles.map(file => (
              <FileListItem
                key={file.fullPath}
                file={file}
                editable
                navigation={navigation}
              />
            ))
          : undefined}
        <Button
          style={styles.button}
          label={currentUser ? "Upload file" : "Sign in to Upload files"}
          loading={inProgress === "upload"}
          disabled={!currentUser}
          onPress={this.onPressUpload}
        />
        <ListSeparator label="Public files" />
        {publicFiles.map(file => (
          <FileListItem
            key={file.fullPath}
            file={file}
            navigation={navigation}
          />
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
    margin: Margins.regular
  },
  loader: {
    marginTop: Margins.regular,
    alignSelf: "center"
  }
});
