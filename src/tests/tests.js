// List of all modules for tests. Each file path must be statically present for
// the packager to pick them all up.
export function getTestModules() {
  const modules = [
    //require("./Basic")
    require("./FirebaseAnalytics"),
    require("./FirebaseAuth"),
    require("./FirebaseDatabase"),
    require("./FirebaseFirestore"),
    require("./FirebaseFunctions"),
    require("./FirebaseInstallations"),
    require("./FirebaseMessaging"),
    require("./FirebasePerformance"),
    require("./FirebaseRemoteConfig"),
    require("./FirebaseStorage"),
  ];
  return modules.filter(Boolean);
}
