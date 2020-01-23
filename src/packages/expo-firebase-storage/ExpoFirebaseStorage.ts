import * as expoFirebase from "../expo-firebase-app";
import * as jsFirebase from "firebase/app";
import "firebase/storage";

expoFirebase.setJSModule("storage", jsFirebase);
