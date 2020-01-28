import { UnavailabilityError } from '@unimodules/core';
import ExpoFirebaseApp from './ExpoFirebaseApp';
import { FirebaseOptions, FirebaseModuleName } from './FirebaseApp.types';
import * as FirebaseModules from './FirebaseModules';
export { FirebaseOptions } from './FirebaseApp.types';
export { auth } from './FirebaseModules';
export * from './GoogleServices';

export const { DEFAULT_NAME, DEFAULT_OPTIONS } = ExpoFirebaseApp;

interface FirebaseAppConfig {
  name: string;
  options: FirebaseOptions;
}

class FirebaseApp {
  /**
   * The (read-only) options for this app.
   */
  public name: string;

  /**
   * The (read-only) options for this app.
   */
  public readonly options: FirebaseOptions;

  constructor(config: FirebaseAppConfig) {
    this.name = config.name;
    this.options = config.options;
  }

  /**
   * Delete the Firebase app instance.
   */
  deleteAsync(): Promise<void> {
    // @ts-ignore
    if (!ExpoFirebaseApp.deleteAppAsync) {
      throw new UnavailabilityError('expo-firebase-app', 'deleteAppAsync');
    }
    // @ts-ignore
    return ExpoFirebaseApp.deleteAppAsync(this._name);
  }

  private getModuleInstance(name: FirebaseModuleName): any {
    const mod = FirebaseModules.getModule(name);
    if (!mod) throw new Error(`Firebase module not available: ${name}`);
    return mod(this.name);
  }

  /*analytics(): FirebaseTypes.FirebaseAnalytics {
    return this.getModule("analytics", analytics);
  }*/

  /**
   * Gets the Auth service for the current app.
   */
  auth(): FirebaseModules.Auth {
    return this.getModuleInstance('auth');
  }

  /*database(): FirebaseTypes.FirebaseDatabase {
    return this.getModule("database", database);
  }

  firestore(): FirebaseTypes.FirebaseFirestore {
    return this.getModule("firestore", firestore);
  }

  functions(): FirebaseTypes.FirebaseFunctions {
    return this.getModule("functions", functions);
  }

  messaging(): FirebaseTypes.FirebaseMessaging {
    return this.getModule("messaging", messaging);
  }

  performance(): FirebaseTypes.FirebasePerformance {
    return this.getModule("performance", performance);
  }

  remoteConfig(): FirebaseTypes.FirebaseRemoteConfig {
    return this.getModule("remoteConfig", remoteConfig);
  }

  storage(): FirebaseTypes.FirebaseStorage {
    return this.getModule("storage", storage);
  }*/
}

const defaultApp = new FirebaseApp({
  name: DEFAULT_NAME,
  options: DEFAULT_OPTIONS,
});

/**
 * Retrieves the default Firebase app instance.
 *
 * Unlike the Firebase JavaScript SDK, it is not possible to access
 * custom named apps using this function. If you want to initialize and
 * use custom named apps, use `initializeAppAsync` and `getAppAsync`.
 */
export function app(): FirebaseApp {
  return defaultApp;
}

/**
 * Initializes a Firebase app.
 *
 * On iOS and Android this method is optional, as the default Firebase app instance
 * is automatically initialized when the `GoogleService-Info.plist` or `google-services.json`
 * file is configured.
 *
 * You can use this method to initialize additional Firebase app instances. You should typically not
 * initialize the default Firebase with custom options, as the default app is tightly coupled
 * with the google-services config that is shipped with the app.
 *
 * @param {FirebaseOption} [options] - Firebase configuration options
 * @param {string} [name] - Name of the firebase-app (when omitted the default name is used)
 * @return {Promise<FirebaseApp>} - Firebase app
 */
export async function initializeAppAsync(
  options?: FirebaseOptions,
  name?: string
): Promise<FirebaseApp> {
  // @ts-ignore
  if (!ExpoFirebaseApp.initializeAppAsync) {
    throw new UnavailabilityError('expo-firebase-app', 'initializeAppAsync');
  }
  const result = await ExpoFirebaseApp.initializeAppAsync(options, name);
  return new FirebaseApp(result);
}

/**
 * Retrieves a Firebase app instance.
 * When called with no arguments, the default app is returned. When an app name is provided,
 * the app corresponding to that name is returned. An exception is thrown if the app being
 * retrieved has not yet been initialized.
 *
 * @param {string} name - Optional name of the app
 * @return {Promise<FirebaseApp>} - Firebase app
 */
export async function getAppAsync(name?: string): Promise<FirebaseApp> {
  // @ts-ignore
  if (!ExpoFirebaseApp.getAppAsync) {
    throw new UnavailabilityError('expo-firebase-app', 'getAppAsync');
  }
  const result = await ExpoFirebaseApp.getAppAsync(name);
  return new FirebaseApp(result);
}

/**
 * Retrieves all initialized Firebase app instances.
 *
 * @return {Promise<FirebaseApp[]>} - Array of firebase apps
 */
export async function getAppsAsync(): Promise<FirebaseApp[]> {
  // @ts-ignore
  if (!ExpoFirebaseApp.getAppsAsync) {
    throw new UnavailabilityError('expo-firebase-app', 'getAppsAsync');
  }
  // @ts-ignore
  const results = await ExpoFirebaseApp.getAppsAsync();
  return results.map(result => new FirebaseApp(result));
}

/**
 * Deletes a Firebase app by its name.
 *
 * @internal
 * This function is provided for testing purposes, more specifically
 * to test forbidden access to the prohibited default app.
 */
export async function deleteAppAsync(name: string): Promise<void> {
  // @ts-ignore
  if (!ExpoFirebaseApp.deleteAppAsync) {
    throw new UnavailabilityError('expo-firebase-app', 'deleteAppAsync');
  }
  await ExpoFirebaseApp.deleteAppAsync(name);
}

/**
 * Register a native module.
 *
 * @internal
 * This function is used by the other `expo-firebase-` modules to register
 * themselves with the main expo firebase namespace.
 */
export function registerModule(name: FirebaseModuleName, mod: any) {
  const func: any = (app?: any) => {
    const mod = FirebaseModules.getModule(name);
    //if (!mod) throw new Error(`Firebase module not available: ${name}`);
    return mod(app ? app.name : DEFAULT_NAME);
  };

  // hoist statics
  Object.keys(mod).forEach(key => {
    func[key] = mod[key];
  });

  return FirebaseModules.setModule(name, func);
}
