import * as React from "react";
import { Switch as RawSwitch, Platform } from "react-native";
import { Colors } from "./Styles";

export function Switch(props: any) {
  if (Platform.OS === "ios") {
    return (
      <RawSwitch
        trackColor={{
          true: Colors.mediumYellow
        }}
        {...props}
      />
    );
  } else {
    return <RawSwitch thumbColor={Colors.mediumYellow} {...props} />;
  }
}
