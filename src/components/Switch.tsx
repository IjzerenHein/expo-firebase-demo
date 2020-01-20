import * as React from "react";
import { Switch as RawSwitch } from "react-native";
import { Colors } from "./Styles";

export function Switch(props: any) {
  return (
    <RawSwitch
      trackColor={{
        true: Colors.mediumYellow
      }}
      {...props}
    />
  );
}
