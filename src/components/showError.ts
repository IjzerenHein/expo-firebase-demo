import { ScrollView, Alert, StyleSheet } from "react-native";

export function showError(error) {
  Alert.alert("expo-firebase-demo", error.message);
}
