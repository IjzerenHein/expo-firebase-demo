import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Heading2 } from "./Text";
import { Margins, Colors } from "./Styles";

type PropsType = {
  label: string;
  value?: string;
};

export class ListSeparator extends React.Component<PropsType> {
  render() {
    const { label, value } = this.props;
    return (
      <View style={styles.container}>
        <Heading2 color={Colors.darkGray}>{label}</Heading2>
        {value ? (
          <Heading2 color={Colors.darkGray}>{value}</Heading2>
        ) : (
          undefined
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 66,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: Margins.regular,
    paddingBottom: Margins.regular,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.gray
  }
});
