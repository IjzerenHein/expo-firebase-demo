import config from "../config";
import * as FirebaseApp from "../packages/expo-firebase-app";

console.log("DEFAULT_OPTIONS: ", FirebaseApp.DEFAULT_OPTIONS);

//const CONFIG = FirebaseApp.DEFAULT_OPTIONS || config.firebase;
const CONFIG = FirebaseApp.DEFAULT_OPTIONS;

export default CONFIG;
