import * as expoFirebase from "../expo-firebase-app";
import * as jsFirebase from "firebase/app";
import "firebase/analytics";

expoFirebase.setJSModule("analytics", jsFirebase);
