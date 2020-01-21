import * as React from "react";
import { ListItem } from "../../components";

type PropsType = {
  file: any;
  editable?: boolean;
  navigation: any;
};

export default class FileListItem extends React.Component<PropsType> {
  onPress = () => {
    const { file, editable, navigation } = this.props;
    navigation.navigate("File", {
      file,
      editable,
      navigation
    });
  };
  render() {
    const { file } = this.props;
    const { name } = file;
    return <ListItem label={name} onPress={this.onPress} />;
  }
}
