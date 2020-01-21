import React from "react";
import { Text, StyleSheet } from "react-native";

export type TextProps = {
  light?: boolean;
  color?: string;
  style?: any;
  children: any;
  numberOfLines?: number;
};

const styles = StyleSheet.create({
  heading1: {
    fontSize: 22
  },
  heading2: {
    fontSize: 17
  }
});

function createTextComponent(
  name: string,
  transformFn?: (props: TextProps) => any
) {
  return (props: TextProps) => {
    const {
      children,
      style,
      light,
      color,
      margins,
      ...otherProps
    } = transformFn ? transformFn(props) : props;
    const fullStyle = [styles[name], color ? { color } : undefined, style];

    return (
      <Text style={fullStyle} {...otherProps}>
        {children}
      </Text>
    );
  };
}

/*function upperCase(props: TextProps) {
  return {
    ...props,
    children: props.children.toUpperCase()
  };
}*/

export const Heading1 = createTextComponent("heading1");
export const Heading2 = createTextComponent("heading2");
