//import { initFirestorter } from "firestorter";

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
