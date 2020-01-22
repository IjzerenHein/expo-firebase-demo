import { UnavailabilityError } from '@unimodules/core';
import ExpoFirebaseApp from './ExpoFirebaseApp';
import { FirebaseOptions } from './FirebaseApp.types';

export const { DEFAULT_OPTIONS } = ExpoFirebaseApp;

class FirebaseApp {
  /**
   * The (read-only) name for this app.
   */
  public readonly name: string;

  constructor(name: string) {
    this.name = name;
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
    return ExpoFirebaseApp.deleteAppAsync(this.name);
  }

  /**
   * Returns the (read-only) configuration options for this app. These are the original parameters
   * the app was initialized with.
   */
  getOptionsAsync(): Promise<FirebaseOptions> {
    // @ts-ignore
    if (!ExpoFirebaseApp.getAppOptionsAsync) {
      throw new UnavailabilityError('expo-firebase-app', 'getAppOptionsAsync');
    }
    // @ts-ignore
    return ExpoFirebaseApp.getAppOptionsAsync(this.name);
  }
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
 */
export async function initializeAppAsync(
  options?: FirebaseOptions,
  name?: string
): Promise<FirebaseApp> {
  // @ts-ignore
  if (!ExpoFirebaseApp.initializeAppAsync) {
    throw new UnavailabilityError('expo-firebase-app', 'initializeAppAsync');
  }
  // @ts-ignore
  const appName = await ExpoFirebaseApp.initializeAppAsync(options, name);
  return new FirebaseApp(appName);
}

/**
 * Retrieves a Firebase app instance.
 * When called with no arguments, the default app is returned. When an app name is provided, the app corresponding to that name is returned.
 * An exception is thrown if the app being retrieved has not yet been initialized.
 *
 * @param name Optional name of the app to return
 */
export async function getAppAsync(name?: string): Promise<FirebaseApp> {
  // @ts-ignore
  if (!ExpoFirebaseApp.getAppAsync) {
    throw new UnavailabilityError('expo-firebase-app', 'getAppAsync');
  }
  // @ts-ignore
  const appName = await ExpoFirebaseApp.getAppAsync(name);
  return new FirebaseApp(appName);
}

/**
 * Retrieves all initialized Firebase app instances.
 */
export async function getAppsAsync(): Promise<FirebaseApp[]> {
  // @ts-ignore
  if (!ExpoFirebaseApp.getAppsAsync) {
    throw new UnavailabilityError('expo-firebase-app', 'getAppsAsync');
  }
  // @ts-ignore
  const appNames = await ExpoFirebaseApp.getAppsAsync();
  return appNames.map(appName => new FirebaseApp(appName));
}
