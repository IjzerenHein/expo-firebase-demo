import * as React from "react";
import { StyleSheet, View, TouchableOpacity, TextInput } from "react-native";
import { Heading2 } from "./Text";
import { Margins, Colors } from "./Styles";

type PropsType = {
  label: string;
  value?: string;
  onPress?: () => any;
  disabled?: boolean;
  editable?: boolean;
  onChangeValue?: (value: string) => Promise<any>;
  accessory?: React.ReactNode;
};
type StateType = {
  isFocused: boolean;
  inputValue?: string;
  inputValueSubmitted: boolean;
};

export class ListItem extends React.Component<PropsType> {
  state = {
    isFocused: false,
    inputValue: undefined
  };

  onChangeText = (text: string) => {
    console.log("onChangeText: ", text);
    this.setState({
      inputValue: text,
      inputValueSubmitted: false
    });
  };

  onFocusInput = () => {
    console.log("onFocusInput");
    this.setState({
      inputValue: this.props.value,
      isFocused: true
    });
  };

  onBlurInput = async () => {
    console.log("onBlurInput");
    const { onChangeValue } = this.props;
    const { inputValue } = this.state;
    if (inputValue === undefined) {
      this.setState({
        isFocused: false
      });
      return;
    }
    if (onChangeValue) {
      await onChangeValue(inputValue);
    }
    this.setState({
      isFocused: false
    });
  };

  render() {
    const { label, value, editable, onPress, disabled, accessory } = this.props;
    const { inputValue, isFocused } = this.state;
    const resolvedValue = isFocused ? inputValue : value;
    return (
      <TouchableOpacity onPress={onPress} disabled={disabled || !onPress}>
        <View
          style={[styles.container, disabled ? styles.disabled : undefined]}
        >
          {editable ? (
            <TextInput
              value={resolvedValue}
              style={styles.textInput}
              placeholder={label}
              onFocus={this.onFocusInput}
              onChangeText={this.onChangeText}
              onBlur={this.onBlurInput}
            />
          ) : (
            <Heading2>{label}</Heading2>
          )}
          {!editable && value ? (
            <Heading2 color={Colors.darkYellow}>{value}</Heading2>
          ) : (
            undefined
          )}
          {accessory}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 66,
    backgroundColor: Colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Margins.regular,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.gray
  },
  disabled: {
    opacity: 0.41
  },
  textInput: {
    flex: 1,
    fontSize: 17
  }
});
