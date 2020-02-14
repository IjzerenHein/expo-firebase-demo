import Constants from "expo-constants";
import FirebaseAnalyticsJS from "./FirebaseAnalyticsJS";
import config from "../../config";

let analytics: FirebaseAnalyticsJS;

export default {
  analytics() {
    analytics =
      analytics ||
      new FirebaseAnalyticsJS(config.firebase, {
        clientId: Constants.sessionId,
        appName: Constants.manifest.name,
        appVersion: Constants.manifest.version
      });
    return analytics;
  }
};
