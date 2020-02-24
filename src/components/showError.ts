import { Alert } from "react-native";

export function showError(error) {
  Alert.alert("expo-firebase-demo", error.message);
}
