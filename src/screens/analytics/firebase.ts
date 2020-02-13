import JSAnalytics from "./JSFirebaseAnalytics";
import config from "../../config";

let analytics: JSAnalytics;

export default {
  analytics() {
    analytics = analytics || new JSAnalytics(config.firebase.measurementId);
    return analytics;
  }
};
