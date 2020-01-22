import * as React from "react";
import { Colors } from "./components";
import { NavigationNativeContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets
} from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import AuthScreen from "./screens/auth/AuthScreen";
import SignInScreen from "./screens/auth/SignInScreen";
import TodoListsScreen from "./screens/firestore/TodoListsScreen";
import TodoListScreen from "./screens/firestore/TodoListScreen";
import FilesScreen from "./screens/storage/FilesScreen";
import FileScreen from "./screens/storage/FileScreen";
import EchoScreen from "./screens/functions/EchoScreen";
import LogEventScreen from "./screens/analytics/LogEventScreen";
import RemoteConfigScreen from "./screens/remoteconfig/RemoteConfigScreen";
import MessagingScreen from "./screens/messaging/MessagingScreen";
import PerformanceScreen from "./screens/performance/PerformanceScreen";
import TestScreen from "./screens/test/TestScreen";

const RootStack = createStackNavigator();
const MainStack = createStackNavigator();

function MainStackScreen() {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.blue
        },
        headerTintColor: Colors.white,
        headerTitleStyle: {
          fontWeight: "bold"
        },
        cardStyle: {
          backgroundColor: Colors.lightGray
        }
      }}
    >
      <MainStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "expo-firebase-demo" }}
      />
      <MainStack.Screen
        name="Auth"
        component={AuthScreen}
        options={{ title: "Authentication" }}
      />
      <MainStack.Screen
        name="TodoLists"
        component={TodoListsScreen}
        options={{ title: "Todo lists" }}
      />
      <MainStack.Screen
        name="TodoList"
        component={TodoListScreen}
        options={({ route }) => ({ title: route.params.title || "Todo list" })}
      />
      <MainStack.Screen
        name="Files"
        component={FilesScreen}
        options={{ title: "Files" }}
      />
      <MainStack.Screen
        name="File"
        component={FileScreen}
        options={{ title: "File" }}
      />
      <MainStack.Screen
        name="Echo"
        component={EchoScreen}
        options={{ title: "Echo" }}
      />
      <MainStack.Screen
        name="LogEvent"
        component={LogEventScreen}
        options={{ title: "Log event" }}
      />
      <MainStack.Screen
        name="RemoteConfig"
        component={RemoteConfigScreen}
        options={{ title: "Remote config" }}
      />
      <MainStack.Screen
        name="Messaging"
        component={MessagingScreen}
        options={{ title: "Messaging" }}
      />
      <MainStack.Screen
        name="Performance"
        component={PerformanceScreen}
        options={{ title: "Performance" }}
      />
      <MainStack.Screen
        name="Tests"
        component={TestScreen}
        options={{ title: "Tests" }}
      />
    </MainStack.Navigator>
  );
}

function App() {
  return (
    <NavigationNativeContainer>
      <RootStack.Navigator
        mode="modal"
        headerMode="none"
        screenOptions={{
          gestureEnabled: true,
          cardOverlayEnabled: true,
          ...TransitionPresets.ModalPresentationIOS
        }}
      >
        <RootStack.Screen
          name="Main"
          component={MainStackScreen}
          options={{ headerShown: false }}
        />

        <RootStack.Screen name="SignIn" component={SignInScreen} />
      </RootStack.Navigator>
    </NavigationNativeContainer>
  );
}

export default App;
