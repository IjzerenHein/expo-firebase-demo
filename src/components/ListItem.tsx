import * as React from "react";
import { StyleSheet, View, TouchableOpacity, TextInput } from "react-native";
import { Heading2 } from "./Text";
import { Margins, Colors } from "./Styles";
import { Switch } from "./Switch";

type PropsType = {
  label: string;
  value?: string | boolean;
  onPress?: () => any;
  disabled?: boolean;
  editable?: boolean;
  textInput?: React.ComponentProps<typeof TextInput>;
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
    this.setState({
      inputValue: text,
      inputValueSubmitted: false
    });
  };

  onFocusInput = () => {
    this.setState({
      inputValue: this.props.value,
      isFocused: true
    });
  };

  onBlurInput = async () => {
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
    const {
      label,
      value,
      editable,
      onPress,
      disabled,
      accessory,
      textInput
    } = this.props;
    const { inputValue, isFocused } = this.state;
    const resolvedValue = isFocused ? inputValue : value;
    return (
      <TouchableOpacity onPress={onPress} disabled={disabled || !onPress}>
        <View
          style={[styles.container, disabled ? styles.disabled : undefined]}
        >
          {editable ? (
            <TextInput
              style={styles.textInput}
              placeholder={label}
              {...textInput}
              value={resolvedValue}
              onFocus={this.onFocusInput}
              onChangeText={this.onChangeText}
              onBlur={this.onBlurInput}
            />
          ) : (
            <Heading2 style={styles.label}>{label}</Heading2>
          )}
          {!editable && value !== undefined ? (
            typeof value === "boolean" ? (
              <Switch value={value} disabled />
            ) : (
              <Heading2
                style={styles.value}
                color={Colors.darkYellow}
                numberOfLines={1}
              >
                {value}
              </Heading2>
            )
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
  label: {
    marginRight: Margins.small
  },
  value: {
    textAlign: "right",
    flex: 1
  },
  textInput: {
    flex: 1,
    fontSize: 17
  }
});
