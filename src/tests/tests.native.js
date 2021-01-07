// List of all modules for tests. Each file path must be statically present for
// the packager to pick them all up.
export function getTestModules() {
  const modules = [
    require("./FirebaseAuth"),
    require("./FirebaseDatabase"),
    require("./FirebaseFirestore"),
    require("./FirebaseStorage"),
    require("./FirebaseFunctions"),
    // require("./FirebaseAnalytics"),
    // require("./FirebaseMessaging"),
    // require("./FirebasePerformance"),
    // require("./FirebaseRemoteConfig"),
    // require("./FirebaseInstallations"),
  ];
  return modules.filter(Boolean);
}
