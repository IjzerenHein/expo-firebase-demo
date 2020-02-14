//import config from "../config";
//import { initFirestorter } from "firestorter";

//import { DEFAULT_APP_NAME, DEFAULT_APP_OPTIONS } from "expo-firebase-core";
import * as Analytics from "expo-firebase-analytics";

/*initFirestorter({
  // @ts-ignore
  firebase
});*/

const firebase = {
  analytics() {
    return Analytics;
  }
};

export { firebase };
