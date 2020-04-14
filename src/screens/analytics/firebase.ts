import Constants from "expo-constants";
import { FirebaseAnalyticsJS } from "expo-firebase-analytics";
import config from "../../config";

let analytics: FirebaseAnalyticsJS;

export default {
  analytics() {
    analytics =
      analytics ||
      new FirebaseAnalyticsJS(config.firebase, {
        strictNativeEmulation: true,
        clientId: Constants.installationId,
        sessionId: Constants.sessionId,
        appName: Constants.manifest?.name || "Unnamed Expo project",
        appVersion: Constants.nativeAppVersion || undefined,
      });
    return analytics;
  },
};
