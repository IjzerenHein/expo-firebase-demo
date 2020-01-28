import { FirebaseOptions, FirebaseModuleName } from './FirebaseApp.types';
import * as FirebaseModules from './FirebaseModules';
export { FirebaseOptions } from './FirebaseApp.types';
export { auth } from './FirebaseModules';
export * from './GoogleServices';
export declare const DEFAULT_NAME: any, DEFAULT_OPTIONS: any;
interface FirebaseAppConfig {
    name: string;
    options: FirebaseOptions;
}
declare class FirebaseApp {
    /**
     * The (read-only) options for this app.
     */
    name: string;
    /**
     * The (read-only) options for this app.
     */
    readonly options: FirebaseOptions;
    constructor(config: FirebaseAppConfig);
    /**
     * Delete the Firebase app instance.
     */
    deleteAsync(): Promise<void>;
    private getModuleInstance;
    /**
     * Gets the Auth service for the current app.
     */
    auth(): FirebaseModules.Auth;
}
/**
 * Retrieves the default Firebase app instance.
 *
 * Unlike the Firebase JavaScript SDK, it is not possible to access
 * custom named apps using this function. If you want to initialize and
 * use custom named apps, use `initializeAppAsync` and `getAppAsync`.
 */
export declare function app(): FirebaseApp;
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
export declare function initializeAppAsync(options?: FirebaseOptions, name?: string): Promise<FirebaseApp>;
/**
 * Retrieves a Firebase app instance.
 * When called with no arguments, the default app is returned. When an app name is provided,
 * the app corresponding to that name is returned. An exception is thrown if the app being
 * retrieved has not yet been initialized.
 *
 * @param {string} name - Optional name of the app
 * @return {Promise<FirebaseApp>} - Firebase app
 */
export declare function getAppAsync(name?: string): Promise<FirebaseApp>;
/**
 * Retrieves all initialized Firebase app instances.
 *
 * @return {Promise<FirebaseApp[]>} - Array of firebase apps
 */
export declare function getAppsAsync(): Promise<FirebaseApp[]>;
/**
 * Deletes a Firebase app by its name.
 *
 * @internal
 * This function is provided for testing purposes, more specifically
 * to test forbidden access to the prohibited default app.
 */
export declare function deleteAppAsync(name: string): Promise<void>;
/**
 * Register a native module.
 *
 * @internal
 * This function is used by the other `expo-firebase-` modules to register
 * themselves with the main expo firebase namespace.
 */
export declare function registerModule(name: FirebaseModuleName, mod: any): void;
