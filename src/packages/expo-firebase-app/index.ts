//import ExpoFirebaseApp from './ExpoFirebaseApp';
import * as Types from "./types";

type ExpoFirebaseModuleName =
  | "analytics"
  | "auth"
  | "database"
  | "firestore"
  | "functions"
  | "installations"
  | "messaging"
  | "performance"
  | "remoteconfig"
  | "storage";

let jsFirebase: any;
let defaultApp: ExpoFirebaseApp;
let namedApps: {
  [name: string]: ExpoFirebaseApp;
};

export let analytics: (app?: any) => Types.FirebaseAnalytics;
export let auth: {
  (app?: any): Types.FirebaseAuth;
  Auth: typeof Types.FirebaseAuth;
  FacebookAuthProvider: typeof Types.FacebookAuthProvider;
  GoogleAuthProvider: typeof Types.GoogleAuthProvider;
};
export let database: (app?: any) => Types.FirebaseDatabase;
export let firestore: (app?: any) => Types.FirebaseFirestore;
export let functions: (app?: any) => Types.FirebaseFunctions;
export let installations: (app?: any) => Types.FirebaseInstallations;
export let messaging: (app?: any) => Types.FirebaseMessaging;
export let performance: (app?: any) => Types.FirebasePerformance;
export let remoteconfig: (app?: any) => Types.FirebaseRemoteConfig;
export let storage: (app?: any) => Types.FirebaseStorage;

class ExpoFirebaseApp {
  private jsApp: any;
  readonly name: string;
  readonly options: any;

  constructor(options?: any, name?: string, jsApp?: any) {
    this.name = name || "[DEFAULT]";
    this.options = options; // TODO DEFAULT
    this.jsApp = jsApp;
  }

  private getModule(name: ExpoFirebaseModuleName, mod: any): any {
    if (mod.moduleType === "js") {
      return this.jsApp[name]();
    }
    throw new Error("Native modules not yet supported");
  }

  analytics(): Types.FirebaseAnalytics {
    return this.getModule("analytics", analytics);
  }

  auth(): Types.FirebaseAuth {
    return this.getModule("auth", auth);
  }

  database(): Types.FirebaseDatabase {
    return this.getModule("database", database);
  }

  firestore(): Types.FirebaseFirestore {
    return this.getModule("firestore", firestore);
  }

  functions(): Types.FirebaseFunctions {
    return this.getModule("functions", functions);
  }

  installations(): Types.FirebaseInstallations {
    return this.getModule("installations", functions);
  }

  messaging(): Types.FirebaseMessaging {
    return this.getModule("messaging", messaging);
  }

  performance(): Types.FirebasePerformance {
    return this.getModule("performance", performance);
  }

  remoteConfig(): Types.FirebaseRemoteConfig {
    return this.getModule("remoteconfig", remoteconfig);
  }

  storage(): Types.FirebaseStorage {
    return this.getModule("storage", storage);
  }
}

function getApp(name?: string): ExpoFirebaseApp {
  if (!name) {
    if (defaultApp) return defaultApp;
    throw new Error("Auto-init of default-app not yet supported");
    // TODO
    defaultApp = new ExpoFirebaseApp();
    return defaultApp;
  }
  throw new Error("Named app are not yet supported");
}

export function setJSModule(name: ExpoFirebaseModuleName, firebase: any) {
  const func: any = (app?: any) => {
    app = app || getApp();
    return app[name]();
  };
  func.moduleType = "js";

  // hoist statics
  const stat = firebase[name];
  Object.keys(stat).forEach(key => {
    func[key] = stat[key];
  });

  switch (name) {
    case "analytics":
      analytics = func;
      break;
    case "auth":
      auth = func;
      break;
    case "database":
      database = func;
      break;
    case "firestore":
      firestore = func;
      break;
    case "functions":
      functions = func;
      break;
    case "installations":
      installations = func;
      break;
    case "messaging":
      messaging = func;
      break;
    case "performance":
      performance = func;
      break;
    case "remoteconfig":
      remoteconfig = func;
      break;
    case "storage":
      storage = func;
      break;
  }
  jsFirebase = firebase;
}

export function initializeApp(config?: any, name?: string) {
  if (!config && !name && defaultApp) {
    return defaultApp;
  }
  if (!name && defaultApp)
    throw new Error("Default app is already initialized");
  if (name && namedApps[name])
    throw new Error("App with this name is already initialized");
  const jsApp = jsFirebase ? jsFirebase.initializeApp(config, name) : undefined;
  const app = new ExpoFirebaseApp(config, name, jsApp);
  if (!name) {
    defaultApp = app;
  } else {
    namedApps[name] = app;
  }
  return app;
}

export const app = getApp;
