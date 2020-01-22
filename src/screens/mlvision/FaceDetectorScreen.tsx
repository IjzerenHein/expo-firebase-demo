import * as React from "react";
import { View, Alert, StyleSheet, Image } from "react-native";
import { Button, Margins, ListSeparator, ListItem } from "../../components";
import { Asset } from "expo-asset";
import * as FaceDetector from "expo-face-detector";
import * as FileSystem from "expo-file-system";

type PropsType = {
  navigation: any;
};
type StateType = {
  inProgress: "none" | "detect";
  faces: any[] | void;
};

export default class FaceDetectorScreen extends React.Component<
  PropsType,
  StateType
> {
  state: StateType = {
    inProgress: "none",
    faces: undefined
  };

  onPressDetect = async () => {
    try {
      this.setState({ inProgress: "detect" });
      const options = { mode: FaceDetector.Constants.Mode.accurate };
      const { uri } = await FileSystem.downloadAsync(
        Asset.fromModule(require("../../../assets/faces.jpg")).uri,
        FileSystem.documentDirectory + "faceDetectorFile"
      );
      const { faces, image } = await FaceDetector.detectFacesAsync(
        uri,
        options
      );
      console.log("faces: ", faces, image);
      this.setState({
        inProgress: "none",
        faces
      });
    } catch (err) {
      this.setState({ inProgress: "none" });
      Alert.alert("FaceDetector error", err.message);
    }
  };

  render() {
    const { inProgress, faces } = this.state;
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../../assets/faces.jpg")}
        />
        <Button
          style={styles.button}
          label="Detect"
          onPress={this.onPressDetect}
          loading={inProgress === "detect"}
          disabled={inProgress !== "none"}
        />
        <ListSeparator label="Results" />
        <ListItem label={faces ? `Faces detected: ${faces.length}` : ""} />
      </View>
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
  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain"
  }
});
