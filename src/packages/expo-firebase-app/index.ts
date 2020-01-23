//import ExpoFirebaseApp from './ExpoFirebaseApp';

type ExpoFirebaseModuleName =
  | "analytics"
  | "auth"
  | "database"
  | "firestore"
  | "functions"
  | "messaging"
  | "performance"
  | "remoteConfig"
  | "storage";

let jsFirebase: any;
let defaultApp: ExpoFirebaseApp;
let namedApps: {
  [name: string]: ExpoFirebaseApp;
};

export let analytics;
export let auth;
export let database;
export let firestore;
export let functions;
export let messaging;
export let performance;
export let remoteConfig;
export let storage;

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

  analytics() {
    return this.getModule("analytics", analytics);
  }

  auth() {
    return this.getModule("auth", auth);
  }

  database() {
    return this.getModule("database", database);
  }

  firestore() {
    return this.getModule("firestore", firestore);
  }

  functions() {
    return this.getModule("functions", functions);
  }

  messaging() {
    return this.getModule("messaging", messaging);
  }

  performance() {
    return this.getModule("performance", performance);
  }

  remoteConfig() {
    return this.getModule("remoteConfig", remoteConfig);
  }

  storage() {
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
  function func(app?: any) {
    app = app || getApp();
    return app[name]();
  }
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
    case "messaging":
      messaging = func;
      break;
    case "performance":
      performance = func;
      break;
    case "remoteConfig":
      remoteConfig = func;
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
