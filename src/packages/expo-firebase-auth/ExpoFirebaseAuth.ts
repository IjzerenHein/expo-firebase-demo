import * as expoFirebase from "../expo-firebase-app";
import * as jsFirebase from "firebase/app";
import "firebase/auth";

expoFirebase.setJSModule("auth", jsFirebase);
