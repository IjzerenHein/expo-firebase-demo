import * as React from "react";
import { StyleSheet, View, Platform } from "react-native";
import { Heading2 } from "./Text";
import { Colors, Margins } from "./Styles";
import { Icon } from "./Icon";
import { TouchableOpacity } from "react-native-gesture-handler";

type PropsType = {
  style?: any;
  title: string;
  navigation: any;
};

export function ModalHeader(props: PropsType) {
  const { title, style, navigation } = props;
  return (
    <View style={[styles.header, style]}>
      <TouchableOpacity
        style={styles.headerItem}
        onPress={() => navigation.goBack()}
      >
        {Platform.OS === "android" ? (
          <View style={styles.headerItem} />
        ) : (
          <Icon style={styles.close} name="ios-close" color={Colors.darkGray} />
        )}
      </TouchableOpacity>
      <Heading2 style={styles.title}>{title}</Heading2>
      <View style={styles.headerItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 66,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerItem: {
    width: Margins.regular + 32 + Margins.regular,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    textAlign: "center"
    //color: Colors.white
  },
  close: {}
});
