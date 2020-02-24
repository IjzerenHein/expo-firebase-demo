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
import FaceDetectorScreen from "./screens/mlvision/FaceDetectorScreen";
import { firebase } from "./firebase";

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
      <MainStack.Screen
        name="FaceDetector"
        component={FaceDetectorScreen}
        options={{ title: "Face Detector" }}
      />
    </MainStack.Navigator>
  );
}

const getActiveRouteName = state => {
  const route = state.routes[state.index];
  return route.state
    ? getActiveRouteName(route.state) // Dive into nested navigators
    : route.name;
};

function App() {
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();

  return (
    <NavigationNativeContainer
      ref={navigationRef}
      onStateChange={state => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = getActiveRouteName(state);

        // Log screen-change when routes have changed
        if (previousRouteName !== currentRouteName) {
          console.debug("Screen changed: ", currentRouteName);
          if (firebase.analytics) {
            firebase
              .analytics()
              .setCurrentScreen(currentRouteName, currentRouteName);
            /*firebase.analytics().logEvent("screen_view", {
              app_name: "expo-firebase-demo",
              screen_name: currentRouteName
            });*/
          }
        }

        // Save the current route name for later comparision
        routeNameRef.current = currentRouteName;
      }}
    >
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
