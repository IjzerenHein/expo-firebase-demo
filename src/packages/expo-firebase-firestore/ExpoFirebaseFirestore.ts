import * as expoFirebase from "../expo-firebase-app";
import * as jsFirebase from "firebase/app";
import "firebase/firestore";

expoFirebase.setJSModule("firestore", jsFirebase);
