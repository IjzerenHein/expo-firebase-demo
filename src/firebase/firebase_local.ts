import config from "../config";
import * as firebase from "../packages/expo-firebase-app";
import { initFirestorter } from "firestorter";

// Add the Firebase products that you want to use
import "../packages/expo-firebase-analytics";
import "../packages/expo-firebase-auth";
import "../packages/expo-firebase-database";
import "../packages/expo-firebase-firestore";
import "../packages/expo-firebase-functions";
import "../packages/expo-firebase-installations";
import "../packages/expo-firebase-performance";
import "../packages/expo-firebase-messaging";
import "../packages/expo-firebase-remoteconfig";
import "../packages/expo-firebase-storage";

firebase.initializeApp(config.firebase);

initFirestorter({
  // @ts-ignore
  firebase
});

export { firebase };
