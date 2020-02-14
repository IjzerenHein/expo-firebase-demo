//import config from "../config";
import * as firebase from "expo-firebase-app";
import { initFirestorter } from "firestorter";

// Add the Firebase products that you want to use
//import "../packages/expo-firebase-analytics";
//import "expo-firebase-auth";
//import "../packages/expo-firebase-database";
import "expo-firebase-firestore";
//import "../packages/expo-firebase-functions";
//import "../packages/expo-firebase-performance";
//import "../packages/expo-firebase-messaging";
//import "../packages/expo-firebase-remote-config";
//import "../packages/expo-firebase-storage";

//firebase.initializeApp(config.firebase);

initFirestorter({
  // @ts-ignore
  firebase
});

export { firebase };
