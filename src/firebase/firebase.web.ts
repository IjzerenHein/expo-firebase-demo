import config from "../config";
import firebase from "firebase/app";
import { initFirestorter } from "firestorter";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";
import "firebase/functions";
import "firebase/analytics";
import "firebase/remote-config";
import "firebase/messaging";
import "firebase/performance";
import "firebase/installations";

// Initialize Firebase
firebase.initializeApp(config.firebase);

initFirestorter({
  firebase,
});

export { firebase };
