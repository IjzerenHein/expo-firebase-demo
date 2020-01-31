import * as expoFirebase from "../expo-firebase-app";
import * as jsFirebase from "firebase/app";
import "firebase/remote-config";

expoFirebase.setJSModule("remoteconfig", jsFirebase);
