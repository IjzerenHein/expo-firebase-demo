import config from "../config";
import * as firebase from "firebase/app";
import { initFirestorter } from "firestorter";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// Initialize Firebase
firebase.initializeApp(config.firebase);

initFirestorter({
  firebase
});

export { firebase };
