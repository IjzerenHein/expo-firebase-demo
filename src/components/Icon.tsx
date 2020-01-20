import * as React from "react";
import { Ionicons } from "@expo/vector-icons";
import { ViewProps } from "react-native";
import { Colors } from "./Styles";

export type IconProps = {
  style?: ViewProps;
  name: string;
  color?: string;
};

export function Icon(props: IconProps) {
  return <Ionicons size={40} color={Colors.darkGray} {...props} />;
}
