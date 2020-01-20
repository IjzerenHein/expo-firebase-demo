import * as React from "react";
import { StyleSheet, View, TouchableOpacity, ViewProps } from "react-native";
import { Heading2 } from "./Text";
import { Margins, Colors, Rounding } from "./Styles";

type PropsType = {
  style?: any;
  disabled?: boolean;
  loading?: boolean;
  label: string;
  onPress: () => any;
  color?: string;
  textColor?: string;
};

export class Button extends React.Component<PropsType> {
  render() {
    const {
      style,
      label,
      onPress,
      color,
      textColor,
      disabled,
      loading
    } = this.props;
    return (
      <TouchableOpacity
        style={style}
        onPress={onPress}
        activeOpacity={0.5}
        disabled={disabled}
      >
        <View
          style={[
            styles.container,
            color ? { backgroundColor: color } : undefined,
            disabled || loading ? styles.disabled : undefined
          ]}
        >
          <Heading2 color={textColor || Colors.white}>{label}</Heading2>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: Colors.blue,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Rounding.regular
  },
  disabled: {
    opacity: 0.4
  }
});
